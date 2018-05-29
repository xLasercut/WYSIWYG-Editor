class NotificationManager {
    checkVariable (variable, type) {
        if (!variable) {
            throw type
        }
    }

    showNotification (type) {
        var msg = ""
        switch (type) {
            case "apiKey":
                msg = "Please set Neocities API key in settings"
                break
            case "localFilePath":
                msg = "Please select file to upload"
                break
            case "serverFilePath":
                msg = "Please select a server file to replace or enter a new file name"
                break
            default:
                msg = type
        }
        alert(msg)
    }
}

module.exports = NotificationManager
