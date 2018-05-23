const remote = require('electron').remote
const {dialog, BrowserWindow} = remote
const ipcRenderer = require('electron').ipcRenderer
const url = require('url')
const path = require('path')

const FileManager = require('./js/file-manager.js')
const editBtns = require('./js/edit-btns.js')

const specials = [
    "insertHTML"
]

const debug = remote.getGlobal("debug")

let currentWindow = remote.getCurrentWindow()
let promptWindow
let settingsWindow

var promptUrl = url.format({
    pathname: path.join(__dirname, "prompt.html"),
    protocol: "file:",
    slashes: true
})

var promptWindowOptions = {
    height: 150,
    width: 400,
    useContentSize: true,
    resizable: false,
    parent: currentWindow,
    show: false
}

var settingsUrl = url.format({
    pathname: path.join(__dirname, "settings.html"),
    protocol: "file:",
    slashes: true
})

var settingsWindowOptions = {
    height: 150,
    width: 400,
    resizable: false,
    parent: currentWindow,
    show: false
}

var dialogOptions = {
    filters: [
        { name: "Web Page", extensions: ["html", "htm"] }
    ]
}

function createChildWindow (childWindow, windowOptions, url, windowData) {
    childWindow = new BrowserWindow(windowOptions)

    childWindow.setMenu(null)
    childWindow.loadURL(url)

    childWindow.once('ready-to-show', function () {
        childWindow.show()
        if (windowData) {
            childWindow.webContents.send("editorOptions", windowData)
        }
    })

    childWindow.on('closed', function () {
        childWindow = null
    })
}

const editorApp = new Vue({
    el: "#editorApp",
    data: {
        debug: debug,
        formatBtnGroups: editBtns.formatBtns,
        docBtns: editBtns.docBtns,
        fontSizeBtns: editBtns.fontSizeBtns,
        fontTemplateBtns: editBtns.fontTemplateBtns,
        currentFilePath: null
    },
    methods: {
        addFormat: function (tag, option) {
            if (specials.indexOf(tag) > -1) {
                createChildWindow(promptWindow, promptWindowOptions, promptUrl, option)
            }
            else {
                document.execCommand(tag, false, option)
            }
        },
        newDocument: function () {
            this.$refs.contents.innerHTML = null
            this.currentFilePath = null
        },
        openDocument: function () {
            var filePath = dialog.showOpenDialog(dialogOptions)
            if (filePath) {
                this.currentFilePath = filePath[0]
                var fileManager = new FileManager(this.currentFilePath)
                this.$refs.contents.innerHTML = fileManager.readFile()
            }
        },
        saveDocument: function () {
            if (!this.currentFilePath) {
                this.currentFilePath = dialog.showSaveDialog(dialogOptions)
            }

            if (this.currentFilePath) {
                var fileManager = new FileManager(this.currentFilePath)
                fileManager.saveFile(this.$refs.contents.innerHTML)
            }
        },
        getText: function () {
            console.log(this.$refs.contents.innerHTML)
        },
        openSettings: function () {
            createChildWindow(settingsWindow, settingsWindowOptions, settingsUrl)
        },
        uploadFile: function () {
            alert('Coming Soon')
        }
    }
})

ipcRenderer.on("editorOptions", function(evt, data) {
    document.execCommand('insertHTML', false, data)
})
