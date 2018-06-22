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

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default {
        props: ['fileTreeData', 'selectionData'],
        data: function () {
            return {
                selData: this.selectionData
            }
        },
        components: {
            FontAwesomeIcon
        },
        watch: {
            selData (val) {
                this.$emit('input', val)
            }
        },
        methods: {
            showFile: function (parents) {
                var count = 0
                for (var parent of parents) {
                    if (this.selData[parent]) {
                        count++
                    }
                }
                if (count == parents.length) {
                    return true
                }

                return false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/colors.scss';

    .fileTreeContainer {
        height: calc(100% - 112px);
        width: 100%;
        background: none;
        color: black;
        float: left;
        overflow: auto;
    }

    .fileContainer {
        background: none;
        white-space: nowrap;
        font-size: 14pt;
        padding-left: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        user-select: none;
    }

    input {
        display: none;

        &+label {
            padding: 5px;
            cursor: pointer;
        }

        &:hover+label {
            background: $main-blue-lightest;
        }

        &[type=radio]:checked+label {
            background: $main-blue-lightest;
        }
    }

    .folderIcon {
        color: $main-yellow;
    }

    .fileIcon {
        color: $gray-darkest;
    }
</style>
