const remote = require('electron').remote
const {BrowserWindow} = remote
const url = require('url')
const path = require('path')

const windowSettings = require('./window-settings.js')

let promptWindow

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
        promptWindow = new BrowserWindow(this.windowOptions)

        promptWindow.setMenu(null)
        promptWindow.loadURL(this.url)

        promptWindow.once('ready-to-show', function () {
            promptWindow.show()
            var parsedOptions = parseOptions(inputs)
            promptWindow.webContents.send("inputs", parsedOptions)
        })

        promptWindow.on('closed', function () {
            promptWindow = null
        })
    }
}

module.exports = PromptManager
