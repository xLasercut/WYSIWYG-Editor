const remote = require('electron').remote
const {dialog, BrowserWindow} = remote
const ipcRenderer = require('electron').ipcRenderer

const FileManager = require('./js/file-manager.js')
const DialogManager = require('./js/dialog-manager.js')
const PromptManager = require('./js/prompt-manager.js')
const HTMLStringCreator = require('./js/htmlstring-creator.js')
const WindowManager = require('./js/window-manager.js')

const editBtns = require('./js/edit-btns.js')
const windows = require('./js/window-settings')
const dialogSettings = require('./js/dialog-settings.js')
const promptSettings = require('./js/prompt-settings.js')

var dialogManager = new DialogManager()

const specials = [
    "insertHTML"
]

const debug = remote.getGlobal("debug")

let currentWindow = remote.getCurrentWindow()
var windowManager = new WindowManager(currentWindow)

var editorApp = new Vue({
    el: "#editorApp",
    data: {
        debug: debug,
        formatBtnGroups: editBtns.formatBtns,
        docBtns: editBtns.docBtns,
        fontSizeBtns: editBtns.fontSizeBtns,
        fontTemplateBtns: editBtns.fontTemplateBtns,
        fontColorBtns: editBtns.fontColorBtns,
        fontFamilyBtns: editBtns.fontFamilyBtns,
        currentFilePath: null
    },
    methods: {
        addFormat: function (tag, option) {
            if (specials.indexOf(tag) > -1) {
                var promptManager = new PromptManager(currentWindow)
                promptManager.newPrompt(promptSettings[option])
            }
            else {
                this.getFrameContent().document.execCommand(tag, false, option)
            }
        },
        newDocument: function () {
            this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML = null
            this.currentFilePath = null
        },
        openDocument: function () {
            this.currentFilePath = dialogManager.openDialog(dialogSettings.webPage)
            if (this.currentFilePath) {
                var htmlDoc = new FileManager(this.currentFilePath)
                this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML = htmlDoc.readFile()
            }
        },
        saveDocument: function (saveAs) {
            if (!this.currentFilePath || saveAs) {
                this.currentFilePath = dialogManager.saveDialog(dialogSettings.webPage)
            }

            if (this.currentFilePath) {
                var htmlDoc = new FileManager(this.currentFilePath)
                htmlDoc.saveFile(this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML)
            }
        },
        getText: function () {
            console.log(this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML)
        },
        openSettings: function () {
            windowManager.newWindow("settings", windows.settings.url, windows.settings.options)
        },
        uploadFile: function () {
            windowManager.newWindow("upload", windows.upload.url, windows.upload.options)
        },
        getBtnClass: function (btnClass) {
            if (!btnClass) {
                return "btn btnEdit"
            }
            return btnClass
        },
        getFrameContent: function () {
            return this.$refs.contents.contentWindow
        },
        keepFocus: function (event) {
            event.preventDefault()
        }
    }
})

ipcRenderer.on("promptReturns", function(evt, data) {
    var htmlStringCreator = new HTMLStringCreator(data)
    editorApp.getFrameContent().document.execCommand('insertHTML', false, htmlStringCreator.getHTMLString())
})
