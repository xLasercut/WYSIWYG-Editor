const { remote } = require('electron')
const FileManager = require('../assets/js/file-manager.js')

var fileManager = new FileManager('./config.json')
var config = JSON.parse(fileManager.readFile())

let currentWindow = remote.getCurrentWindow()

module.exports = {
    data: function () {
        return {
            apiKey: config["apiKey"],
        }
    },
    methods: {
        confirmOption: function () {
            config["apiKey"] = this.apiKey
            fileManager.saveFile(JSON.stringify(config))
            currentWindow.close()
        },
        cancelOption: function () {
            currentWindow.close()
        },
        resizeWindow: function () {
            var height = this.$refs.inputContainer.clientHeight  + 65
            currentWindow.setContentSize(600, height)
        }
    },
    mounted: function () {
        this.resizeWindow()
    }
}
