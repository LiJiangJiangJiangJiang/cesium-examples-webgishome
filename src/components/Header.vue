<template>
  <div class="Header">
    <div class="header-left">
      <RouterLink to="/">
        <span class="brand-title"> WebGIS Home </span>
      </RouterLink>
    </div>
    <!-- <ElImage
      src="https://pic.webgishome.com/webgishome.jpg"
      style="cursor: pointer; min-width: 50px; margin-left: 70px; width: 50px"
      @click="router.push({ path: '/' })"
    >
    </ElImage> -->
    <div class="menuList">
      <div class="menu">
        <div
          :class="{ active: currentChannel === 'cesium' }"
          @click="changeChannel('cesium')"
        >
          三维 (cesium)
        </div>
        <div
          :class="{ active: currentChannel === 'openlayers' }"
          @click="changeChannel('openlayers')"
        >
          二维 (openlayers)
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import svg_expand from "/svg/expand.svg";
import { useIndexStore } from "@/stores/index";
import { useRoute, useRouter } from "vue-router";
import { computed, inject, nextTick, watch, ref, onMounted } from "vue";
const indexStore = useIndexStore();
const reload = inject("reload");

const router = useRouter();
const route = useRoute();
const currentChannel = ref("cesium"); // 当前选中的频道

// 初始化时从路由参数获取当前频道
onMounted(() => {
  const channelName = (route.query.channel_name as string) || "cesium";
  currentChannel.value = channelName;
});

const changeChannel = async (name: string) => {
  currentChannel.value = name;
  router.push({ path: "/examples", query: { channel_name: name } });
  setTimeout(() => {
    reload();
  }, 100);
};
</script>
<style lang="scss">
.Header {
  height: 80px;
  width: 100%;
  // min-width: 1284px;
  color: white;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.316);
  // background-color: #32323399;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  user-select: none;
  white-space: nowrap;

  .header-left {
    .brand-title {
      cursor: pointer;
      min-width: 175px;
      color: white;
      font-size: 30px;
      margin-left: 50px;
      display: inline-block;
      white-space: nowrap;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .menuList {
    margin-left: auto;
    min-width: 600px;
    height: 80px;
    display: flex;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
      color: white;
    }

    .menu {
      display: flex;
      height: 100%;
      align-items: center;
      gap: 20px;

      > div {
        display: inline-block;
        padding: 15px 25px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 20px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.752);
          color: orange;
        }

        &.active {
          background-color: rgba(0, 0, 0, 0.752);
          color: orange;
        }
      }
    }
  }

  .userLogin {
    min-width: 300px;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    text-align: right;
    // margin-right: 30px;
  }

  .btn {
    cursor: pointer;
    color: white;
    display: inline-block;

    &:hover {
      color: orange;
    }
  }

  // 移动端适配
  @media screen and (max-width: 768px) {
    .header-left {
      span {
        margin-left: 10px !important;
        font-size: 24px !important;
        min-width: auto !important;
      }
    }

    .menuList {
      min-width: auto;
      margin-left: auto;
      padding-right: 10px;

      .menu {
        .title {
          padding: 0 10px;
          font-size: 14px;
        }

        .drop-down {
          position: static; // 改为 static 让下拉菜单相对于 viewport 定位

          .drop-down-content {
            right: 0; // 靠右对齐
            left: auto;
          }
        }
      }
    }
  }
}
</style>
