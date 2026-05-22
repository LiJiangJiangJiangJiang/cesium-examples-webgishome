<!--TypePanel-->
<template>
    <div class='TypePanel' :id="id">
        <div class="title">{{ title }}</div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    title: string;
}>()
</script>
<style lang="scss" scoped>
.TypePanel {
    width: 100%;
    color: white;

    .title {
        line-height: 50px;
        font-size: 25px;
        padding-left: 60px;
        background-color: #2D2D2D;

    }

    .content {
        background-color: #1E1E1E;
        padding: 5px 10px;
        display: flex;
        flex-flow: row wrap;
    }
}
</style>