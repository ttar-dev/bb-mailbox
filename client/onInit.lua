-- client/onInit.lua
local function loadControllers()
    local files = {
        -- handlers
        "client.controllers.handler.handleOpenMailbox",
        "client.controllers.handler.handleClaimReward",

        -- commands
        "client.controllers.cmd.toggleMailbox",
    }

    for _, file in ipairs(files) do
        local success, result = pcall(require, file)
        if not success then
            print("Error loading module:", file, result)
        end
    end

    -- Register key mappings (เปลี่ยนจาก '|' เป็น 'F1' หรือปุ่มที่รองรับ)
    RegisterKeyMapping("toggleMailbox", "Toggle Mailbox", "keyboard", "F1")
end

return loadControllers
