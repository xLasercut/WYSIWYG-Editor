const remote = require('electron').remote
const {dialog, BrowserWindow} = remote
const ipcRenderer = require('electron').ipcRenderer

const FileManager = require('./js/file-manager.js')
const DialogManager = require('./js/dialog-manager.js')
const PromptManager = require('./js/prompt-manager.js')
const HTMLStringCreator = require('./js/htmlstring-creator.js')
const WindowManager = require('./js/window-manager.js')
const HTMLSanitizer = require('./js/html-sanitizer.js')

const editorBtns = require('./js/editor-btns.js')
const windows = require('./js/window-settings')
const dialogSettings = require('./js/dialog-settings.js')
const promptSettings = require('./js/prompt-settings.js')
const formatValues = require('./js/format-values.js')

var dialogManager = new DialogManager()

const specials = [
    "insertHTML"
]

const debug = remote.getGlobal("debug")

let currentWindow = remote.getCurrentWindow()
var windowManager = new WindowManager(currentWindow)


Vue.component('editor-button', {
    props: ['button'],
    data: function () {
        return {
            status: false,
            value: {}
        }
    },
    template: `
        <div class="btnDiv">

            <input :id="button.id" class="btnInput" :type="button.type" v-on:click="$emit('button-event', button.eventOpts)" v-if="button.type != 'dropdown'" v-model="status"/>
            <label :for="button.id" :class="button.class" :title="button.tooltip" v-html="button.value" v-if="button.type != 'dropdown'" />

            <div :class="button.class" v-if="button.type == 'dropdown'" :title="button.tooltip">
                <span v-html="button.value" v-bind:style="value.style" v-if="button.value"/><span :class="button.labelClass" v-html="value.html" v-bind:style="value.style" v-if="!button.value"/>
                <div :class="button.drop.containerClass">
                    <button :class="button.drop.btnClass" v-for="dropBtn in button.drop.contents" v-html="dropBtn.value" v-on:click="$emit('button-event', dropBtn.eventOpts)" v-bind:style="dropBtn.style" :title="dropBtn.tooltip" />
                </div>
            </div>
        </div>
    `
})


var editorApp = new Vue({
    el: "#editorApp",
    data: {
        debug: debug,
        editorBtns: editorBtns,
        showSource: false,
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
        getSource: function () {
            this.showSource = !this.showSource
            this.$refs.displaySource[0].status = this.showSource
            var htmlSanitizer = new HTMLSanitizer()
            this.$refs.source.innerHTML = htmlSanitizer.sanitizeHTML(this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML)
        },
        openSettings: function () {
            windowManager.newWindow("settings", windows.settings.url, windows.settings.options)
        },
        uploadFile: function () {
            windowManager.newWindow("upload", windows.upload.url, windows.upload.options)
        },
        getFrameContent: function () {
            return this.$refs.contents.contentWindow
        },
        keepFocus: function (event) {
            event.preventDefault()
        },
        updateFormatValues: function () {
            for (var key of formatValues.bool) {
                if (this.$refs[key]) {
                    this.$refs[key][0].status = this.getFrameContent().document.queryCommandState(key)
                }
            }
            for (var key of formatValues.value) {
                if (this.$refs[key]) {
                    var commandValue = this.getFrameContent().document.queryCommandValue(key)
                    var item = {}
                    if (key == "fontName") {
                        item["html"] = commandValue.split('"').join("")
                        item["style"] = `font-family: ${commandValue};`
                    }
                    else if (key == "foreColor") {
                        item["style"] = `color: ${commandValue};`
                    }
                    else if (key == "fontSize") {
                        item["html"] = commandValue
                    }
                    this.$refs[key][0].value = item
                }
            }
        },
        buttonEventControl: function (event) {
            switch (event.name) {
                case "upload-file":
                    this.uploadFile()
                    break
                case "new-file":
                    this.newDocument()
                    break
                case "open-file":
                    this.openDocument()
                    break
                case "save-file":
                    this.saveDocument(false)
                    break
                case "saveas-file":
                    this.saveDocument(true)
                    break
                case "open-settings":
                    this.openSettings()
                    break
                case "display-html":
                    this.getSource()
                    break
                default:
                    this.addFormat(event.tag, event.option)
            }
        }
    }
})

setInterval(function () {
    editorApp.updateFormatValues()
}, 100)

ipcRenderer.on("promptReturns", function(evt, data) {
    var htmlStringCreator = new HTMLStringCreator(data)
    editorApp.getFrameContent().document.execCommand('insertHTML', false, htmlStringCreator.getHTMLString())
})
