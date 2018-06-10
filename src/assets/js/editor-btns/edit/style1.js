module.exports = {
    btns: [
        {
            id: 'sizeBtn',
            tooltip: 'Font Size',
            type: 'dropdown',
            labelClass: 'dropdownLabelFSize',
            drop: {
                containerClass: 'dropdownContent',
                btnClass: 'btn btnDrop',
                contents: require('./dropdown/size.js')
            }
        },
    ]
}
