module.exports = {
    btns: [
        {
            id: 'familyBtn',
            tooltip: 'Font Family',
            type: 'dropdown',
            drop: {
                contents: require('./dropdown/family.js')
            }
        }
    ]
}
