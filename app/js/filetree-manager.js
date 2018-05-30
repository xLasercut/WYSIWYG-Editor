function includes(item, include) {
    if (item.indexOf(include) != -1) {
        return true
    }
    return false
}

function appendInputType (item) {
    if (item.is_directory) {
        item["inputType"] = "checkbox"
        item["model"] = item.path
        item["value"] = false
    }
    else {
        item["inputType"] = "radio"
        item["model"] = "selectedFile"
        item["value"] = item.path
    }
}

function appendParent (item, rootDir, nonRootDir) {
    for (var dir of rootDir.concat(nonRootDir)) {
        var fileName = item.path.replace(`${dir.path}/`, "")
        if (!includes(fileName, "/") && fileName != "") {
            item["parent"] = dir.path
            item["allParents"] = dir.allParents.concat([dir.path])
            item["name"] = fileName
            var levels = dir.path.split("/").length
            item["spaces"] = "&nbsp;&nbsp;&nbsp;".repeat(levels)
            break
        }
    }
}

function sortFileData (fileData, rootDir, rootFile, nonRootDir, nonRootFile) {
    for (var item of fileData) {
        appendInputType(item)
        if (!includes(item.path, "/")) {
            item["parent"] = "root"
            item["allParents"] = ["root"]
            item["name"] = item.path
            item["spaces"] = ""
            if (item.is_directory) {
                rootDir.push(item)
            }
            else {
                rootFile.push(item)
            }
        }
        else {
            if (item.is_directory) {
                nonRootDir.push(item)
            }
            else {
                nonRootFile.push(item)
            }
        }
    }
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
        this.rootFile = []
        this.rootDir = []
        this.nonRootFile = []
        this.nonRootDir = []
        sortFileData(fileData, this.rootDir, this.rootFile, this.nonRootDir, this.nonRootFile)
    }

    createFileTree () {
        this.nonRootDir.sort(function (a, b) {
            return a.path.length > b.path.length
        })
        var appended = []
        for (var dir of this.nonRootDir){
            appendParent(dir, this.rootDir, this.nonRootDir)
        }
        this.nonRootDir.sort(function (a, b) {
            return a.path > b.path
        })
        for (var file of this.nonRootFile) {
            appendParent(file, this.rootDir, this.nonRootDir)
        }

        var rootItems = this.rootDir.concat(this.rootFile)
        var nonRootItems = this.nonRootDir.concat(this.nonRootFile)

        return sortFileTree(nonRootItems, rootItems)
    }

}

module.exports = FiletreeManager
