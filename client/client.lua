-- ตั้งค่า package.path ก่อน require
package.path = package.path .. ";./client/?.lua"

-- Debug: ตรวจสอบ path ของ Lua
print("🔍 Lua package.path: ", package.path)

-- Debug: โหลด onInit.lua พร้อมจับ error
local success, onInit = pcall(require, 'onInit')

if not success then
    print("❌ Error loading onInit.lua:", onInit)
else
    print("✅ Successfully loaded onInit.lua")
    onInit()
end
