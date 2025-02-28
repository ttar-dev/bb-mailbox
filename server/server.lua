-- Function to get the Discord identifier of a player
local function getDiscordIdentifier(source)
    local identifiers = GetPlayerIdentifiers(source)
    for _, identifier in ipairs(identifiers) do
        if string.match(identifier, "discord:") then
            return identifier
        end
    end
    return nil
end

-- Add an event handler for a custom event
AddEventHandler('getDiscordIdentifier', function()
    local source = source
    local discordIdentifier = getDiscordIdentifier(source)
    if discordIdentifier then
        print("Discord Identifier: " .. discordIdentifier)
        -- ส่ง Discord identifier กลับไปยัง client
        TriggerClientEvent('receiveDiscordIdentifier', source, discordIdentifier)
    else
        TriggerClientEvent('receiveDiscordIdentifier', source, "No Discord Identifier found.")
    end
end)