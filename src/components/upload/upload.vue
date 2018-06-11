<template>
    <div class="appContainer">
        <div class="headerBar">Server Files</div>
        <file-tree :fileTreeData="fileTreeData" :selectionData="selectionData"></file-tree>
        <div class="infoContainer">
            <div class="inputsContainer">
                <div class="inputs">
                    <font-awesome-icon icon="file" /> Server File:
                    <input class="serverFileSelect" v-model="selectionData['selectedFile']"></input>
                </div>
                <div class="inputs">
                    <button class="btnFileSelect" title="Select File to Upload" v-on:click="fileSelect()">
                        <font-awesome-icon icon="file" /> Local File:  {{ localFilePath || "Select File" }}
                    </button>
                </div>
            </div>
            <div class="buttonContainer">
                <cancel-button></cancel-button>
                <red-button text="Delete" icon="trash-alt" v-on:click="deleteFile()"></red-button>
                <green-button text="Upload" icon="upload" v-on:click="uploadFile()"></green-button>
                <green-button text="Reload" icon="sync-alt" v-on:click="reloadFileTree()"></green-button>
            </div>
        </div>
    </div>
</template>

<script src="./upload.js"></script>
<style src="../../assets/scss/main.scss" lang="scss"></style>
<style src="./upload.scss" lang="scss" scoped></style>
