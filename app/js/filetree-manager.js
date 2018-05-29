function getDirectories (fileData) {
    var directories = []
    for (var file of fileData) {
        if (file.is_directory) {
            directories.push(file.path)
        }
    }
    return directories
}


function sortFileTree (nonRootItems, rootItems) {
    var fileTree = rootItems
    var nonRoots = nonRootItems

    var match = false
    var j = nonRoots.length - 1
    var step = -1
    var filesLeft = []
    while (nonRoots.length > 0) {
        for (var i = 0; i < fileTree.length; i++) {
            if (nonRoots[j].parent == fileTree[i].path) {
                fileTree.splice(i + 1, 0, nonRoots[j])
                match = true
                break
            }
        }
        if (!match) {
            filesLeft.push(nonRoots[j])
        }
        match = false
        j += step
        if (j < 0 || j == nonRoots.length) {
            step = step * -1
            j += step
            nonRoots = filesLeft
            filesLeft = []
        }
    }

    return fileTree
}

class FiletreeManager {
    constructor (fileData) {
        this.fileData = fileData
        this.allDirectories = getDirectories(this.fileData)
        this.rootFiles = []
        this.rootDirectories = []
        this.nonRootFiles = []
        this.nonRootDirectories = []
    }

    appendParent (file) {
        if (file.path.indexOf("/") == -1) {
            file["parent"] = "root"
            file["name"] = file.path
            file["spaces"] = ""
        }
        else {
            for (var directory of this.allDirectories) {
                var fileName = file.path.replace(`${directory}/`, "")
                if (fileName.indexOf("/") == -1 && fileName != "") {
                    file["parent"] = directory
                    var levels = directory.split("/").length
                    file["name"] = fileName
                    file["spaces"] = "&nbsp;&nbsp;&nbsp;".repeat(levels)
                }
            }
        }
        return file
    }

    appendInputType (file) {
        if (file.is_directory) {
            file["inputType"] = "checkbox"
            file["model"] = file.path
            file["value"] = false
        }
        else {
            file["inputType"] = "radio"
            file["model"] = "selectedFile"
            file["value"] = file.path
        }
        return file
    }

    separateFiles (file) {
        if (file.is_directory) {
            if (file.parent == "root") {
                this.rootDirectories.push(file)
            }
            else {
                this.nonRootDirectories.push(file)
            }
        }
        else {
            if (file.parent == "root") {
                this.rootFiles.push(file)
            }
            else {
                this.nonRootFiles.push(file)
            }
        }
    }

    createFileTree () {
        for (var file of this.fileData) {
            var appendedFile = file
            appendedFile = this.appendParent(appendedFile)
            appendedFile = this.appendInputType(appendedFile)
            this.separateFiles(appendedFile)
        }
        var nonRootItems = this.nonRootDirectories.concat(this.nonRootFiles)
        var rootItems = this.rootDirectories.concat(this.rootFiles)

        return sortFileTree(nonRootItems, rootItems)
    }

}

module.exports = FiletreeManager
