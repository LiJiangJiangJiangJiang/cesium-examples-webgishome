<template>
  <div class="examples">
    <div class="bottom">
      <el-scrollbar class="bottom--left">
        <div
          class="asideItem"
          :class="{ asideItemActive: currentElementId === item.name }"
          @click="clickAsideItem(item.name)"
          v-for="(item, index) in examples"
          :key="index"
        >
          {{ item.title }} ({{ item.children.length }})
        </div>
      </el-scrollbar>

      <el-scrollbar>
        <TypePanel
          v-for="(item, index) in examples"
          :key="index"
          :id="item.name"
          :title="item.title"
        >
          <PreviewItem
            v-for="(data, i) in item.children"
            :key="i"
            :title="data.title"
            :src="data.img"
            :example_id="data.id"
            :category_itle="item.title"
            :example_name="data.name"
          >
          </PreviewItem>
        </TypePanel>
      </el-scrollbar>
    </div>
    <!-- <div class="wechat" v-if="isLogin()">
      <img
        src="https://pic.webgishome.com/common/lj_wechat.png"
        v-if="isShowWechatQrCode"
        style="display: block; margin-right: 5px; border-radius: 5px"
      />
      <div
        style="display: inline-block; border-radius: 5px"
        :class="{ wechat__icon: !isShowWechatQrCode }"
        @mouseover="isShowWechatQrCode = true"
        @mouseleave="isShowWechatQrCode = false"
      >
        <img
          src="https://pic.webgishome.com/common/wechat.png"
          style="display: block"
        />
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import TypePanel from "@/components/TypePanel.vue";
import { inject, onMounted, ref, shallowRef } from "vue";
import axios from "@/api/axios.js";
import { sortBy } from "@/utils/index.ts";
import { useRoute } from "vue-router";
import { watch } from "fs";
import { useIndexStore } from "@/stores/index";
import { computed } from "@vue/reactivity";

const indexStore = useIndexStore();
let route = useRoute();

const isShowWechatQrCode = ref(false);

let examples = ref([
  // {
  //     name: "BasicMaps",
  //     title: "基础底图",
  //     children: [
  //         {
  //             name: "ArcgisMap",
  //             title: "ArcGIS在线底图",
  //             img: "/test.png",
  //             content: `<!DOCTYPE html>
  //         <html lang="en">
  //         <head>
  //             <meta charset="UTF-8">
  //             <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //             <title>test</title>
  //         </head>
  //         <body>
  //             <h1>ArcGIS在线底图</h1>
  //         </body>
  //         </html>`
  //         }
  //     ]
  // }
]);
const currentElementId = ref("BasicMaps");
const clickAsideItem = (elementId: string) => {
  currentElementId.value = elementId;
  document?.getElementById(elementId)?.scrollIntoView({
    behavior: "smooth", //smooth:平滑，auto：直接定位
    block: "start",
    inline: "start",
  });
};
const getExampleList = async () => {
  var categoryList = await axios.get("/category/channel_name", {
    params: {
      channel_name: route.query.channel_name,
      is_manager: indexStore.userinfo.is_manager,
    },
  });
  var examplesList = await axios.get("/examples/channel_name", {
    params: {
      channel_name: route.query.channel_name,
      is_manager: indexStore.userinfo.is_manager,
    },
  });

  // 移除加密后，数据结构可能直接是 rows 或者 data
  const categoryData =
    categoryList.data?.data?.rows || categoryList.data?.data || [];
  const examplesData =
    examplesList.data?.data?.rows || examplesList.data?.data || [];

  categoryList = Array.isArray(categoryData)
    ? categoryData.sort(sortBy("sort", true))
    : [];
  examplesList = Array.isArray(examplesData) ? examplesData : [];

  let arr_category = categoryList.map((item) => {
    return { ...item, children: [] };
  });

  for (let i = 0; i < categoryList.length; i++) {
    for (let j = 0; j < examplesList.length; j++) {
      if (examplesList[j].category_id === categoryList[i].id) {
        arr_category[i].children.push(examplesList[j]);
      }
    }
  }
  console.log(arr_category);
  examples.value = arr_category;
};

onMounted(async () => {
  await getExampleList();
});
</script>
<style lang="scss" scoped>
.examples {
  background-color: #252526;
  color: #9cbbc3;

  width: 100%;
  min-width: 1180px;
  height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr;
  overflow: hidden;
  user-select: none;

  .bottom {
    display: grid;
    grid-template-columns: 220px 1fr;
    color: rgba(255, 255, 255, 0.95);
    height: calc(100vh - 80px);
    margin-top: 80px;

    &--left {
      .asideItem {
        line-height: 47px;

        padding: 0 20px;
        border: 1px solid #252526;
        background-color: #252526;
        margin: 0 10px 5px 3px;

        &:hover {
          border: 1px solid #007fd4;
          background-color: #04395e;
          cursor: pointer;
        }
      }

      .asideItemActive {
        border: 1px solid #007fd4;
        background-color: #04395e;

        cursor: pointer;
      }
    }
  }

  .wechat {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: flex-end;

    .wechat__icon {
      opacity: 0.3;
    }
  }
}
</style>
