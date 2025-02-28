-- Loads all controllers
print("onInit.lua Loaded")

local function loadControllers()
  local files = {
    -- handlers
    'controllers.handler.handleOpenMailbox',
    'controllers.handler.handleClaimReward',
    'controllers.handler.hideMailbox',

    -- commands
    'controllers.cmd.toggleMailbox',
  }

  for _, file in ipairs(files) do
    require(file)
  end

  -- Register key mappings
  RegisterKeyMapping('toggleMailbox', 'Toggle Mailbox', 'keyboard', '=')
end

return loadControllers