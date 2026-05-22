<template>
  <div class="Header">
    <div class="header-left">
      <RouterLink to="/">
        <span
          style="
            cursor: pointer;
            min-width: 175px;
            color: white;
            font-size: 30px;
            margin-left: 50px;
            display: inline-block;
          "
        >
          WebGIS之家
        </span>
      </RouterLink>
    </div>
    <!-- <ElImage
      src="https://pic.webgishome.com/webgishome.jpg"
      style="cursor: pointer; min-width: 50px; margin-left: 70px; width: 50px"
      @click="router.push({ path: '/' })"
    >
    </ElImage> -->
    <div class="menuList">
      <ul class="menu">
        <RouterLink to="/"> <span class="title">首页</span></RouterLink>
        <li class="drop-down">
          <div class="title" style="display: flex; align-items: center">
            <span>基础示例</span>&nbsp;
            <img :src="svg_expand" class="svg_icon" />
          </div>
          <ul class="drop-down-content">
            <li @click="changeChannel('openlayers')">二维 (openlayers)</li>
            <li @click="changeChannel('cesium')">三维 (cesium)</li>
          </ul>
        </li>

        <li class="drop-down">
          <div class="title" style="display: flex; align-items: center">
            <span>相关文档</span>&nbsp;
            <img :src="svg_expand" class="svg_icon" />
          </div>
          <ul class="drop-down-content">
            <li class="drop-down-2">
              <div class="drop-down-2-title">
                <span>openlayers</span>
                <img :src="svg_expand" class="svg_expand_horizontal" />
              </div>
              <ul class="drop-down-content-2">
                <a
                  href="http://file.webgishome.com/ol/latest/apidoc/index.html"
                  target="_blank"
                >
                  <li>openlayers 文档</li>
                </a>
                <a
                  href="https://openlayers.org/en/latest/examples/"
                  target="_blank"
                >
                  <li>openlayers 示例</li>
                </a>
              </ul>
            </li>
            <li class="drop-down-2">
              <div class="drop-down-2-title">
                <span>cesium</span>
                <img :src="svg_expand" class="svg_expand_horizontal" />
              </div>

              <ul class="drop-down-content-2">
                <a
                  href="http://cesium.xin/cesium/cn/Documentation1.72/"
                  target="_blank"
                >
                  <li>cesium 中文api</li>
                </a>
                <a href="https://sandcastle.cesium.com/" target="_blank">
                  <li>cesium 官方示例</li>
                </a>
              </ul>
            </li>
          </ul>
        </li>
        <li class="drop-down">
          <div class="title" style="display: flex; align-items: center">
            <span>SDK类库</span>&nbsp;
            <img :src="svg_expand" class="svg_icon" />
          </div>
          <ul class="drop-down-content">
            <a href="http://webgis3d.webgishome.com/" target="_blank">
              <li v>webgis3d.js</li>
            </a>
          </ul>
        </li>
        <li class="drop-down">
          <div class="title" style="display: flex; align-items: center">
            <span>关于</span>&nbsp;
            <img :src="svg_expand" class="svg_icon" />
          </div>
          <ul class="drop-down-content">
            <a href="https://blog.csdn.net/qq_40323256/" target="_blank">
              <li>csdn</li>
            </a>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import svg_expand from "/svg/expand.svg";
import { useIndexStore } from "@/stores/index";
import { isLogin } from "../hooks";
import { useRoute, useRouter } from "vue-router";
import { computed, inject, nextTick, watch } from "vue";
const indexStore = useIndexStore();
const reload = inject("reload");

const router = useRouter();

const changeChannel = async (name: string) => {
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

      .title {
        line-height: 80px;
        display: inline-block;
        padding: 0 20px;

        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.252);
          color: orange;
        }
      }

      .drop-down {
        position: relative;

        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.252);

          .drop-down-content {
            display: block;
          }

          .svg_icon {
            transform: rotate(-180deg);
          }
        }

        .svg_icon {
          display: inline-block;
          transition: all 0.15s ease-in-out;
        }

        .drop-down-content {
          display: none;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.252);

          padding: 3px 0;

          li {
            line-height: 50px;
            padding: 0 10px;
            width: 150px;
            margin: 3px 0;
            display: flex;
            justify-content: space-between;

            &:hover {
              cursor: pointer;
              background-color: rgba(0, 0, 0, 0.252);

              color: orange;

              .svg_expand_horizontal {
                transform: rotate(90deg);
              }
            }

            .svg_expand_horizontal {
              transform: rotate(-90deg);
              display: inline-block;
              transition: all 0.15s ease-in-out;
            }
          }

          .drop-down-2 {
            position: relative;

            &:hover {
              cursor: pointer;
              background-color: rgba(0, 0, 0, 0.252);

              .drop-down-content-2 {
                display: block;
              }
            }

            .drop-down-2-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }

            .drop-down-content-2 {
              position: absolute;

              right: -170px;
              top: 0;
              display: none;
              background-color: rgba(0, 0, 0, 0.252);
              padding: 3px 0;

              li {
                line-height: 50px;
                padding: 0 10px;
                width: 150px;
                margin: 3px 0;

                &:hover {
                  cursor: pointer;
                  background-color: rgba(0, 0, 0, 0.252);
                }
              }
            }
          }
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
}
</style>
