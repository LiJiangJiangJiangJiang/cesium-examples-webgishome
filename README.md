# WebGIS Home - 基于 Cesium & OpenLayers 的 WebGIS 示例集合

<p align="center">
  <strong>所有二三维示例采用原生HTML实现，粘贴即可运行</strong>
</p>

<p align="center">
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues">
    <img src="https://img.shields.io/github/issues/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=flat-square&logo=github" alt="GitHub issues">
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue Version">
  </a>
  <a href="https://cesium.com/">
    <img src="https://img.shields.io/badge/Cesium-1.141-2C3E50?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDBDMTUuMzEzMyAwIDE4LjI5MzIgMS4zNTMzIDIwLjUwNjcgMy41NzY3QzIyLjcyMzMgNS43OTEzIDI0IDguNzcxMyAyNCAxMkMxNiAyMCAxMiAyNCAxMiAyNEMxMiAyNCAxMiAyMCAxMiAxMkMxMiA4Ljc3MTMgMTMuMjc2NyA1Ljc5MTMgMTUuNDkzMyAzLjU3NjdDMTcuNzA2NyAxLjM1MzMgMjAuNjg2NyAwIDI0IDBaIi8+PC9zdmc+" alt="Cesium">
  </a>
  <a href="https://openlayers.org/">
    <img src="https://img.shields.io/badge/OpenLayers-9.x-1F6B75?style=flat-square" alt="OpenLayers">
  </a>
</p>

<p align="center">
  <strong>⭐ 如果您觉得这个项目对您有帮助，请给我们一个 Star！⭐</strong>
</p>

## 📖 项目简介

**WebGIS Home** 是一个专注于 WebGIS 开发的示例平台，集成了 **Cesium**（三维地图）和 **OpenLayers**（二维地图）两大主流地图框架，提供了丰富的地图开发示例和最佳实践。本项目旨在帮助开发者快速入门 WebGIS 开发，提供可参考、可复用的代码示例。

### 🎯 适用人群

- 🗺️ WebGIS 初学者，想要学习地图开发
- 💻 前端开发者，需要集成地图功能到项目中
- 🎓 学生和研究人员，需要地图可视化案例
- 🏢 企业团队，寻找地图开发最佳实践

## ✨ 核心特性

- **双平台支持**：同时支持 Cesium 三维地图和 OpenLayers 二维地图
- 📦 **丰富的示例**：涵盖基础底图、几何体、数据源、标注标绘、测量工具等完整功能模块
- 💻 **在线编辑器**：内置代码编辑器，支持在线查看和运行示例代码
- 📱 **响应式设计**：完美适配桌面端和移动端设备
- 🎨 **现代化 UI**：采用 Element Plus 组件库，界面简洁专业
- 🔧 **开箱即用**：基于 Vite 构建，启动快速，开发体验流畅

## 🗂️ 示例分类

### Cesium 三维地图

| 分类     | 数量 | 说明                            |
| -------- | ---- | ------------------------------- |
| 基础底图 | 2    | ArcGIS、基础地球                |
| 几何体   | 16   | 点、线、面、体等多种几何图形    |
| 数据源   | 6    | GeoJSON、KML、3D Tiles、GLB模型 |
| 标注标绘 | 4    | 点线面绘制、实体绘制            |
| 测量工具 | 5    | 距离测量、面积测量              |
| CZML     | 4    | 点、模型、多边形、多线段        |
| 地形叠加 | 2    | 世界地形、ArcGIS地形            |
| 场景效果 | 5    | 下雪、下雨、雾、火焰等          |
| 其他功能 | 20   | 坐标转换、热力图、拖拽、编辑等  |

### OpenLayers 二维地图

| 分类     | 数量 | 说明                            |
| -------- | ---- | ------------------------------- |
| 基础底图 | 5    | ArcGIS、天地图、3857/4326坐标系 |
| 其他功能 | 25   | 聚类、绘制、样式、事件等        |

## ⚡ 快速开始

### 安装与运行

```bash
# 1️⃣ 克隆项目
git clone https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome.git

# 2️⃣ 进入项目目录
cd cesium-examples-webgishome

# 3️⃣ 安装依赖
npm install

# 4️⃣ 启动开发服务器
npm run dev
```

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🛠️ 技术栈

### 前端框架

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vite** - 下一代前端构建工具

### 地图库

- **Cesium 1.141** - 三维地图引擎
- **OpenLayers** - 二维地图库

### UI 组件

- **Element Plus** - Vue 3 UI 组件库
- **CodeMirror 6** - 代码编辑器

### 状态管理 & 路由

- **Pinia** - Vue 官方状态管理库
- **Vue Router 5** - Vue 官方路由

### 工具库

- **Axios** - HTTP 客户端
- **Day.js** - 日期处理库
- **Sass** - CSS 预处理器

## 🔧 配置说明

### 环境变量

项目通过 `.env` 文件配置基础路径，支持不同环境使用不同的配置：

```bash
# .env（通用配置）
VITE_BASE_URL=/

# .env.production（生产环境，部署到子目录时需要修改）
VITE_BASE_URL=/cesium-examples-webgishome/
```

### 示例配置

所有示例通过 `public/config.json` 进行配置管理，无需修改代码即可动态添加新示例：

```json
{
  "webgishome": {
    "examples": {
      "cesium": [
        {
          "name": "示例名称",
          "path": "examples/cesium/xxx/index.html",
          "category": "分类名称"
        }
      ],
      "openlayers": [...]
    }
  }
}
```

> 📝 **添加新示例步骤**：
>
> 1. 在 `public/examples/` 下创建示例文件夹
> 2. 编写 HTML 文件
> 3. 在 `public/config.json` 中添加配置项
> 4. 刷新页面即可看到新示例

---

<p align="center">Made with ❤️ by WebGIS Home</p>
<p align="center">
  <a href="#top">↑ 回到顶部 ↑</a>
</p>
