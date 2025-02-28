local onInit = require('onInit')
package.path = package.path .. ";./client/?.lua"
local success, onInit = pcall(require, 'onInit')
if not success then
    print("Error loading onInit.lua: ", onInit)
else
    print("Successfully loaded onInit.lua")
    onInit()
end