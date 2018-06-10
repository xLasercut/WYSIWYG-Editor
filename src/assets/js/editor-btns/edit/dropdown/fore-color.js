function createOutputItem (color) {
    return {
        style: `background: ${color};`,
        tooltip: '',
        eventOpts: {
            namd: 'add-format',
            tag: 'foreColor',
            option: color
        }
    }
}

function generateColors () {
    var output = []
    for (var h = 0; h < 360; h += 30) {
        var n = 1
        for (var l = 90; l > 20; l -= 2*n) {
            output.push(createOutputItem(`hsl(${h}, 100%, ${l}%)`))
            n+=0.5
        }
    }

    var n = 6
    for (var l = 100; l > 0; l -= 5^n) {
        output.push(createOutputItem(`hsl(0, 0%, ${l}%)`))
        n++
    }

    return output
}


module.exports = generateColors()
