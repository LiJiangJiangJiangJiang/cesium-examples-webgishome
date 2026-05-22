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
            v-for="data in item.children"
            :key="data.name"
            :title="data.title"
            :src="data.img"
            :category_title="item.name"
            :name="data.name"
          >
          </PreviewItem>
        </TypePanel>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TypePanel from "@/components/TypePanel.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

let examples = ref<any[]>([]);
const currentElementId = ref("");

const clickAsideItem = (elementId: string) => {
  currentElementId.value = elementId;
  document?.getElementById(elementId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
};

const loadConfigData = async () => {
  try {
    const response = await fetch("/config.json");
    const config = await response.json();

    // 根据路由参数获取对应的频道数据
    const channelName = (route.query.channel_name as string) || "cesium";
    // 正确的数据路径：webgishome.examples.cesium
    const channelData = config.webgishome?.examples?.[channelName] || [];

    examples.value = channelData;
    // console.log("examples.value:", examples.value);

    // 设置默认选中第一个分类
    if (channelData.length > 0) {
      currentElementId.value = channelData[0].name;
    }

    // console.log("加载的数据:", channelData);
  } catch (error) {
    console.error("加载配置文件失败:", error);
  }
};

onMounted(async () => {
  await loadConfigData();
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
