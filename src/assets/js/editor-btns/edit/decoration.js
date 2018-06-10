module.exports = {
    btns: [
        {
            id: 'boldBtn',
            value: 'bold',
            tooltip: 'Bold',
            type: 'checkbox',
            eventOpts: {
                tag: 'bold',
                option: null
            }
        },
        {
            id: 'italicBtn',
            value: 'italic',
            tooltip: 'Italic',
            type: 'checkbox',
            eventOpts: {
                tag: 'italic',
                option: null
            }
        },
        {
            id: 'strikeBtn',
            value: 'strikethrough',
            tooltip: 'Strikethrough',
            type: 'checkbox',
            eventOpts: {
                tag: 'strikethrough',
                option: null
            }
        },
        {
            id: 'ulineBtn',
            value: 'underline',
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
            value: 'subscript',
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
            value: 'superscript',
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
            value: 'eraser',
            tooltip: 'Remove All Formatting',
            eventOpts: {
                tag: 'removeFormat',
                option: null
            }
        }
    ]
}
