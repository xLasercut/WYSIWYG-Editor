<template>
    <div class="fileTreeContainer">
        <div v-for="item in fileTreeData" v-show="showFile(item.allParents)" class="fileContainer">
            <input
                v-bind:type="item.inputType"
                v-bind:id="item.path"
                v-bind:value="item.value"
                v-model="selData[item.model]"
            />
            <label :for="item.path" >
                <span v-html="item.spaces"></span>
                <font-awesome-icon icon="folder" v-if="item.icon == 'folder'" v-show="!selData[item.model]" class="folderIcon"/>
                <font-awesome-icon icon="folder-open" v-if="item.icon == 'folder'" v-show="selData[item.model]" class="folderIcon"/>
                <font-awesome-icon v-bind:icon="item.icon" v-if="item.icon != 'folder'" class="fileIcon"/>
                 {{ item.name }}
            </label>
        </div>
    </div>
</template>

<script src='./file-tree.js'></script>
<style src="../assets/css/main.css"></style>
<style src="../assets/css/button.css"></style>
<style src="../assets/css/file-tree.css" scoped></style>
