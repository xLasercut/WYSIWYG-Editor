const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const FileManager = require('./js/file-manager.js')

var fileManager = new FileManager('./config.json')
var config = JSON.parse(fileManager.readFile())

let currentWindow = remote.getCurrentWindow()

var settingsApp = new Vue({
    el: "#settingsApp",
    data: {
        apiKey: config["apiKey"],
    },
    methods: {
        confirmOption: function () {
            config["apiKey"] = this.apiKey
            fileManager.saveFile(JSON.stringify(config))
            currentWindow.close()
        },
        cancelOption: function () {
            currentWindow.close()
        }
    }
})
