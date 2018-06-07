module.exports = {
    btns: [
        {
            id: 'alignLBtn',
            value: '<i class="fas fa-align-left"></i>',
            tooltip: 'Align Left',
            type: 'checkbox',
            eventOpts: {
                tag: 'justifyLeft',
                option: null
            }
        },
        {
            id: 'alignCBtn',
            value: '<i class="fas fa-align-center"></i>',
            tooltip: 'Align Center',
            type: 'checkbox',
            eventOpts: {
                tag: 'justifyCenter',
                option: null
            }
        },
        {
            id: 'alignRBtn',
            value: '<i class="fas fa-align-right"></i>',
            tooltip: 'Align Right',
            type: 'checkbox',
            eventOpts: {
                tag: 'justifyRight',
                option: null
            }
        },
        {
            id: 'alignJBtn',
            value: '<i class="fas fa-align-justify"></i>',
            tooltip: 'Align Justify',
            type: 'checkbox',
            eventOpts: {
                tag: 'justifyFull',
                option: null
            }
        }
    ]
}
