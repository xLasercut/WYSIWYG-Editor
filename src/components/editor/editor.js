import EditorButton from '../button/editor-button.vue'

const { ipcRenderer, remote } = require('electron')

const FileManager = require('../../assets/js/file-manager.js')
const DialogManager = require('../../assets/js/dialog-manager.js')
const PromptManager = require('../../assets/js/prompt-manager.js')
const WindowManager = require('../../assets/js/window-manager.js')
const HTMLSanitizer = require('../../assets/js/html-sanitizer.js')
const HTMLStringCreator = require('../../assets/js/htmlstring-creator.js')

const editorBtns = require('../../assets/js/editor-btns.js')
const formatValues = require('../../assets/js/format-values.js')

var dialogManager = new DialogManager()

const specials = [
    "insertHTML"
]

const dev = remote.getGlobal("dev")

let currentWindow = remote.getCurrentWindow()
var windowManager = new WindowManager(currentWindow, dev)

function getFrameSource () {
    if (dev) {
        return "./src/assets/static/contents.html"
    }
    return "./contents.html"
}

export default {
    data: function () {
        return {
            editorBtns: editorBtns,
            showSource: false,
            currentFilePath: null,
            frameSource: getFrameSource()
        }
    },
    components: {
        EditorButton
    },
    methods: {
        addFormat: function (tag, option) {
            if (specials.indexOf(tag) > -1) {
                var promptManager = new PromptManager(currentWindow, dev)
                promptManager.newPrompt(option)
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
            this.currentFilePath = dialogManager.openDialog("webPage")
            if (this.currentFilePath) {
                var htmlDoc = new FileManager(this.currentFilePath)
                this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML = htmlDoc.readFile()
            }
        },
        saveDocument: function (saveAs) {
            if (!this.currentFilePath || saveAs) {
                this.currentFilePath = dialogManager.saveDialog("webPage")
            }

            if (this.currentFilePath) {
                var htmlDoc = new FileManager(this.currentFilePath)
                htmlDoc.saveFile(this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML)
            }
        },
        getSource: function () {
            this.showSource = !this.showSource
            this.$refs.displaySource[0].checked = this.showSource
            var htmlSanitizer = new HTMLSanitizer()
            this.$refs.source.innerHTML = htmlSanitizer.sanitizeHTML(this.getFrameContent().document.getElementsByTagName("div")[0].innerHTML)
        },
        newWindow: function (windowName) {
            windowManager.newWindow(windowName)
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
                    this.$refs[key][0].checked = this.getFrameContent().document.queryCommandState(key)
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
                    this.$refs[key][0].drop = item
                }
            }
        },
        buttonEventControl: function (event) {
            switch (event.name) {
                case "new-window":
                    this.newWindow(event.option)
                    break
                case "new-file":
                    this.newDocument()
                    break
                case "open-file":
                    this.openDocument()
                    break
                case "save-file":
                    this.saveDocument(event.option)
                    break
                case "display-html":
                    this.getSource()
                    break
                default:
                    this.addFormat(event.tag, event.option)
            }
        }
    },
    mounted: function () {
        setInterval(() => {
            this.updateFormatValues()
        }, 100)

        ipcRenderer.on("promptReturns", (evt, data) => {
            var htmlStringCreator = new HTMLStringCreator(data)
            this.getFrameContent().document.execCommand('insertHTML', false, htmlStringCreator.getHTMLString())
        })
    }
}
