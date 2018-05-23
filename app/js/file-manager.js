const fs = require('fs')

class FileManager {
    constructor (filePath) {
        this.filePath = filePath
    }

    readFile () {
        return fs.readFileSync(this.filePath)
    }

    saveFile (fileData) {
        fs.writeFileSync(this.filePath, fileData)
    }

    ensureFile (fileData) {
        if (!fs.existsSync(this.filePath)) {
            this.saveFile(fileData)
        }
    }
}

module.exports = FileManager
