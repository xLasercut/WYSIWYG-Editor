const remote = require('electron').remote
const fs = require('fs')

const FileManager = require('./js/file-manager.js')
const NeocitiesHelper = require('./js/neocities-helper.js')
const FiletreeManager = require('./js/filetree-manager.js')
const NotificationManager = require('./js/notification-manager.js')
const DialogManager = require('./js/dialog-manager.js')

var fileManager = new FileManager("./config.json")
var notificationManager = new NotificationManager()
var dialogManager = new DialogManager()

let currentWindow = remote.getCurrentWindow()

function checkVariable(variable, type) {
    if (!variable) {
        throw type
    }
}

var uploadApp = new Vue({
    el: "#uploadApp",
    data: {
        pageToUpload: "",
        fileTreeData: [],
        selectionData: {
            root: true
        },
        localFilePath: null
    },
    methods: {
        reloadFileTree: function () {
            var configData = JSON.parse(fileManager.readFile())
            try {
                checkVariable(configData["apiKey"], "apiKey")
                var neocitiesHelper = new NeocitiesHelper(configData["apiKey"])
                neocitiesHelper.getServerList()
                .then((data) => {
                    var filetreeManager = new FiletreeManager(data.files)
                    this.fileTreeData = filetreeManager.createFileTree()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            catch (e) {
                notificationManager.showNotification(e)
            }
        },
        uploadFile: function () {
            var configData = JSON.parse(fileManager.readFile())
            try {
                checkVariable(configData["apiKey"], "apiKey")
                checkVariable(this.localFilePath, "localFilePath")
                checkVariable(this.selectionData["selectedFile"], "serverFilePath")
                var neocitiesHelper = new NeocitiesHelper(configData["apiKey"])
                neocitiesHelper.uploadFile(this.selectionData["selectedFile"], this.localFilePath)
                .then ((data) => {
                    alert(data.message)
                    this.reloadFileTree()
                })
                .catch ((err) => {
                    console.log(err)
                })
            }
            catch (e) {
                notificationManager.showNotification(e)
            }
        },
        deleteFile: function () {
            var configData = JSON.parse(fileManager.readFile())
            try {
                checkVariable(configData["apiKey"], "apiKey")
                checkVariable(this.selectionData["selectedFile"], "serverFilePath")
                var neocitiesHelper = new NeocitiesHelper(configData["apiKey"])
                neocitiesHelper.deleteFile(this.selectionData["selectedFile"])
                .then ((data) => {
                    alert(data.message)
                    this.reloadFileTree()
                })
                .catch ((err) => {
                    console.log(err)
                })
            }
            catch (e) {
                notificationManager.showNotification(e)
            }
        },
        closeWindow: function () {
            currentWindow.close()
        },
        fileSelect: function () {
            this.localFilePath = dialogManager.openDialog()
        },
        showFile: function (parents) {
            count = 0
            for (var parent of parents) {
                if (this.selectionData[parent]) {
                    count++
                }
            }

            if (count == parents.length) {
                return true
            }

            return false
        }
    }
})

uploadApp.reloadFileTree()
