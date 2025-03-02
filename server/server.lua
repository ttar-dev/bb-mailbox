ESX = exports['es_extended']:getSharedObject()

-- Functions
local function getDiscordIdentifier(source)
    local identifiers = GetPlayerIdentifiers(source)
    for _, identifier in ipairs(identifiers) do
        if string.match(identifier, "discord:") then
            return identifier
        end
    end
    return nil
end

local function getMailboxMessagesService(identifier, discord_id, page, rowsPerPage, cb)
    local offset = (page - 1) * rowsPerPage
    MySQL.Async.fetchAll('SELECT COUNT(*) as total FROM mailbox WHERE identifier = @identifier AND discord_id = @discord_id', {
        ['@discord_id'] = discord_id,
        ['@identifier'] = identifier
    }, function(countResult)
        local totalMessages = countResult[1].total
        local maxPage = math.ceil(totalMessages / rowsPerPage)

        MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE identifier = @identifier AND discord_id = @discord_id ORDER BY date DESC LIMIT @rowsPerPage OFFSET @offset', {
            ['@discord_id'] = discord_id,
            ['@identifier'] = identifier,
            ['@rowsPerPage'] = rowsPerPage,
            ['@offset'] = offset
        }, function(result)
            if result then
                cb(result, maxPage, totalMessages)
            else
                cb({}, maxPage, totalMessages)
            end
        end)
    end)
end

local function addMailboxItemsService(messages, cb)
    local values = {}
    for _, message in ipairs(messages) do
        table.insert(values, string.format("('%s', '%s', '%s', '%s', '%s', '%s', '%s', %d, %d)",
            message.identifier, message.discord_id, message.type, message.title, message.content,
            message.reward_name, message.reward_key, message.reward_qty, message.is_ack))
    end

    local query = string.format("INSERT INTO mailbox (identifier, discord_id, type, title, content, reward_name, reward_key, reward_qty, is_ack) VALUES %s", table.concat(values, ", "))

    MySQL.Async.execute(query, {}, function(rowsChanged)
        if rowsChanged > 0 then
            cb(true)
        else
            cb(false)
        end
    end)
end

local function claimedReward(messageId, cb)
    MySQL.Async.execute('UPDATE mailbox SET is_ack = 1 WHERE id = @id', {
        ['@id'] = messageId
    }, function(rowsChanged)
        cb(rowsChanged > 0)
    end)
end

-- Handlers
RegisterNetEvent('getMailboxMessages')
AddEventHandler('getMailboxMessages', function(page)
    local source = source
    local discordIdentifier = getDiscordIdentifier(source)
    local identifier = GetPlayerIdentifiers(source)[1]
    local rowsPerPage = 4

    if discordIdentifier then
        getMailboxMessagesService(identifier, discordIdentifier, page, rowsPerPage, function(mailboxData, maxPage, totalMessages)
            TriggerClientEvent('receiveMailboxMessages', source, mailboxData, maxPage, totalMessages)
        end)
    else
        TriggerClientEvent('receiveMailboxMessages', source, nil, 0, 0)
    end
end)

-- add a new message to the mailbox
RegisterNetEvent('addMailboxItem')
AddEventHandler('addMailboxItem', function(data)
    local source = source
    local discordIdentifier = getDiscordIdentifier(source)
    
    if discordIdentifier then
        local messages = {}
        for _, message in ipairs(data) do
            table.insert(messages, {
                identifier = GetPlayerIdentifiers(source)[1],
                discord_id = discordIdentifier,
                type = message.type,
                title = message.title,
                content = message.content,
                reward_name = message.reward_name,
                reward_key = message.reward_key,
                reward_qty = message.reward_qty,
                is_ack = 0
            })
        end

        addMailboxItemsService(messages, function(success)
            if success then
                TriggerClientEvent('mailboxMessageResp', source, true)
            else
                TriggerClientEvent('mailboxMessageResp', source, false)
            end
        end)
    else
        TriggerClientEvent('mailboxMessageResp', source, false)
    end
end)

RegisterNetEvent('claimReward')
AddEventHandler('claimReward', function(message)
    local source = source
    local identifier = GetPlayerIdentifiers(source)[1]
    local xPlayer = ESX.GetPlayerFromId(identifier)

    if xPlayer then
        if xPlayer.canCarryItem(message.reward_key, message.reward_qty) then
            xPlayer.addInventoryItem(message.reward_key, message.reward_qty)
            claimedReward(message.id, function(success)
                if success then
                    TriggerClientEvent('claimRewardResp', source, true, "รับรางวัลสำเร็จ กรุณาตรวจสอบในกระเป๋าของท่าน")
                else
                    TriggerClientEvent('claimRewardResp', source, false, "ไม่สามารถรับรางวัลได้ กรุณาลองใหม่อีกครั้ง")
                end
            end)
        else
            TriggerClientEvent('claimRewardResp', source, false, "ไม่สามารถรับรางวัลได้ เนื่องจากช่องเก็บของเต็ม")
        end
    else
        TriggerClientEvent('claimRewardResp', source, false, "ไม่พบผู้เล่น กรุณาล็อกอินใหม่")
    end
end)

-- Exports
exports('getMailboxMsgSv', getMailboxMessagesService)
exports('getDiscordIdSv', getDiscordIdentifier)
exports('addMailboxMsgSv', addMailboxItemsService)