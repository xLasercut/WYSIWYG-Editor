const WindowManager = require('./window-manager.js')

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
    constructor (parentWindow, dev) {
        this.parentWindow = parentWindow
        this.dev = dev
    }

    newPrompt (inputs) {
        var windowManager = new WindowManager(this.parentWindow, this.dev)
        var parsedOptions = parseOptions(inputs)
        var windowData = {
            eventName: "inputs",
            eventData: parsedOptions
        }
        windowManager.newWindow("prompt", windowData)
    }
}

module.exports = PromptManager
