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
    MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE identifier = @player_id', {
        ['@player_id'] = playerId
    }, function(result)
        if result then
            cb(result)
        else
            cb(nil)
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