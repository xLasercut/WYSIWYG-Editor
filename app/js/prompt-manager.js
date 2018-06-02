const WindowManager = require('./window-manager.js')
const windowSettings = require('./window-settings.js')

function parseOptions (inputOptions) {
    var inputs = []
    var refs = []
    for (var option of inputOptions.inputs) {
        if (option.name) {
            inputs.push(option)
            refs.push(option.name)
        }
    }
    return {
        inputs: inputs,
        refs: refs,
        title: inputOptions.title
    }
}

class PromptManager {
    constructor (parentWindow) {
        this.parentWindow = parentWindow
        this.url = windowSettings.prompt.url
        this.windowOptions = windowSettings.prompt.options
        this.windowOptions["parent"] = this.parentWindow
    }

    newPrompt (inputs) {
        var windowManager = new WindowManager(this.parentWindow)
        var parsedOptions = parseOptions(inputs)
        var windowData = {
            eventName: "inputs",
            eventData: parsedOptions
        }
        windowManager.newWindow("prompt", this.url, this.windowOptions, windowData)
    }
}

module.exports = PromptManager
