<template>
    <div class="appContainer">
        <div class="headerBar">Settings</div>
        <div class="inputContainer" ref="inputContainer">
            <div class="inputDiv">
                <span class="inputLabel">API Key </span><input class="promptInput" v-model="apiKey"></input>
            </div>
        </div>
        <div class="buttonsContainer">
            <cancel-button></cancel-button>
            <green-button text="Confirm" v-on:click="confirmOption()"></green-button>
        </div>
    </div>
</template>


<script src="./settings.js"></script>
<style src="../../assets/scss/main.scss" lang="scss"></style>
<style src="../prompt/prompt.scss" lang="scss" scoped></style>
