<template>
    <div class="btnDiv">

        <input
            class="btnInput"
            v-bind:id="button.id"
            v-bind:type="button.type"
            v-on:click="$emit('button-event', button.eventOpts)"
            v-if="button.type != 'dropdown'"
            v-model="status"
        />
        <label
            v-bind:for="button.id"
            v-bind:class="button.class"
            v-bind:title="button.tooltip"
            v-if="button.type != 'dropdown'"
        >
            <font-awesome-icon v-bind:icon="button.value" />
        </label>

        <div
            v-bind:class="button.class"
            v-bind:title="button.tooltip"
            v-if="button.type == 'dropdown'"
        >
            <span
                v-bind:style="value.style"
                v-if="button.value"
            >
                <font-awesome-icon v-bind:icon="button.value" />
            </span>
            <span
                v-bind:class="button.labelClass"
                v-bind:style="value.style"
                v-if="!button.value"
                v-html="value.html"
            />
            <div
                v-bind:class="button.drop.containerClass"
            >
                <button
                    v-bind:class="button.drop.btnClass"
                    v-bind:style="dropBtn.style"
                    v-bind:title="dropBtn.tooltip"
                    v-for="dropBtn in button.drop.contents"
                    v-html="dropBtn.value"
                    v-on:click="$emit('button-event', dropBtn.eventOpts)"
                />
            </div>
        </div>

    </div>
</template>

<script src="./editor-button.js"></script>
