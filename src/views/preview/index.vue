<template>
  <div class="preview">
    <div class="left" v-show="isExpandMap">
      <div class="toolbar">
        <!-- <span style="color:#CCCCCC">代码编辑器</span> -->
        <span style="color: #cccccc">在线代码编辑器</span>

        <el-link
          type="warning"
          style="margin-left: 5px"
          :href="href_currentChannel"
          target="_blank"
          >【所有示例】</el-link
        >
        <div class="toolbar--right">
          <!-- <div class="btn btn_expand" @click="isExpandCode = !isExpandCode"
                        :title="!isExpandCode ? '展开代码编辑器' : '折叠代码编辑器'">{{
        !isExpandCode ? '展开' : '折叠'
}}</div> -->
          <div
            class="btn btn_reset"
            style="margin: 0 10px"
            @click="resetCode"
            title="重置"
          >
            <svg
              t="1689088696988"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9706"
              width="25"
              height="25"
            >
              <path
                d="M865.28 624.64a42.666667 42.666667 0 0 0-55.893333 23.04 298.666667 298.666667 0 1 1-135.68-377.6l-68.693334 80.213333a26.453333 26.453333 0 0 0 20.053334 42.666667h230.4a26.453333 26.453333 0 0 0 26.026666-30.293333l-35.413333-227.84a26.026667 26.026667 0 0 0-45.653333-12.8l-70.4 82.346666a384 384 0 1 0 158.293333 475.733334 42.666667 42.666667 0 0 0-23.04-55.466667z"
                fill="#C5C5C5"
                p-id="9707"
              ></path>
            </svg>
          </div>
          <div class="btn btn_run" @click="runCode" title="运行">
            <svg
              t="1689088164445"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5897"
              width="25"
              height="25"
            >
              <path
                d="M264.3 141.6l275.4 179.3 284 184.8c1 0.6 3.6 2.4 3.6 6.7 0 4.3-2.6 6.1-3.6 6.7L539.8 704 264.3 883.3c-0.2-1-0.3-2.1-0.3-3.5V145.1c0-1.3 0.2-2.5 0.3-3.5M262 66.2c-36.5 0-70 32.9-70 78.9v734.6c0 46 33.5 78.9 70 78.9 11.6 0 23.6-3.3 34.8-10.7L579 764.2l284-184.8c48.5-31.6 48.5-102.5 0-134.1L579 260.5 296.9 76.9c-11.3-7.3-23.2-10.7-34.9-10.7z"
                fill="#C5C5C5"
                p-id="5898"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="editor" ref="ref_editor"></div>
    </div>
    <div class="middle">
      <div
        class="expandButton"
        @click="isExpandMap = !isExpandMap"
        :style="{ left: currentChannel === 'openlayers' ? '40px' : '10px' }"
      >
        <div class="expandButton-inner">
          <span v-show="isExpandMap" style="display: flex; align-items: center">
            <el-icon style="margin-right: 2px"> <Fold /> </el-icon>展开</span
          >
          <span
            v-show="!isExpandMap"
            style="display: flex; align-items: center"
          >
            <el-icon style="margin-right: 2px"> <Expand /> </el-icon>源码</span
          >
        </div>
      </div>
      <div
        style="
          position: absolute;
          bottom: 10px;
          left: 10px;
          cursor: pointer;
          color: #2caae9;
          display: inline-block;
          min-width: 100px;
        "
        @click="openNewWindow"
      >
        <img src="https://pic.webgishome.com/webgishome.png" />
        <!-- WebGIS之家 -->
      </div>
    </div>
    <iframe class="preview" ref="ref_preview" frameborder="0"></iframe>
  </div>
</template>
<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  computed,
  watch,
} from "vue";
import { createEditor } from "@wangeditor/editor";
import axios from "@/api/axios.js";
import { Expand, Fold } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useIndexStore } from "@/stores/index";
import { ElMessage } from "element-plus";
import { isLogin } from "@/hooks";
import { ElNotification } from "element-plus";

const indexStore = useIndexStore();

let route = useRoute();
let router = useRouter();
const currentChannel = ref();
const href_currentChannel = computed(() => {
  return `/examples?channel_name=${currentChannel.value}`;
});

// document.title += route.query.title
onMounted(() => {
  // console.log("route:", route)
  // console.log("document.title:", document.title)
  // document.title += route.query.title
  document.title = document.title + " | " + route.query.title;
});

// const isExpandCode = ref(false)

const isExpandMap = ref(true);

const ref_editor = ref();
const ref_preview = ref();

let monacoEditor = {};
let htmlStr_origin = "";

//打开新窗口
const openNewWindow = () => {
  window.open("http://www.webgishome.com", "_blank");
};

onMounted(async () => {
  let data = await axios.get("/examples/info", {
    params: {
      id: route.query.id,
    },
  });

  // 移除加密后，数据结构可能直接是 data
  let newData = data.data?.data || data.data || {};

  currentChannel.value = newData?.channel_name;

  if (currentChannel.value == "cesium") {
    // qq浏览器无法打开cesium，给出浏览器建议
    let isQQBrowser = navigator.userAgent.indexOf("QQBrowser") > -1;
    if (isQQBrowser) {
      ElNotification({
        title: "提示",
        message:
          "推荐使用<strong>谷歌浏览器</strong>或<strong>Edge浏览器</strong>预览",
        type: "warning",
        dangerouslyUseHTMLString: true,
        duration: 0,
      });
    }
  }

  let htmlStr = createEditor({ html: newData?.content }).getText();
  htmlStr_origin = htmlStr;

  monacoEditor = monaco.editor.create(ref_editor.value, {
    theme: "vs-dark", // 主题
    value: ``, // 默认显示的值
    language: "html",
    fontSize: 18, //字体大小
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
    scrollBeyondLastLine: true, // 滚动完最后一行后再滚动一些屏幕
    readOnly: false, //是否只读  取值 true | false
    wordWrap: "off", // 代码超出换行
    minimap: {
      enabled: true, // 小地图
    },
  });
  monacoEditor.setValue(htmlStr); //设置初始值

  nextTick(() => {
    setTimeout(() => {
      runCode();
    }, 1000);
  });
});
// 运行代码
const runCode = () => {
  ref_preview.value.setAttribute("srcdoc", monacoEditor.getValue());
};
// 重置代码
const resetCode = () => {
  ref_preview.value.setAttribute("srcdoc", htmlStr_origin);
  monacoEditor.setValue(htmlStr_origin); //设置初始值
};
</script>
<style scoped lang="scss">
.preview {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  user-select: none;

  .left {
    min-width: 60vw;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr;
    flex: auto;

    .toolbar {
      line-height: 50px;
      // background-color: #1E1E1E;
      // background-color: #323233;
      background-color: #252526;

      display: flex;
      color: white;
      padding: 0 10px;
      align-items: center;

      .toolbar--right {
        margin-left: auto;
        display: flex;
        align-items: center;

        .btn {
          width: 37px;
          height: 37px;
          border-radius: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;

          background-color: #252526;

          &:hover {
            cursor: pointer;
          }
        }

        .btn_expand {
          background-color: #7d4bea;

          &:hover {
            background-color: rgb(165, 141, 218);
          }
        }

        .btn_run {
          // background-color: #67c23a;

          &:hover {
            background-color: #363737;
          }
        }

        .btn_reset {
          // background-color: #409EFF;

          &:hover {
            background-color: #363737;
          }
        }
      }
    }

    .editor {
      // width: 100%;
      height: 100%;
      position: relative;
    }

    .editor_expand {
      width: 100vw;
    }
  }

  .middle {
    height: 100vh;
    position: relative;

    .expandButton {
      position: absolute;
      left: 10px;
      top: 10px;
      color: white;
      cursor: pointer;
      width: 200px;

      &-inner {
        border: 1px solid white;
        display: inline-block;
        padding: 3px 12px;

        &:hover {
          color: orange;
          border: 1px solid orange;
        }
      }
    }
  }

  .preview {
    flex: auto;
    height: 100vh;
    min-width: 40vw;
    // width: 40vw;
  }
}
</style>
