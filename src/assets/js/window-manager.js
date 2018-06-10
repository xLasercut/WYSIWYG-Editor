const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow

let windows = {}

class WindowManager {
    constructor (parent, dev) {
        this.parentWindow = parent
        this.dev = dev
    }

    newWindow (windowName, url, windowOptions, windowData) {
        if (windows[windowName]) {
            console.log("window name already exists")
        }
        else {
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
            windows[windowName].loadURL(url)

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
