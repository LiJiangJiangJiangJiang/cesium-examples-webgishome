# WebGIS Home - 三维与二维地图示例平台

<p align="center">
  <strong>基于 Cesium & OpenLayers 的 WebGIS 示例集合</strong>
</p>

<p align="center">
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome">
    <img src="https://img.shields.io/badge/vue-3.5-blue?logo=vue.js" alt="Vue Version">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome">
    <img src="https://img.shields.io/badge/cesium-1.141-green" alt="Cesium">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome">
    <img src="https://img.shields.io/badge/openlayers-9.x-blue" alt="OpenLayers">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome">
    <img src="https://img.shields.io/github/stars/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=social" alt="GitHub stars">
  </a>
</p>

<p align="center">
  <strong>⭐ 如果您觉得这个项目对您有帮助，请给我们一个 Star！⭐</strong>
</p>

## 📖 项目简介

**WebGIS Home** 是一个专注于 WebGIS 开发的示例平台，集成了 **Cesium**（三维地图）和 **OpenLayers**（二维地图）两大主流地图框架，提供了丰富的地图开发示例和最佳实践。本项目旨在帮助开发者快速入门 WebGIS 开发，提供可参考、可复用的代码示例。

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

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome.git

# 进入项目目录
cd cesium-examples-webgishome

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 访问地址
http://localhost:5176
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
cesium-examples-webgishome/
├── public/                    # 静态资源
│   ├── examples/             # 示例 HTML 文件
│   │   ├── cesium/          # Cesium 示例
│   │   └── openlayers/      # OpenLayers 示例
│   ├── config.json          # 示例配置文件
│   └── proxy.html           # 代理页面
├── src/                      # 源代码
│   ├── api/                 # API 请求
│   │   └── axios.ts        # Axios 封装
│   ├── assets/             # 静态资源
│   ├── components/         # 公共组件
│   │   ├── Header.vue     # 顶部导航
│   │   ├── Footer.vue     # 底部信息
│   │   └── ...
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia 状态管理
│   └── views/              # 页面组件
│       ├── home.vue        # 首页
│       ├── examples/       # 示例列表页
│       └── preview/        # 示例预览页
── .env                     # 环境变量
├── .env.development        # 开发环境变量
├── .env.production         # 生产环境变量
├── vite.config.ts          # Vite 配置
└── package.json            # 项目依赖
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

## ⚙️ 配置说明

### 环境变量

项目支持通过环境变量配置基础路径：

```bash
# .env
VITE_BASE_URL=/

# .env.production
VITE_BASE_URL=/cesium-examples-webgishome/
```

### 示例配置

示例数据通过 `public/config.json` 文件进行配置管理，支持动态添加和修改示例：

```json
{
  "webgishome": {
    "examples": {
      "cesium": [...],
      "openlayers": [...]
    }
  }
}
```

## 📱 响应式支持

项目已针对移动端进行优化，在不同设备上均能提供良好的用户体验：

- **桌面端**：完整功能展示，支持代码编辑器和预览分屏
- **平板端**：自适应布局，保持良好的交互体验
- **移动端**：简化布局，支持触摸操作和手势

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进本项目！

### 贡献步骤

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 开源协议

本项目基于 [MIT License](https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/blob/main/LICENSE) 开源协议。

## 🔗 相关链接

- [在线演示](https://www.webgishome.com)
- [在线文档](https://www.webgishome.com/docs/)
- [Cesium 官方文档](https://cesium.com/docs/)
- [OpenLayers 官方文档](https://openlayers.org/doc/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)

## 📬 联系方式

- **GitHub**: [@LiJiangJiangJiangJiang](https://github.com/LiJiangJiangJiangJiang)
- **Website**: [www.webgishome.com](https://www.webgishome.com)

---

<p align="center">Made with ❤️ by WebGIS Team</p>
