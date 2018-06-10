module.exports = {
    btns: [
        {
            id: 'consoleBtn',
            value: 'terminal',
            tooltip: 'Display Source',
            type: 'checkbox',
            eventOpts: {
                name: 'display-html',
                tag: 'displaySource'
            }
        },
        {
            id: 'settingsBtn',
            value: 'cog',
            tooltip: 'App Settings',
            eventOpts: {
                name: 'open-settings'
            }
        }
    ]
}
