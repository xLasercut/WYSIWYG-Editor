module.exports = {
    btns: [
        {
            id: 'consoleBtn',
            value: '<i class="fas fa-terminal"></i>',
            tooltip: 'Display Source',
            type: 'checkbox',
            eventOpts: {
                name: 'display-html',
                tag: 'displaySource'
            }
        },
        {
            id: 'settingsBtn',
            value: '<i class="fas fa-cog"></i>',
            tooltip: 'App Settings',
            eventOpts: {
                name: 'open-settings'
            }
        }
    ]
}
