const editBtns = {
    formatBtns : [
        require('./edit-btns/font-styles.js'),
        require('./edit-btns/font-alignment.js'),
        require('./edit-btns/list.js'),
        require('./edit-btns/special.js')
    ],
    docBtns: require('./edit-btns/doc.js'),
    fontSizeBtns: require('./edit-btns/font-sizes.js'),
    fontTemplateBtns: require('./edit-btns/font-templates.js')
}

module.exports = editBtns
