module.exports = {
    btns: [
        {
            id: 'headingBtn',
            tooltip: 'Heading',
            value: 'paragraph',
            type: 'dropdown',
            drop: {
                containerClass: 'dropdownContent',
                btnClass: 'btn btnDrop',
                contents: require('./dropdown/heading.js')
            }
        },
        {
            id: 'fgcBtn',
            tooltip: 'Font Color',
            value: 'eye-dropper',
            type: 'dropdown',
            drop: {
                containerClass: 'dropdownContent fgcContent',
                btnClass: 'btn btnDropColor',
                contents: require('./dropdown/fore-color.js')
            }
        }
    ]
}
