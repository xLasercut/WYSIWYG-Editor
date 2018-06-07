module.exports = {
    btns: [
        {
            id: 'insertImgBtn',
            value: '<i class="fas fa-image"></i>',
            tooltip: 'Insert Image',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertImage'
            }
        },
        {
            id: 'insertLinkBtn',
            value: '<i class="fas fa-link"></i>',
            tooltip: 'Insert Link',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertLink'
            }
        },
        {
            id: 'unlinkBtn',
            value: '<i class="fas fa-unlink"></i>',
            tooltip: 'Remove Link',
            eventOpts: {
                tag: 'unlink',
                option: null
            }
        },
        {
            id: 'insertYTBtn',
            value: '<i class="fab fa-youtube"></i>',
            tooltip: 'Insert Youtube Video',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertYoutube'
            }
        },
        {
            id: 'insertCodeBtn',
            value: '<i class="fas fa-code"></i>',
            tooltip: 'Insert HTML',
            eventOpts: {
                tag: 'insertHTML',
                option: 'insertCode'
            }
        }
    ]
}
