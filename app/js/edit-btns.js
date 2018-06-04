function sortFontFamily (fonts) {
    return fonts.sort(function (a, b) {
        return a.option > b.option
    })
}

const editBtns = {
    formatBtns : [
        require('./edit-btns/font-styles.js'),
        require('./edit-btns/font-alignment.js'),
        require('./edit-btns/list.js'),
        require('./edit-btns/special.js')
    ],
    docBtns: require('./edit-btns/doc.js'),
    fontSizeBtns: require('./edit-btns/font-sizes.js'),
    fontTemplateBtns: require('./edit-btns/font-templates.js'),
    fontColorBtns: require('./edit-btns/font-colors.js'),
    fontFamilyBtns: sortFontFamily(require('./edit-btns/font-family.js'))
}

module.exports = editBtns
