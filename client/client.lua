RegisterNUICallback('getClientData', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))
  local curCoords = GetEntityCoords(PlayerPedId())
  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }

  cb(retData)
end)

RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> Button was pressed on the NUI')
  -- Perform any action you want here
  cb({})
end)

RegisterNUICallback('handleOpenMailbox', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))

  local curCoords = GetEntityCoords(PlayerPedId())
  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }

  getAllMailboxMessages(GetPlayerServerId(PlayerId()), function(mailboxData)
    if mailboxData then
      retData.mailboxData = mailboxData
    end

    SendNUIMessage({
      type = "renderMessages",
      data = retData
    })

    toggleNuiFrame()

    cb(retData)
  end)
end)

local function getAllMailboxMessagesService(playerId, cb)
  MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE identifier = @player_id', {
    ['@player_id'] = playerId
  }, function(result)
    if result then
      cb(result)
    else
      debugPrint('>> No mailbox data found for player_id: ' .. playerId)
      cb(nil)
    end
  end)
end

local isMailboxOpen = false
local function setToggleNuiFrame()
  isMailboxOpen = not isMailboxOpen
  SetNuiFocus(isMailboxOpen, isMailboxOpen)
  debugPrint('>> Mailbox' .. (isMailboxOpen and ' opened' or ' closed'))
  SendNUIMessage({
    type = "ui",
    status = isMailboxOpen
  })
end

return setToggleNuiFrame

RegisterCommand('toggleMailbox', function()
  toggleNuiFrame()
end)

RegisterKeyMapping("toggleMailbox", "Toggle Mailbox", "keyboard", "F1")