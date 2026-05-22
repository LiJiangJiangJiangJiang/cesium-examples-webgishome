<template>
  <div class="index">
    <el-scrollbar height="100vh">
      <div class="swiper">
        <div class="swiper-wrapper">
          <!-- <div class="swiper-slide">openlayers 二维示例</div> -->
          <div
            class="swiper-slide"
            style="cursor: pointer"
            @click="
              router.push({
                path: '/examples',
                query: { channel_name: 'openlayers' },
              })
            "
          >
            openlayers 二维示例
          </div>
          <div
            class="swiper-slide"
            style="background-color: #35cdb5; cursor: pointer"
            @click="
              router.push({
                path: '/examples',
                query: { channel_name: 'cesium' },
              })
            "
          >
            cesium 三维示例
          </div>
          <!-- <div class="swiper-slide" style="background-color: #35cdb5">
            cesium 三维示例
          </div> -->
          <!-- <div class="swiper-slide" style="background-color:#3D416B">test</div> -->
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>

      <div class="produce">
        <div class="produce--rows">
          <el-card class="item" shadow="never">
            <div class="title">
              <img src="https://pic.webgishome.com/common/adjust.png" />
              在线调试
            </div>
            <div class="content">
              openlayers官方示例没有代码编辑器，不便于开发调试，cesium官方示例有代码编辑器，但没有代码提示，调试起来不太方便。为了解决以上两个问题，于是便搭建了这个网站
            </div>
          </el-card>
          <el-card class="item" shadow="never">
            <div class="title">
              <img src="https://pic.webgishome.com/common/codeEditor.png" />
              提供源码
            </div>
            <div class="content">
              所有示例采用原生HTML5代码编写，不依赖任何前端框架，并致力于使用更精简的代码实现功能，降低WebGIS开发门槛
            </div>
          </el-card>
          <el-card class="item" shadow="never">
            <div class="title">
              <img src="https://pic.webgishome.com/common/update.png" />
              示例持续更新...
            </div>
            <div class="content">包括但不限于二三维示例</div>
          </el-card>
        </div>
      </div>
      <Footer></Footer>
      <!-- 返回顶部 -->
      <BackTop></BackTop>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BackTop from "@/components/BackTop.vue";
import { useRoute, useRouter } from "vue-router";
import http from "axios";
import axios from "@/api/axios";
import { useIndexStore } from "@/stores/index";

import Footer from "@/components/Footer.vue";
import { ElMessage } from "element-plus";

let route = useRoute();
const router = useRouter();

const indexStore = useIndexStore();

onMounted(() => {
  let swiper = new Swiper(".swiper", {
    slidesPerView: 1, // 轮播区域展示的数量
    spaceBetween: 10,
    loop: true, // 循环播放
    speed: 500,
    autoplay: {
      // 自动播放
      delay: 7000,
      disableOnInteraction: false,
    },
    // 前进后退按钮
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    // 分页器
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
</script>
<style lang="scss">
.index {
  color: white;

  // font-size: 30px;
  .vcode {
    z-index: 9999;
  }

  h1 {
    color: black;
  }

  .swiper {
    width: 100%;
    // height: 730px;
    height: 730px;

    /* 底部小原点 选中时颜色 */
    --swiper-theme-color: white;

    /* 前进后退按钮 颜色 */
    --swiper-navigation-color: rgba(255, 255, 255, 0.556);
    /* 前进后退按钮 大小 */
    --swiper-navigation-size: 50px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #2caae9;
    display: flex;
    justify-content: center;
    align-items: center;
    // cursor: pointer;
  }

  // 定义新的样式
  // .swiper-button-next {
  //   width: 40px;
  //   height: 40px;
  //   background-color: rgba(2, 2, 2, 0.207);
  //   border-radius: 50%;
  //   &:hover {
  //     background-color: rgba(2, 2, 2, 0.505);
  //   }
  // }
  // .swiper-button-next::after {
  //   content: url("/next.svg");
  // }
  .produce {
    display: flex;
    justify-content: center;

    padding: 180px 0;

    &--rows {
      width: 80vw;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 50px;

      .item {
        min-width: 245px;

        .title {
          color: #3a5169;
          font-size: 23px;
          display: flex;
          align-items: center;

          margin: 20px 0;

          img {
            display: block;
            margin-right: 15px;
            width: 40px;
          }
        }

        .content {
          color: #4e6e8e;
          font-size: 16px;
          line-height: 35px;
        }
      }
    }
  }

  // 移动端适配
  @media screen and (max-width: 768px) {
    .swiper {
      height: 300px !important;

      .swiper-slide {
        font-size: 16px;
      }
    }

    .produce {
      padding: 60px 20px;

      &--rows {
        width: 95vw;
        grid-template-columns: 1fr;
        gap: 30px;

        .item {
          min-width: auto;

          .title {
            font-size: 20px;
            margin: 15px 0;

            img {
              width: 30px;
              margin-right: 10px;
            }
          }

          .content {
            font-size: 14px;
            line-height: 28px;
          }
        }
      }
    }
  }
}
</style>
