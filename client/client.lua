local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setMailboxOpen', shouldShow)
end

RegisterCommand('handleOpenMailbox', function()
    toggleNuiFrame(true)
end, false)

RegisterNUICallback('onCloseMailbox', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

-- RegisterKeyMapping('handleOpenMailbox', 'Toggle Mailbox', 'keyboard', 'F5')

RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> Button was pressed on the NUI')
  cb({})
end)

RegisterNUICallback('getMessagesEvt', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))

  TriggerServerEvent('getMailboxMessages')

  RegisterNetEvent('receiveMailboxMessages')
  AddEventHandler('receiveMailboxMessages', function(mailboxData)
    local retData = { mailboxData = mailboxData or {} }

    SendNUIMessage({
      type = "messages",
      data = retData
    })

    cb(retData)
  end)
end)

-- add message to mailbox
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