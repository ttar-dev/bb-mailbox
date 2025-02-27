RegisterNUICallback('getClientData', function(data, cb)
  debugPrint('>> Data sent by React', json.encode(data))
  local curCoords = GetEntityCoords(PlayerPedId())
  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }

  cb(retData)
end)