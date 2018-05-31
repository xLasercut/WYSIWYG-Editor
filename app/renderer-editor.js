const remote = require('electron').remote
const {dialog, BrowserWindow} = remote
const ipcRenderer = require('electron').ipcRenderer
const url = require('url')
const path = require('path')

const FileManager = require('./js/file-manager.js')
const DialogManager = require('./js/dialog-manager.js')

const editBtns = require('./js/edit-btns.js')
const windows = require('./js/window-settings')
const dialogSettings = require('./js/dialog-settings.js')

var dialogManager = new DialogManager()

const specials = [
    "insertHTML"
]

const debug = remote.getGlobal("debug")

let currentWindow = remote.getCurrentWindow()
let promptWindow
let settingsWindow
let uploadWindow

function createChildWindow (childWindow, parentWindow, windowOptions, url, windowData) {
    windowOptions["parent"] = parentWindow
    childWindow = new BrowserWindow(windowOptions)

    if (!debug) {
        childWindow.setMenu(null)
    }
    childWindow.loadURL(url)

    childWindow.once('ready-to-show', function () {
        childWindow.show()
        if (windowData) {
            childWindow.webContents.send(windowData.name, windowData.data)
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
                var windowData = {
                    name: "editorOptions",
                    data: option
                }
                createChildWindow(promptWindow, currentWindow, windows.prompt.options, windows.prompt.url, windowData)
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
            this.currentFilePath = dialogManager.openDialog(dialogSettings.webPage)
            if (this.currentFilePath) {
                var htmlDoc = new FileManager(this.currentFilePath)
                this.$refs.contents.innerHTML = htmlDoc.readFile()
            }
        },
        saveDocument: function (saveAs) {
            if (!this.currentFilePath || saveAs) {
                this.currentFilePath = dialogManager.saveDialog(dialogSettings.webPage)
            }

            if (this.currentFilePath) {
                var htmlDoc = new FileManager(this.currentFilePath)
                htmlDoc.saveFile(this.$refs.contents.innerHTML)
            }
        },
        getText: function () {
            console.log(this.$refs.contents.innerHTML)
        },
        openSettings: function () {
            createChildWindow(settingsWindow, currentWindow, windows.settings.options, windows.settings.url)
        },
        uploadFile: function () {
            createChildWindow(uploadWindow, currentWindow, windows.upload.options, windows.upload.url)
        }
    }
})

ipcRenderer.on("editorOptions", function(evt, data) {
    document.execCommand('insertHTML', false, data)
})
