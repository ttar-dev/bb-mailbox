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

local function getMailboxMessagesService(playerId, page, rowsPerPage, cb)
    local offset = (page - 1) * rowsPerPage
    MySQL.Async.fetchAll('SELECT COUNT(*) as total FROM mailbox WHERE discord_id = @player_id', {
        ['@player_id'] = playerId
    }, function(countResult)
        local totalMessages = countResult[1].total
        local maxPage = math.ceil(totalMessages / rowsPerPage)

        MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE discord_id = @player_id LIMIT @rowsPerPage OFFSET @offset', {
            ['@player_id'] = playerId,
            ['@rowsPerPage'] = rowsPerPage,
            ['@offset'] = offset
        }, function(result)
            if result then
                cb(result, maxPage)
            else
                cb({}, maxPage)
            end
        end)
    end)
end
local function addMailboxMessageService(data, cb)
    MySQL.Async.execute('INSERT INTO mailbox (identifier, discord_id, type, title, content, campaign_id, reward_name, reward_qty, is_ack) VALUES (@identifier, @discord_id, @type, @title, @content, @campaign_id, @reward_name, @reward_qty, @is_ack)', {
        ['@identifier'] = data.identifier,
        ['@discord_id'] = data.discord_id,
        ['@type'] = data.type,
        ['@title'] = data.title,
        ['@content'] = data.content,
        ['@campaign_id'] = data.campaign_id,
        ['@reward_name'] = data.reward_name,
        ['@reward_qty'] = data.reward_qty,
        ['@is_ack'] = 0
    }, function(rowsChanged)
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
        getMailboxMessagesService(discordIdentifier, page, rowsPerPage, function(mailboxData, maxPage)
            TriggerClientEvent('receiveMailboxMessages', source, mailboxData, maxPage)
        end)
    else
        TriggerClientEvent('receiveMailboxMessages', source, nil, 0)
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