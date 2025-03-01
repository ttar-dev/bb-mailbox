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

local function getMailboxMessagesService(playerId, cb)
    MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE discord_id = @player_id', {
        ['@player_id'] = playerId
    }, function(result)
        if result then
            cb(result)
        else
            cb(nil)
        end
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
        ['@is_ack'] = data.is_ack
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
AddEventHandler('getMailboxMessages', function()
    local source = source
    local discordIdentifier = getDiscordIdentifier(source)

    if discordIdentifier then
        getMailboxMessagesService(discordIdentifier, function(mailboxData)
            TriggerClientEvent('receiveMailboxMessages', source, mailboxData)
        end)
    else
        TriggerClientEvent('receiveMailboxMessages', source, nil)
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
            is_ack = data.is_ack
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