local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setOpen', shouldShow)
end

RegisterCommand('onOpen', function()
    toggleNuiFrame(true)
end, false)

RegisterNUICallback('onClose', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

RegisterKeyMapping('onOpen', 'Toggle Mailbox', 'keyboard', 'F5')

RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> Button was pressed on the NUI')
  cb({})
end)

RegisterNUICallback('getMessages', function(data, cb)
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