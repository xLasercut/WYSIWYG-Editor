var fontFamily = [
    'Roboto', 'Arial', 'Times New Roman', 'Calibri', 'Courier New', 'Comic Sans MS', 'Cambria', 'Consolas',
    'Georgia', 'Verdana', 'Helvetica', 'Trebuchet MS', 'Arial Black', 'Impact'
]

function createFamily () {
    var output = []
    for (var family of fontFamily.sort()) {
        var item = {
            style: `font-family: ${family};`,
            value: family,
            tooltip: family,
            eventOpts: {
                name: 'add-format',
                tag: 'fontName',
                option: family
            }
        }
        output.push(item)
    }
    return output
}

module.exports = createFamily()
