RegisterCommand("getDiscord", function(source, args, rawCommand)
    -- ตรวจสอบว่า source คือหมายเลขของผู้เล่น
    if source == 0 then
        print("Command can only be used by a player, not from console.")
        return
    end

    -- ดึง identifiers ของผู้เล่น
    local identifiers = GetPlayerIdentifiers(source)

    for _, identifier in ipairs(identifiers) do
        if string.match(identifier, "discord:") then
            print("Discord Identifier: " .. identifier)
            -- ส่งข้อความไปยังผู้เล่น
            TriggerClientEvent('chat:addMessage', source, {
                args = { "Your Discord Identifier is: " .. identifier }
            })
            break
        end
    end
end, false)