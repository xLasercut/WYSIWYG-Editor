const path = require('path')
const url = require('url')

module.exports = {
    prompt: {
        url: url.format({
            pathname: path.join(__dirname, "..", "prompt.html"),
            protocol: "file:",
            slashes: true
        }),
        options: {
            modal: true,
            height: 250,
            width: 400,
            useContentSize: true,
            resizable: false,
            show: false
        }
    },
    settings: {
        url: url.format({
            pathname: path.join(__dirname, "..", "settings.html"),
            protocol: "file:",
            slashes: true
        }),
        options: {
            modal: true,
            height: 150,
            width: 400,
            useContentSize: true,
            resizable: false,
            show: false
        }
    },
    upload: {
        url: url.format({
            pathname: path.join(__dirname, "..", "upload.html"),
            protocol: "file:",
            slashes: true
        }),
        options: {
            modal: true,
            height: 600,
            width: 800,
            show: false
        }
    }
}
