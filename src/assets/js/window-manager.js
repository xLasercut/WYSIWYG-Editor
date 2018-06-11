const { remote } = require('electron')
const { BrowserWindow } = remote
const WindowSettings = require('./window-settings.js')

let windows = {}

class WindowManager {
    constructor (parent, dev) {
        this.parentWindow = parent
        this.dev = dev
        this.windowSettings = new WindowSettings(dev)
    }

    newWindow (windowName, windowData) {
        if (windows[windowName]) {
            console.log("window name already exists")
        }
        else {
            var windowOptions = this.windowSettings.getOption(windowName)
            windowOptions["parent"] = this.parentWindow

            if (this.dev) {
                windowOptions["resizable"] = true
            }

            windows[windowName] = new BrowserWindow(windowOptions)

            if (this.dev) {
                windows[windowName].webContents.openDevTools()
            }
            else {
                windows[windowName].setMenu(null)
            }
            windows[windowName].loadURL(this.windowSettings.getUrl(windowName))

            windows[windowName].once('ready-to-show', function () {
                windows[windowName].show()
                if (windowData) {
                    windows[windowName].webContents.send(windowData.eventName, windowData.eventData)
                }
            })

            windows[windowName].on('closed', function () {
                windows[windowName] = null
            })
        }
    }
}

module.exports = WindowManager
