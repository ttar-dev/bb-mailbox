-- local onInit = require('client/onInit')
-- onInit()

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

-- dev cmd to show the NUI frame
RegisterCommand('show-mailbox', function()
  toggleNuiFrame(true)
  debugPrint('>> Show Mailbox')
end)

RegisterNUICallback('hide-mailbox', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

local function queryMailbox(playerId, cb)
  MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE identifier = @player_id', {
    ['@player_id'] = playerId
  }, function(result)
    if result then
      cb(result)
    else
      debugPrint('No mailbox data found for player_id: ' .. playerId)
      cb(nil)
    end
  end)
end

RegisterNUICallback('getClientData', function(data, cb)
  debugPrint('Data sent by React', json.encode(data))

  -- Lets send back client coords to the React frame for use
  local curCoords = GetEntityCoords(PlayerPedId())

  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }

  -- Query mailbox data from the database
  queryMailbox(GetPlayerServerId(PlayerId()), function(mailboxData)
    if mailboxData then
      retData.mailboxData = mailboxData
    end
    cb(retData)
  end)
end)