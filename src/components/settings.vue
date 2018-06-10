<template>
    <div class="appContainer">
        <div class="headerBar">Settings</div>
        <div class="inputContainer" ref="inputContainer">
            <div class="inputDiv">
                <span class="inputLabel">API Key </span><input class="promptInput" v-model="apiKey"></input>
            </div>
        </div>
        <div class="buttonsContainer">
            <button class="btn btnCancel" v-on:click="cancelOption()">Cancel</button>
            <button class="btn btnConfirm" v-on:click="confirmOption()">Confirm</button>
        </div>
    </div>
</template>


<script src="./settings.js"></script>
<style src="../assets/css/main.css"></style>
<style src="../assets/css/button.css"></style>
<style src="../assets/css/prompt.css"></style>
