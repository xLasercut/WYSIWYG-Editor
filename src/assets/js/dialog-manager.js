const {dialog} = require('electron').remote

class DialogManager {
    openDialog (dialogOptions = {}) {
        var filePaths = dialog.showOpenDialog(dialogOptions)
        if (!filePaths) {
            return null
        }

        if (filePaths.length == 1) {
            return filePaths[0]
        }

        return filePaths
    }

    saveDialog (dialogOptions = {}) {
        var filePath = dialog.showSaveDialog(dialogOptions)
        if (!filePath) {
            return null
        }

        return filePath
    }
}


module.exports = DialogManager
