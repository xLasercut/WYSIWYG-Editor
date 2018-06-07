module.exports = {
    btns: [
        {
            id: 'headingBtn',
            tooltip: 'Heading',
            value: '<i class="fas fa-paragraph"></i>',
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
            value: '<i class="fas fa-eye-dropper"></i>',
            type: 'dropdown',
            drop: {
                containerClass: 'dropdownContent fgcContent',
                btnClass: 'btn btnDropColor',
                contents: require('./dropdown/fore-color.js')
            }
        }
    ]
}
