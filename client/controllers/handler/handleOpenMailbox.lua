local getAllMailboxMessagesSV = require('client.services.getAllMailboxMessagesService')
local setToggleNuiFrame = require('client.services.setToggleNuiFrame')

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