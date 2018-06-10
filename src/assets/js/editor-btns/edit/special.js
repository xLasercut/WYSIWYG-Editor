module.exports = {
    btns: [
        {
            id: 'insertImgBtn',
            value: 'image',
            tooltip: 'Insert Image',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertImage'
            }
        },
        {
            id: 'insertLinkBtn',
            value: 'link',
            tooltip: 'Insert Link',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertLink'
            }
        },
        {
            id: 'unlinkBtn',
            value: 'unlink',
            tooltip: 'Remove Link',
            eventOpts: {
                tag: 'unlink',
                option: null
            }
        },
        {
            id: 'insertYTBtn',
            value: ['fab', 'youtube'],
            tooltip: 'Insert Youtube Video',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertYoutube'
            }
        },
        {
            id: 'insertCodeBtn',
            value: 'code',
            tooltip: 'Insert HTML',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertCode'
            }
        }
    ]
}
