module.exports = {
    btns: [
        {
            id: 'ulBtn',
            value: 'list',
            tooltip: 'Bullet List',
            type: 'checkbox',
            eventOpts: {
                tag: 'insertUnorderedList',
                option: null
            }
        },
        {
            id: 'olBtn',
            value: 'list-ol',
            tooltip: 'Numbered List',
            type: 'checkbox',
            eventOpts: {
                tag: 'insertOrderedList',
                option: null,
            }
        }
    ]
}
