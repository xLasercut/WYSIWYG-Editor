const WindowManager = require('./window-manager.js')
const promptSettings = require('./prompt-settings.js')

function parseOptions (inputOptions) {
    var inputs = []
    var refs = []
    for (var option of inputOptions.inputs) {
        if (option.name) {
            option["ref"] = option.name.split(" ").join("_")
            inputs.push(option)
            refs.push(option.ref)
        }
    }
    return {
        inputs: inputs,
        refs: refs,
        title: inputOptions.title
    }
}

class PromptManager {
    constructor (parentWindow, dev) {
        this.parentWindow = parentWindow
        this.dev = dev
    }

    newPrompt (option) {
        var windowManager = new WindowManager(this.parentWindow, this.dev)
        var parsedOptions = parseOptions(promptSettings[option])
        var windowData = {
            eventName: "inputs",
            eventData: parsedOptions
        }
        windowManager.newWindow("prompt", windowData)
    }
}

module.exports = PromptManager
