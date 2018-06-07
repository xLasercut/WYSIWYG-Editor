function createSize () {
    var output = []
    for (var i = 1; i < 8; i++) {
        var item = {
            value: `<b>${i}</b>`,
            tooltip: `Size ${i}`,
            eventOpts: {
                name: 'add-format',
                tag: 'fontSize',
                option: i
            }
        }
        output.push(item)
    }
    return output
}


module.exports = createSize()
