module.exports = {
    btns: [
        {
            id: 'familyBtn',
            tooltip: 'Font Family',
            type: 'dropdown',
            labelClass: 'dropdownLabelFFamily',
            drop: {
                containerClass: 'dropdownContent familyContent',
                btnClass: 'btn btnDrop',
                contents: require('./dropdown/family.js')
            }
        }
    ]
}
