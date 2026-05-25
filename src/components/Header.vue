<template>
  <div class="Header">
    <div class="header-left">
      <a
        href="https://www.webgishome.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="brand-title"> WebGIS Home </span>
      </a>
    </div>
    <!-- <ElImage
      src="https://pic.webgishome.com/webgishome.jpg"
      style="cursor: pointer; min-width: 50px; margin-left: 70px; width: 50px"
      @click="router.push({ path: '/' })"
    >
    </ElImage> -->
    <div class="menuList">
      <div class="menu">
        <a
          href="https://www.webgishome.com/"
          target="_blank"
          rel="noopener noreferrer"
          style="text-decoration: none; color: inherit; cursor: pointer"
        >
          <div>首页</div>
        </a>
        <div
          :class="{ active: currentChannel === 'cesium' }"
          @click="changeChannel('cesium')"
        >
          <span class="menu-text">三维</span>
          <span class="menu-subtitle">(cesium)</span>
        </div>
        <div
          :class="{ active: currentChannel === 'openlayers' }"
          @click="changeChannel('openlayers')"
        >
          <span class="menu-text">二维</span>
          <span class="menu-subtitle">(openlayers)</span>
        </div>
      </div>
    </div>
    <div class="header-right">
      <a
        href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        title="查看源码"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      </a>
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

  .header-right {
    display: flex;
    align-items: center;
    padding-right: 20px;

    .github-link {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 4px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }

      svg {
        width: 24px;
        height: 24px;
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
      gap: 8px;

      > div,
      > a > div {
        display: inline-block;
        padding: 8px 20px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 15px;
        letter-spacing: 0.5px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-weight: 500;
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
    height: 60px;

    .header-left {
      span {
        margin-left: 10px !important;
        font-size: 20px !important;
        min-width: auto !important;
      }
    }

    .header-right {
      padding-right: 10px;

      .github-link {
        padding: 6px;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .menuList {
      min-width: auto;
      margin-left: auto;
      padding-right: 10px;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .menu {
        gap: 4px;
        white-space: nowrap;

        > div,
        > a > div {
          padding: 6px 12px;
          font-size: 13px;
          letter-spacing: 0;
        }

        .menu-subtitle {
          display: none;
        }

        .title {
          padding: 0 10px;
          font-size: 14px;
        }

        .drop-down {
          position: static;

          .drop-down-content {
            right: 0;
            left: auto;
          }
        }
      }
    }
  }
}
</style>
