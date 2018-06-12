const {dialog} = require('electron').remote
const dialogSettings = require('./dialog-settings.js')

class DialogManager {
    openDialog (option = 'default') {
        var filePaths = dialog.showOpenDialog(dialogSettings[option])
        if (!filePaths) {
            return null
        }

        if (filePaths.length == 1) {
            return filePaths[0]
        }

        return filePaths
    }

    saveDialog (option = 'default') {
        var filePath = dialog.showSaveDialog(dialogSettings[option])
        if (!filePath) {
            return null
        }

        return filePath
    }
}


module.exports = DialogManager
