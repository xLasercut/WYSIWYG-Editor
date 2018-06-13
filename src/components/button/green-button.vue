<template>
    <button v-on:click="$emit('click')"><font-awesome-icon v-bind:icon="icon" v-if="icon"/> {{ text }}</button>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
        props: ['text', 'icon'],
        components: {
            FontAwesomeIcon
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixin/button.scss';

    button {
        @include button-general(100%, 80px);
        font-size: 11pt;
        font-family: inherit;
        background: none;
        color: $main-green;
        float: right;
        @include button-effect-general ($main-green-light, $main-green, white, white);
    }
</style>
