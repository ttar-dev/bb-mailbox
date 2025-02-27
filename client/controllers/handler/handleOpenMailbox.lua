local getAllMailboxMessagesSV = require('.client.services.getAllMailboxMessages')
local setToggleNuiFrame = require('.client.services.setToggleNuiFrame')

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

    toggleNuiFrame()

    cb(retData)
  end)
end)