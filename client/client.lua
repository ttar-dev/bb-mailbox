-- functions
local function getMailboxMessagesService(playerId, cb)
  debugPrint('>> Fetching mailbox data for player_id: ' .. playerId)
  MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE identifier = @player_id', {
    ['@player_id'] = playerId
  }, function(result)
    debugPrint('>> Mailbox data found for player_id: ' .. playerId)
    debugPrint('>> Mailbox data found for result: ' .. result)
    if result then
      cb(result)
    else
      debugPrint('>> No mailbox data found for player_id: ' .. playerId)
      cb(nil)
    end
  end)
end

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setOpen', shouldShow)
end

RegisterCommand('toggle-mailbox', function()
    toggleNuiFrame(true)
end, false)

RegisterNUICallback('onClose', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

RegisterKeyMapping('toggle-mailbox', 'Toggle Mailbox', 'keyboard', 'F5')

RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> Button was pressed on the NUI')
  -- Perform any action you want here
  cb({})
end)

RegisterNUICallback('getMessages', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))

  -- Trigger the server event to get the Discord identifier
  TriggerServerEvent('getDiscordIdentifier')

  -- Listen for the server response
  RegisterNetEvent('receiveDiscordIdentifier')
  AddEventHandler('receiveDiscordIdentifier', function(discordIdentifier)
    debugPrint('>> Received Discord Identifier: ' .. discordIdentifier)

    local retData = { discordIdentifier = discordIdentifier }

    getMailboxMessagesService(discordIdentifier, function(mailboxData)
      if mailboxData then
        retData.mailboxData = mailboxData
      end

      SendNUIMessage({
        type = "messages",
        data = retData
      })

      cb(retData)
    end)
  end)
end)