const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const ipcRenderer = require('electron').ipcRenderer

let currentWindow = remote.getCurrentWindow()
let editorWindow = currentWindow.getParentWindow()

var promptApp = new Vue({
    el: "#promptApp",
    data: {
        inputs: [],
        refs: [],
        title: ""
    },
    methods: {
        confirmOption: function () {
            var returnValues = {
                title: this.title
            }
            for (var ref of this.refs) {
                returnValues[ref] = this.$refs[ref][0].value
            }
            editorWindow.webContents.send("promptReturns", returnValues)
            currentWindow.close()
        },
        cancelOption: function () {
            currentWindow.close()
        },
        resizeWindow: function () {
            var height = this.$refs.inputContainer.clientHeight  + 65
            currentWindow.setContentSize(600, height)
        }
    }
})

promptApp.resizeWindow()

ipcRenderer.on("inputs", function(evt, data) {
    document.title = data.title
    promptApp.title = data.title
    promptApp.inputs = data.inputs
    promptApp.refs = data.refs
})

promptApp.$watch("inputs", function (value) {
    promptApp.resizeWindow()
})
