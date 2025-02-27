local isMailboxOpen = false

local function setToggleNuiFrame()
  isMailboxOpen = not isMailboxOpen
  SetNuiFocus(isMailboxOpen, isMailboxOpen)
  debugPrint('>> Mailbox' .. (isMailboxOpen and ' opened' or ' closed'))
  SendNUIMessage({
    type = "ui",
    status = isMailboxOpen
  })
end

return setToggleNuiFrame