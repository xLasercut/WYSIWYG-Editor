module.exports = {
    btns: [
        {
            id: 'boldBtn',
            value: '<i class="fas fa-bold"></i>',
            tooltip: 'Bold',
            type: 'checkbox',
            eventOpts: {
                tag: 'bold',
                option: null
            }
        },
        {
            id: 'italicBtn',
            value: '<i class="fas fa-italic"></i>',
            tooltip: 'Italic',
            type: 'checkbox',
            eventOpts: {
                tag: 'italic',
                option: null
            }
        },
        {
            id: 'strikeBtn',
            value: '<i class="fas fa-strikethrough"></i>',
            tooltip: 'Strikethrough',
            type: 'checkbox',
            eventOpts: {
                tag: 'strikethrough',
                option: null
            }
        },
        {
            id: 'ulineBtn',
            value: '<i class="fas fa-underline"></i>',
            tooltip: 'Underline',
            class: 'btn btnEdit btnULine',
            type: 'checkbox',
            eventOpts: {
                tag: 'underline',
                option: null,
            }
        },
        {
            id: 'subSBtn',
            value: '<i class="fas fa-subscript"></i>',
            tooltip: 'Subscript',
            class: 'btn btnEdit btnSub',
            type: 'checkbox',
            eventOpts: {
                tag: 'subscript',
                option: null
            }
        },
        {
            id: 'supSBtn',
            value: '<i class="fas fa-superscript"></i>',
            tooltip: 'Superscript',
            class: 'btn btnEdit btnSup',
            type: 'checkbox',
            eventOpts: {
                tag: 'superscript',
                option: null,
            }
        },
        {
            id: 'rmFormatBtn',
            value: '<i class="fas fa-eraser"></i>',
            tooltip: 'Remove All Formatting',
            eventOpts: {
                tag: 'removeFormat',
                option: null
            }
        }
    ]
}
