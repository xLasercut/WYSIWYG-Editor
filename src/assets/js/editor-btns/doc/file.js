module.exports = {
    btns: [
        {
            id: 'uploadBtn',
            class: 'btn btnUpload',
            tooltip: 'Upload File',
            value: 'upload',
            eventOpts: {
                name: 'upload-file'
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
                containerClass: 'dropdownContent',
                btnClass: 'btn btnDrop',
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
