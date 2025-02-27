local setToggleNuiFrame = require('client/services/setToggleNuiFrame')

RegisterCommand('toggleMailbox', function()
  toggleNuiFrame()
end, false)