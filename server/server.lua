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
    MySQL.Async.fetchAll('SELECT COUNT(*) as total FROM mailbox WHERE identifier = @identifier AND discord_id = @discord_id AND is_ack = 0', {
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
RegisterNetEvent('addMailboxMessage')
AddEventHandler('addMailboxMessage', function(data)
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
                campaign_id = message.campaign_id,
                reward_name = message.reward_name,
                reward_qty = message.reward_qty,
                is_ack = 0
            })
        end

        addMailboxMessagesService(messages, function(success)
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

local function addMailboxMessagesService(messages, cb)
    local values = {}
    for _, message in ipairs(messages) do
        table.insert(values, string.format("('%s', '%s', '%s', '%s', '%s', '%s', '%s', %d, %d)",
            message.identifier, message.discord_id, message.type, message.title, message.content,
            message.campaign_id, message.reward_name, message.reward_qty, message.is_ack))
    end

    local query = string.format("INSERT INTO mailbox (identifier, discord_id, type, title, content, campaign_id, reward_name, reward_qty, is_ack) VALUES %s", table.concat(values, ", "))

    MySQL.Async.execute(query, {}, function(rowsChanged)
        if rowsChanged > 0 then
            cb(true)
        else
            cb(false)
        end
    end)
end

-- Handlers
RegisterNetEvent('getMailboxMessages')
AddEventHandler('getMailboxMessages', function(page)
    local source = source
    local discordIdentifier = getDiscordIdentifier(source)
    local rowsPerPage = 4

    if discordIdentifier then
        getMailboxMessagesService(discordIdentifier, page, rowsPerPage, function(mailboxData, maxPage, totalMessages)
            TriggerClientEvent('receiveMailboxMessages', source, mailboxData, maxPage, totalMessages)
        end)
    else
        TriggerClientEvent('receiveMailboxMessages', source, nil, 0, 0)
    end
end)

-- add a new message to the mailbox
RegisterNetEvent('addMailboxMessage')
AddEventHandler('addMailboxMessage', function(data)
    local source = source
    local discordIdentifier = getDiscordIdentifier(source)
    
    if discordIdentifier then
        addMailboxMessageService({
            identifier = GetPlayerIdentifiers(source)[1],
            discord_id = discordIdentifier,
            type = data.type,
            title = data.title,
            content = data.content,
            campaign_id = data.campaign_id,
            reward_name = data.reward_name,
            reward_qty = data.reward_qty,
        }, function(success)
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

-- Exports
exports('getMailboxMsgSv', getMailboxMessagesService)
exports('getDiscordIdSv', getDiscordIdentifier)
exports('addMailboxMdgSv', addMailboxMessageService)