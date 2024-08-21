local function handleNuiMessage(table)
    SendNUIMessage(table)
end

local function showTextUI(id, key, message)
    if id == nil or key == nil or message == nil then return end
    handleNuiMessage({
        type = 'showTextUI',
        id = id,
        key = key,
        message = message
    })
end

local function hideTextUI(id)
    handleNuiMessage({
        type = 'hideTextUI',
        id = id
    })
end

local function fetchTextUIs()
    local ids = nil

    handleNuiMessage({ type = 'getTextUIs' })

    RegisterNuiCallback('returnTextUIs', function(uiId, cb)
        ids = uiId
        cb('ok')
    end)

    while ids == nil do
        Wait(0)
    end

    return ids
end

exports('showTextUI', showTextUI)
exports('hideTextUI', hideTextUI)
exports('getTextUIs', fetchTextUIs)
