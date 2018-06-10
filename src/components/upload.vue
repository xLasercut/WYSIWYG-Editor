<template>
    <div class="appContainer">
        <div class="titleContainer">Server Files</div>
        <file-tree :fileTreeData="fileTreeData" :selectionData="selectionData"></file-tree>
        <div class="infoContainer">
            <div class="inputsContainer">
                <div class="inputs">
                    <font-awesome-icon icon="file" /> Server File:
                    <input class="serverFileSelect" v-model="selectionData['selectedFile']"></input>
                </div>
                <div class="inputs">
                    <button class="btn btnFileSelect" title="Select File to Upload" v-on:click="fileSelect()">
                        <font-awesome-icon icon="file" /> Local File:  {{ localFilePath || "Select File" }}
                    </button>
                </div>
            </div>
            <div class="buttonContainer">
                <cancel-button></cancel-button>
                <button class="btn btnCancel" v-on:click="deleteFile()">
                    <font-awesome-icon icon="trash-alt" /> Delete
                </button>
                <button class="btn btnConfirm" title="Upload File" v-on:click="uploadFile()">
                    <font-awesome-icon icon="upload" /> Upload
                </button>
                <button class="btn btnConfirm" title="Refresh Server File Tree" v-on:click="reloadFileTree()">
                    <font-awesome-icon icon="sync-alt" /> Reload
                </button>
            </div>
        </div>
    </div>
</template>

<script src="./upload.js"></script>
<style src="../assets/css/main.css"></style>
<style src="../assets/css/button.css"></style>
<style src="../assets/css/upload.css" scoped></style>
