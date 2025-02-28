-- Loads all controllers
local function loadControllers()
  local files = {
    -- handlers
    'client.controllers.handler.handleOpenMailbox',
    'client.controllers.handler.handleClaimReward',
    'client.controllers.handler.hideMailbox',

    -- commands
    'client.controllers.cmd.toggleMailbox',
  }

  for _, file in ipairs(files) do
    require(file)
  end

  -- Register key mappings
  RegisterKeyMapping('toggleMailbox', 'Toggle Mailbox', 'keyboard', '=')
end

return loadControllers