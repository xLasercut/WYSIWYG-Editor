<template>
    <button class="btn btnCancel" v-on:click="closeWindow()">
        Cancel
    </button>
</template>

<script>
    const { remote } = require('electron')
    let currentWindow = remote.getCurrentWindow()

    export default {
        methods: {
            closeWindow: function () {
                currentWindow.close()
            }
        }
    }

</script>


<style lang="scss" scoped>

</style>
<style src="../assets/css/main.css"></style>
<style src="../assets/css/button.css"></style>
