import CancelButton from '../button/cancel-button.vue'
import GreenButton from '../button/green-button.vue'

const { remote, ipcRenderer } = require('electron')

let currentWindow = remote.getCurrentWindow()
let editorWindow = currentWindow.getParentWindow()

export default {
    data: function () {
        return {
            inputs: [],
            refs: [],
            title: ""
        }
    },
    components: {
        CancelButton,
        GreenButton
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
        resizeWindow: function () {
            var height = this.$refs.inputContainer.clientHeight  + 67
            currentWindow.setContentSize(600, height)
        }
    },
    mounted: function () {
        this.resizeWindow()

        this.$watch("inputs", (value) => {
            this.resizeWindow()
        })

        ipcRenderer.on("inputs", (evt, data) => {
            document.title = data.title
            this.title = data.title
            this.inputs = data.inputs
            this.refs = data.refs
        })
    }
}
