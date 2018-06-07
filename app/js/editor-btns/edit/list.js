module.exports = {
    btns: [
        {
            id: 'ulBtn',
            value: '<i class="fas fa-list"></i>',
            tooltip: 'Bullet List',
            type: 'checkbox',
            eventOpts: {
                tag: 'insertUnorderedList',
                option: null
            }
        },
        {
            id: 'olBtn',
            value: '<i class="fas fa-list-ol"></i>',
            tooltip: 'Numbered List',
            type: 'checkbox',
            eventOpts: {
                tag: 'insertOrderedList',
                option: null,
            }
        }
    ]
}
