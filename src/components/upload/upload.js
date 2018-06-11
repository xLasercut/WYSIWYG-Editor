import FileTree from './file-tree.vue'
import CancelButton from '../button/cancel-button.vue'
import GreenButton from '../button/green-button.vue'
import RedButton from '../button/red-button.vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

const { remote } = require('electron')

const FileManager = require('../../assets/js/file-manager.js')
const NeocitiesHelper = require('../../assets/js/neocities-helper.js')
const FiletreeManager = require('../../assets/js/filetree-manager.js')
const NotificationManager = require('../../assets/js/notification-manager.js')
const DialogManager = require('../../assets/js/dialog-manager.js')


var notificationManager = new NotificationManager()


let currentWindow = remote.getCurrentWindow()

function getConfigData () {
    var fileManager = new FileManager("./config.json")
    return JSON.parse(fileManager.readFile())
}

function checkVariable (variable, type) {
    if (!variable) {
        throw type
    }
}

export default {
    data: function () {
        return {
            fileTreeData: [],
            selectionData: {
                root: true
            },
            localFilePath: null
        }
    },
    components: {
        FileTree,
        FontAwesomeIcon,
        CancelButton,
        GreenButton,
        RedButton
    },
    methods: {
        reloadFileTree: function () {
            var configData = getConfigData()
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
            var configData = getConfigData()
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
            var configData = getConfigData()
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
        fileSelect: function () {
            var dialogManager = new DialogManager()
            this.localFilePath = dialogManager.openDialog()
        }
    },
    mounted: function () {
        this.reloadFileTree()
    }
}
