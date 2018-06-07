module.exports = {
    btns: [
        {
            id: 'uploadBtn',
            class: 'btn btnUpload',
            tooltip: 'Upload File',
            value: '<i class="fas fa-upload"></i>',
            eventOpts: {
                name: 'upload-file'
            }
        },
        {
            id: 'newDocBtn',
            tooltip: 'New File',
            value: '<i class="fas fa-file"></i>',
            eventOpts: {
                name: 'new-file'
            }
        },
        {
            id: 'saveBtn',
            tooltip: 'Save File',
            value: '<i class="fas fa-hdd"></i>',
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
            value: '<i class="fas fa-folder-open"></i>',
            eventOpts: {
                name: 'open-file'
            }
        }
    ]
}
