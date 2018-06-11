module.exports = {
    btns: [
        {
            id: 'headingBtn',
            tooltip: 'Heading',
            value: 'paragraph',
            type: 'dropdown',
            drop: {
                contents: require('./dropdown/heading.js')
            }
        },
        {
            id: 'fgcBtn',
            tooltip: 'Font Color',
            value: 'eye-dropper',
            type: 'dropdown',
            drop: {
                containerClass: 'fgcContent',
                btnClass: 'btnDropColor',
                contents: require('./dropdown/fore-color.js')
            }
        }
    ]
}
