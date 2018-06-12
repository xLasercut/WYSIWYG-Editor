module.exports = {
    btns: [
        {
            id: 'uploadBtn',
            tooltip: 'Upload File',
            value: 'upload',
            eventOpts: {
                name: 'new-window',
                option: 'upload'
            }
        },
        {
            id: 'newDocBtn',
            tooltip: 'New File',
            value: 'file',
            eventOpts: {
                name: 'new-file'
            }
        },
        {
            id: 'saveBtn',
            tooltip: 'Save File',
            value: 'hdd',
            type: 'dropdown',
            drop: {
                contents: require('./dropdown/save.js')
            }
        },
        {
            id: 'openDocBtn',
            tooltip: 'Open File',
            value: 'folder-open',
            eventOpts: {
                name: 'open-file'
            }
        }
    ]
}
