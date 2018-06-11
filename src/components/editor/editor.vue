<template>
    <div class="appContainer">
        <div class="docBar" v-on:mousedown="keepFocus($event)">
            <div class="btnGroup" v-for="buttonGroup in editorBtns.docBarGroups">
                <editor-button
                    v-for="button in buttonGroup.btns"
                    v-bind:button="button"
                    v-bind:key="button.id"
                    v-on:button-event="buttonEventControl($event)"
                    v-bind:ref="button.ref"
                ></editor-button>
            </div>

            <div class="btnGroup" style="float: right;" v-for="buttonGroup in editorBtns.settingBarGroups">
                <editor-button
                    v-for="button in buttonGroup.btns"
                    v-bind:button="button"
                    v-bind:key="button.id"
                    v-on:button-event="buttonEventControl($event)"
                    v-bind:ref="button.ref"
                ></editor-button>
            </div>
        </div>
        <div class="editBar" v-on:mousedown="keepFocus($event)">
            <div class="btnGroup" v-for="buttonGroup in editorBtns.editBarGroups">
                <editor-button
                    v-for="button in buttonGroup.btns"
                    v-bind:button="button"
                    v-bind:key="button.id"
                    v-on:button-event="buttonEventControl($event)"
                    v-bind:ref="button.ref"
                ></editor-button>
            </div>
        </div>
        <div class="contentContainer" v-show="!showSource">
            <iframe class="contents" ref="contents" v-bind:src="frameSource"></iframe>
        </div>
        <div class="contentContainer" v-show="showSource">
            <div class="contentsSource" ref="source"></div>
        </div>
    </div>
</template>

<script src="./editor.js"></script>
<style lang="scss" src="../../assets/scss/main.scss"></style>
<style lang="scss" src="./editor.scss" scoped></style>
