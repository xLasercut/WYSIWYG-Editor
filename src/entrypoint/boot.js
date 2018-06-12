const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const FileManager = require('../assets/js/file-manager.js')

var configFile = new FileManager('./config.json')
configFile.ensureFile(JSON.stringify({}))

let mainWindow

global.dev = false

for (var item of process.argv) {
    if (item == "-dev") {
        global.dev = true
        break
    }
}

const dev = global.dev

function getUrl() {
    if (dev) {
        return 'http://localhost:8080/editor.html'
    }

    return url.format({
        pathname: path.join(__dirname, "editor.html"),
        protocol: "file:",
        slashes: true
    })
}

function createMainWindow () {

    var mainUrl = getUrl()

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })

    if (dev) {
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
