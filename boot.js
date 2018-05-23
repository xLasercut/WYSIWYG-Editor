const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const FileManager = require('./app/js/file-manager.js')

var fileManager = new FileManager('./config.json')
fileManager.ensureFile(JSON.stringify({}))

let mainWindow

global.debug = false

const debug = global.debug

function createMainWindow () {

    var mainUrl = url.format({
        pathname: path.join(__dirname, "app", "editor.html"),
        protocol: "file:",
        slashes: true
    })

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })

    if (debug) {
        mainWindow.webContents.openDevTools()
    }
    else {
        mainWindow.setMenu(null)
    }

    mainWindow.loadURL(mainUrl)

    mainWindow.once('ready-to-show', function () {
        mainWindow.maximize()
        mainWindow.show()
    })

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', function () {
    createMainWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
    }
})
