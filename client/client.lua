local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setMailboxOpen', shouldShow)
end

RegisterCommand('openMailbox', function()
    toggleNuiFrame(true)
    debugPrint('>> Show Mailbox')
end, false)

RegisterNUICallback('onCloseMailbox', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

-- RegisterKeyMapping('openMailbox', 'Toggle Mailbox', 'keyboard', 'F5')

RegisterNUICallback('handleClaimReward', function(data, cb)
  debugPrint('>> handleClaimReward evt')
  cb({})
end)

RegisterNUICallback('getMessagesEvt', function(data, cb)
  debugPrint('>> getMessagesEvt Req payload', json.encode(data))

  local page = data.page or 1
  TriggerServerEvent('getMailboxMessages', page)

  RegisterNetEvent('receiveMailboxMessages')
  AddEventHandler('receiveMailboxMessages', function(mailboxData, maxPage, totalMessages)
    local retData = { mailboxData = mailboxData or {}, maxPage = maxPage or 1, totalMessages = totalMessages or 0 }

    SendNUIMessage({
      type = "messages",
      data = retData
    })

    cb(retData)
  end)
end)

-- add message to mailbox
RegisterNUICallback('addMailboxMessageEvt', function(data, cb)
  debugPrint('>> addMailboxMessageEvt Req payload', json.encode(data))

  TriggerServerEvent('addMailboxMessage', data)

  RegisterNetEvent('mailboxMessageResp')
  AddEventHandler('mailboxMessageResp', function(success)
    debugPrint('>> addMailboxMessageEvt Resp', success)
    local retData = { success = success }
  
    SendNUIMessage({
      type = "messageResp",
      data = retData
    })

    cb(retData)
  end)
  
end)

-- test command
RegisterCommand('test-add-mailbox', function()
  local messageData = {
      {
          type = "reward",
          title = "ของรางวัล",
          content = "แข็งที่เกิดขึ้นตามธรรมชาติ ซึ่งเป็นสารผสมที่เกิดจากการเกาะตัวกันแน่นของแร่ตั้งแต่ 1 ชนิดขึ้นไป หรือ เป็นสารผสมของแร่กับแก้วภูเขาไฟ หรือ แร่กับซากดึกดำบรรพ์ หรือของแข็งอื่น ๆ",
          reward_name = "stone",
          reward_qty = 1
      }
  }

  TriggerServerEvent('addMailboxMessage', messageData)
  debugPrint('>> addMailboxMessage command executed')
end, false)