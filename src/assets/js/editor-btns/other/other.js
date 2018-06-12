module.exports = {
    btns: [
        {
            id: 'othersBtn',
            value: 'plus-square',
            tooltip: 'Others',
            type: 'dropdown',
            drop: {
                containerClass: 'othersContent',
                contents: [
                    {
                        value: "<b>Expandable Image</b>",
                        tooltip: "Insert Expandable Image",
                        eventOpts: {
                            tag: 'insertHTML',
                            option: 'insertExpImg'
                        }
                    }
                ]
            }
        }
    ]
}
