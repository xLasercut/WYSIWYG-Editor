const path = require('path')
const url = require('url')

const settings = {
    prompt: {
        url: url.format({
            pathname: path.join(__dirname, "prompt.html"),
            protocol: "file:",
            slashes: true
        }),
        options: {
            modal: true,
            resizable: false,
            show: false
        },
        urlDev: "http://localhost:8081/prompt.html"
    },
    settings: {
        url: url.format({
            pathname: path.join(__dirname, "settings.html"),
            protocol: "file:",
            slashes: true
        }),
        options: {
            modal: true,
            resizable: false,
            show: false
        },
        urlDev: "http://localhost:8082/settings.html"
    },
    upload: {
        url: url.format({
            pathname: path.join(__dirname, "upload.html"),
            protocol: "file:",
            slashes: true
        }),
        options: {
            modal: true,
            height: 600,
            width: 800,
            show: false
        },
        urlDev: "http://localhost:8083/upload.html"
    }
}

class WindowSettings {
    constructor (dev) {
        this.dev = dev
    }

    getOption (name) {
        return settings[name].options
    }

    getUrl (name) {
        if (this.dev) {
            return settings[name].urlDev
        }
        return settings[name].url
    }
}

module.exports = WindowSettings
