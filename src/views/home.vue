<!--home-->
<template>
    <div class='home'>
        <Header></Header>
        <div style="display:flex;flex-flow: column nowrap;height: 100vh;">
            <div style="flex:auto; ">
                <RouterView v-if="isRouterAlive" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Header from '@/components/Header.vue'

import { computed, nextTick, onMounted, ref } from 'vue';
import { provide } from 'vue';


// 删除页面缓存，保证无感刷新
const isRouterAlive = ref(true)
const reload = () => {
    isRouterAlive.value = false;
    nextTick(() => {
        isRouterAlive.value = true;
    })
}
provide("reload", reload)

</script>
<style lang="scss" scoped>
.home {
    // user-select: none;
}
</style>