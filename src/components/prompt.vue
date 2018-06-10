<template>
    <div class="appContainer">
        <div class="headerBar">{{ title }}</div>
        <div class="inputContainer" ref="inputContainer">
            <div class="inputDiv" v-for="input in inputs">
                <span
                    class="inputLabel"
                    v-if="input.type != 'textarea'"
                >
                    {{ input.name }}
                </span>
                <input
                    class="promptInput"
                    v-bind:type="input.inputType"
                    v-bind:ref="input.name"
                    v-bind:placeholder="input.placeholder"
                    v-if="input.type == 'input'"
                />

                <textarea
                    class="promptTa"
                    v-bind:ref="input.name"
                    v-bind:placeholder="input.placeholder"
                    v-if="input.type == 'textarea'"
                ></textarea>

                <select
                    class="promptSelect"
                    v-bind:ref="input.name"
                    v-if="input.type == 'select'"
                >
                    <option v-for="option in input.options">{{ option }}</option>
                </select>
            </div>
        </div>
        <div class="buttonsContainer">
            <button class="btn btnCancel" v-on:click="cancelOption()">Cancel</button>
            <button class="btn btnConfirm" v-on:click="confirmOption()">Confirm</button>
        </div>
    </div>
</template>

<script src="./prompt.js"></script>
<style src="../assets/css/main.css"></style>
<style src="../assets/css/button.css"></style>
<style src="../assets/css/prompt.css"></style>
