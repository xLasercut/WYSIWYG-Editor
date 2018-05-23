const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const ipcRenderer = require('electron').ipcRenderer
const HTMLStringCreator = require('./js/htmlstring-creator.js')

let currentWindow = remote.getCurrentWindow()
let editorWindow = currentWindow.getParentWindow()



var promptApp = new Vue({
    el: "#promptApp",
    data: {
        showSizeControl: ['insertImage', 'insertYoutube'],
        showTextInput: ['insertLink'],
        url: "https://",
        height: null,
        width: null,
        text: "",
        tag: ""
    },
    methods: {
        confirmOption: function () {
            if (this.url != 'https://') {
                var htmlStringCreator = new HTMLStringCreator(this.tag, this.url, this.height, this.width, this.text)
                editorWindow.webContents.send("editorOptions", htmlStringCreator.getHTMLString())
            }
            currentWindow.close()
        },
        cancelOption: function () {
            currentWindow.close()
        }
    }
})

ipcRenderer.on("editorOptions", function(evt, data) {
    promptApp.tag = data
})
