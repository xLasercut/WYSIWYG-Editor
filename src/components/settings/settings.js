import CancelButton  from '../button/cancel-button.vue'
import GreenButton from '../button/green-button.vue'

const { remote } = require('electron')
const FileManager = require('../../assets/js/file-manager.js')

var fileManager = new FileManager('./config.json')
var config = JSON.parse(fileManager.readFile())

let currentWindow = remote.getCurrentWindow()

export default {
    data: function () {
        return {
            apiKey: config["apiKey"]
        }
    },
    components: {
        CancelButton,
        GreenButton
    },
    methods: {
        confirmOption: function () {
            config["apiKey"] = this.apiKey
            fileManager.saveFile(JSON.stringify(config))
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
