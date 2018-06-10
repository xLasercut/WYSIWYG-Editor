const { remote } = require('electron')

let currentWindow = remote.getCurrentWindow()

export default {
    methods: {
        closeWindow: function () {
            currentWindow.close()
        }
    }
}
