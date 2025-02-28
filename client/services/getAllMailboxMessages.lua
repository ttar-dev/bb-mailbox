local function getAllMailboxMessagesService(playerId, cb)
  MySQL.Async.fetchAll('SELECT * FROM mailbox WHERE identifier = @player_id', {
    ['@player_id'] = playerId
  }, function(result)
    if result then
      cb(result)
    else
      debugPrint('>> No mailbox data found for player_id: ' .. playerId)
      cb(nil)
    end
  end)
end

return getAllMailboxMessagesService