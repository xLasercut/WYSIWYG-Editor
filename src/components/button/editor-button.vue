<template>
    <div class="container">
        <input
            v-bind:id="button.id"
            v-bind:type="button.type"
            v-on:click="$emit('button-event', button.eventOpts)"
            v-if="button.type != 'dropdown'"
            v-model="checked"
        />
        <label
            v-bind:for="button.id"
            v-bind:title="button.tooltip"
            v-if="button.type != 'dropdown'"
        >
            <font-awesome-icon v-bind:icon="button.value" />
        </label>

        <div class="dropdown" v-if="button.type == 'dropdown'">
            <span
                v-bind:id="button.id"
                v-bind:style="drop.style"
                v-bind:title="button.tooltip"
                v-if="button.value"
            >
                <font-awesome-icon v-bind:icon="button.value" />
            </span>
            <span
                v-bind:id="button.id"
                v-bind:style="drop.style"
                v-bind:title="button.tooltip"
                v-if="!button.value"
                v-html="drop.html"
            />
            <div v-bind:class="button.drop.containerClass">
                <button
                    v-for="dropBtn in button.drop.contents"
                    v-bind:class="button.drop.btnClass"
                    v-bind:style="dropBtn.style"
                    v-bind:title="dropBtn.tooltip"
                    v-html="dropBtn.value"
                    v-on:click="$emit('button-event', dropBtn.eventOpts)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default {
        props: ['button'],
        components: {
            FontAwesomeIcon
        },
        data: function () {
            return {
                checked: false,
                drop: {}
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import '../../assets/scss/mixin/button.scss';
    @import '../../assets/scss/templates/dropdown.scss';

    .container {
        height: 100%;
        float: left;
    }

    label {
        @include button-general(100%, 40px);
        font-size: inherit;
        font-family: inherit;
        background: none;
        color: $gray-darkest;
        line-height: 35px;
        text-align: center;
        float: left;
        @include button-effect-general($gray-dark, $gray-darker, $gray-darkest, $gray-darkest)
    }

    input {
        display: none;
        &:checked+label {
            background: $gray-dark;
        }
        &:checked+label:active {
            background: $gray-darker;
        }
    }

    #ulineBtn+label {
        line-height: 37px;
    }

    #subSBtn+label {
        line-height: 40px;
    }

    #supSBtn+label {
        line-height: 32px;
    }

    .dropdown {
        @include button-general(100%, auto);
        position: relative;
        line-height: 35px;
        color: $gray-darkest;
        float: left;

        &:hover {
            background: $gray-dark;
        }

        span {
            min-width: 40px;
            display: block;
        }

        div {
            @extend %dropdown-content;
            min-width: 100px;
            width: 100%;

            button {
                @include button-general(25px, calc(100% - 2px));
                padding: 0;
                background: none;
                margin: 1px;
                color: $gray-darkest;
                float: left;
                @include button-effect-general($gray-dark, $gray-darker, $gray-darkest, $gray-darkest)
            }

            .btnDropColor {
                width: 18px;
                height: 18px;
                margin: 1px;
                border: 1px solid $gray-dark;
            }

            .btnDropColor:hover {
                border: 1px solid $main-yellow;
                outline: 1px solid $main-orange;
            }

            .btnDropColor:active {
                border: 1px solid $main-yellow;
                outline: 2px solid $main-orange;
            }
        }

        &:hover div {
            display: block;
        }

        #familyBtn {
            width: 150px;
        }

        .fgcContent {
            width: 200px;
        }

        .othersContent {
            width: 200px;
        }

    }

    #uploadBtn+label {
        width: 50px;
        background: $gray;
        @include button-effect-general($main-blue, $main-blue-dark, white, white);
    }
</style>
