const defaultValues = {
    class: 'btn btnEdit',
    type: 'button'
}

function addValue (btn) {
    for (var key in defaultValues) {
        if (!btn[key]) {
            btn[key] = defaultValues[key]
        }
    }
}

function addRef (btn) {
    if (btn.type == "checkbox") {
        btn["ref"] = btn.eventOpts.tag
    }
    else if (btn.type == "dropdown") {
        btn["ref"] = btn.drop.contents[0].eventOpts.tag
    }
}

function setDefaults (btnGroup) {
    var output = btnGroup
    for (var btn of output.btns) {
        addValue(btn)
        addRef(btn)
    }
    return output
}


const editorBtns = {
    docBarGroups: [
        setDefaults(require('./editor-btns/doc/file.js')),
        setDefaults(require('./editor-btns/doc/doc.js'))
    ],
    editBarGroups: [
        setDefaults(require('./editor-btns/edit/style1.js')),
        setDefaults(require('./editor-btns/edit/style2.js')),
        setDefaults(require('./editor-btns/edit/style3.js')),
        setDefaults(require('./editor-btns/edit/decoration.js')),
        setDefaults(require('./editor-btns/edit/alignment.js')),
        setDefaults(require('./editor-btns/edit/list.js')),
        setDefaults(require('./editor-btns/edit/special.js'))
    ],
    settingBarGroups: [
        setDefaults(require('./editor-btns/setting/setting.js'))
    ]
}

module.exports = editorBtns
