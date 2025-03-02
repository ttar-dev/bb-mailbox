local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setMailboxOpen', shouldShow)
end

RegisterCommand('openMailbox', function()
    toggleNuiFrame(true)
    debugPrint('>> Show Mailbox')
end, false)

RegisterNUICallback('client:mailbox:close', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('>> Hide Mailbox')
  cb({})
end)

-- RegisterKeyMapping('openMailbox', 'Toggle Mailbox', 'keyboard', 'F5')

RegisterNUICallback('client:server:mailbox:reward:claim', function(data, cb)
  debugPrint('>> client:server:mailbox:reward:claim evt', json.encode(data))
  
  TriggerServerEvent('server:mailbox:reward:claim', data)
  
  RegisterNetEvent('server:mailbox:reward:resp:claimed')
  AddEventHandler('server:mailbox:reward:resp:claimed', function(success, message)
    debugPrint('>> Claim Reward Status', success, message)
    local retData = { success = success, message = message }

    SendNUIMessage({
      type = "messageResp",
      data = retData
    })

    cb(retData)
  end)
end)

RegisterNUICallback('client:server:mailbox:message:all', function(data, cb)
  debugPrint('>> client:server:mailbox:message:all Req payload', json.encode(data))

  local page = data.page or 1
  TriggerServerEvent('server:mailbox:message:all', page)

  RegisterNetEvent('server:mailbox:resp:messages')
  AddEventHandler('server:mailbox:resp:messages', function(mailboxData, maxPage, totalMessages)
    local retData = { mailboxData = mailboxData or {}, maxPage = maxPage or 1, totalMessages = totalMessages or 0 }

    SendNUIMessage({
      type = "messages",
      data = retData
    })

    cb(retData)
  end)
end)

-- add message to mailbox
RegisterNUICallback('server:mailbox:message:add', function(data, cb)
  debugPrint('>> server:mailbox:message:add Req payload', json.encode(data))

  TriggerServerEvent('server:mailbox:message:add', data)
  
  RegisterNetEvent('server:mailbox:resp:message:add')
  AddEventHandler('server:mailbox:resp:message:add', function(success)
    debugPrint('>> server:mailbox:message:add Resp', success)
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
          reward_key = "stone",
          reward_name = "หิน",
          reward_qty = 1
      }
  }

  TriggerServerEvent('server:mailbox:message:add', messageData)
  debugPrint('>> server:mailbox:message:add command executed')
end, false)