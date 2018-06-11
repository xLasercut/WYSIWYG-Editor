module.exports = {
    btns: [
        {
            id: 'sizeBtn',
            tooltip: 'Font Size',
            type: 'dropdown',
            drop: {
                contents: require('./dropdown/size.js')
            }
        },
    ]
}
