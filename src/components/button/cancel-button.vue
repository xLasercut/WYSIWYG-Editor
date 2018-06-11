<template>
    <red-button text="Cancel" v-on:click="closeWindow()"></red-button>
</template>

<script>
    import RedButton from './red-button.vue'

    const { remote } = require('electron')
    let currentWindow = remote.getCurrentWindow()

    export default {
        components: {
            RedButton
        },
        methods: {
            closeWindow: function () {
                currentWindow.close()
            }
        }
    }
</script>
