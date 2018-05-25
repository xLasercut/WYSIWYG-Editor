const remote = require('electron').remote
const {dialog} = remote
const ipcRenderer = require('electron').ipcRenderer
const fs = require('fs')

const FileManager = require('./js/file-manager.js')
const NeocitiesHelper = require('./js/neocities-helper.js')
const FiletreeManager = require('./js/filetree-manager.js')

var fileManager = new FileManager("./config.json")

let currentWindow = remote.getCurrentWindow()

function checkVariables(localFilePath, serverFilePath) {
    if (!localFilePath) {
        alert('Please select file to upload')
        return false
    }

    if (!serverFilePath) {
        alert('Please input select a server file to replace or input a new file name')
        return false
    }

    return true
}

var uploadApp = new Vue({
    el: "#uploadApp",
    data: {
        pageToUpload: "",
        fileTreeData: [],
        selectionData: {
            root: true
        },
        localFilePath: ""
    },
    methods: {
        reloadFileTree: function () {
            var configData = JSON.parse(fileManager.readFile())
            if (configData["apiKey"]) {
                var neocitiesHelper = new NeocitiesHelper(configData["apiKey"])
                neocitiesHelper.getItem("/api/list")
                .then((data) => {
                    var filetreeManager = new FiletreeManager(data.files)
                    this.fileTreeData = filetreeManager.createFileTree()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            else {
                alert("Please set Neocities API key in settings")
            }
        },
        uploadFile: function () {
            if (!this.localFilePath) {
                this.fileSelect()
            }
            if (checkVariables(this.localFilePath, this.selectionData["selectedFile"])) {
                var value = fs.createReadStream(this.localFilePath)
                var formData = {}
                formData[this.selectionData["selectedFile"]] = value
                var configData = JSON.parse(fileManager.readFile())
                if (configData["apiKey"]) {
                    var neocitiesHelper = new NeocitiesHelper(configData["apiKey"])
                    neocitiesHelper.postItem("/api/upload", formData)
                    .then ((data) => {
                        console.log(data)
                    })
                    .catch ((err) => {
                        console.log(err)
                    })
                }
                else {
                    alert("Please set Neocities API key in settings")
                }
            }
        },
        closeWindow () {
            currentWindow.close()
        },
        fileSelect () {
            this.localFilePath = dialog.showOpenDialog()[0]
        }
    }
})

//uploadApp.reloadFileTree()

ipcRenderer.on("pageToUpload", function(evt, data) {
    uploadApp.pageToUpload = data
})
