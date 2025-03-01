-- Functions
local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('getMessagesEvt', shouldShow)
end

-- Handlers
-- Toggle mailbox
RegisterCommand('handleOpenMailbox', function()
    toggleNuiFrame(true)
end, false)

RegisterNUICallback('onCloseMailbox', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

-- RegisterKeyMapping('handleOpenMailbox', 'Toggle Mailbox', 'keyboard', 'F5')

-- Claim reward
RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> Button was pressed on the NUI')
  cb({})
end)

-- Get messages
RegisterNUICallback('getMessagesEvt', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))

  TriggerServerEvent('getMailboxMessages')

  RegisterNetEvent('receiveMailboxMessages')
  AddEventHandler('receiveMailboxMessages', function(mailboxData)
    local retData = { mailboxData = mailboxData }

    SendNUIMessage({
      type = "messages",
      data = retData
    })

    cb(retData)
  end)
end)

-- Add message
RegisterNUICallback('addMailboxMessageEvt', function(data, cb)
  debugPrint('>> Req payload', json.encode(data))

  TriggerServerEvent('addMailboxMessage', data)

  RegisterNetEvent('mailboxMessageResp')
  AddEventHandler('mailboxMessageResp', function(success)
    debugPrint('>> Res payload', json.encode(success))
    debugPrint('>> Resp', success)
    local retData = { success = success }
  
    SendNUIMessage({
      type = "messageResp",
      data = retData
    })

    cb(retData)
  end)
  
end)