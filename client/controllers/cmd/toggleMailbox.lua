local setToggleNuiFrame = require('client/services/setToggleNuiFrame')

RegisterCommand('pm', function()
  setToggleNuiFrame()
end, false)