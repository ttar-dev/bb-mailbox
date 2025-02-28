local isMailboxOpen = false


-- functions
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

local function setToggleNuiFrame()
  SetNuiFocus(isMailboxOpen, isMailboxOpen)
  SendReactMessage('setVisible', shouldShow)
  debugPrint('>> Mailbox' .. (isMailboxOpen and ' opened' or ' closed'))
  SendNUIMessage({
    type = "ui",
    status = isMailboxOpen
  })

end

RegisterKeyMapping('pm', 'Toggle Mailbox', 'keyboard', '0')
RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> Button was pressed on the NUI')
  -- Perform any action you want here
  cb({})
end)
RegisterNUICallback('handleOpenMailbox', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))

  local curCoords = GetEntityCoords(PlayerPedId())
  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }

  getAllMailboxMessagesSV(GetPlayerServerId(PlayerId()), function(mailboxData)
    if mailboxData then
      retData.mailboxData = mailboxData
    end

    SendNUIMessage({
      type = "renderMessages",
      data = retData
    })

    setToggleNuiFrame()

    cb(retData)
  end)
end)

-- NUI Commands
RegisterCommand('pm', function()
  setToggleNuiFrame()
end, false)