function createHeading () {
    var output = []
    for (i = 1; i < 7; i++) {
        var item = {
            value: `<b>H${i}</b>`,
            tooltip: `Heading ${i}`,
            eventOpts: {
                tag: 'formatBlock',
                option: `h${i}`
            }
        }
        output.push(item)
    }
    return output
}


module.exports = createHeading()
