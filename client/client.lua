local success, onInit = pcall(require, 'onInit')

if not success then
    print("❌ Error loading onInit.lua:", onInit)
else
    print("✅ Successfully loaded onInit.lua")
    onInit()
end
