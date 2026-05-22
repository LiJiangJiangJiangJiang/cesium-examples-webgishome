import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 config.json
const configPath = path.join(__dirname, "public", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const examples = config.webgishome.examples;

// 遍历所有频道 (cesium, openlayers)
Object.keys(examples).forEach((channelName) => {
  const categories = examples[channelName];

  // 遍历每个分类
  categories.forEach((category) => {
    const categoryName = category.name;
    const categoryTitle = category.title;

    // 遍历分类下的所有示例
    category.children.forEach((example) => {
      const exampleName = example.name;
      const exampleTitle = example.title;

      // 构建文件路径: public/examples/{channel}/{category}/{exampleName}/{exampleTitle}.html
      const dirPath = path.join(
        __dirname,
        "public",
        "examples",
        channelName,
        categoryName,
        exampleName,
      );
      const filePath = path.join(dirPath, `${exampleTitle}.html`);

      // 创建目录
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // 创建 HTML 文件
      const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${exampleTitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #007fd4;
            padding-bottom: 10px;
        }
        .info {
            margin: 15px 0;
            padding: 10px;
            background: #f9f9f9;
            border-left: 4px solid #007fd4;
        }
        .info label {
            font-weight: bold;
            color: #666;
            margin-right: 10px;
        }
        .content {
            margin-top: 30px;
            padding: 20px;
            background: #fafafa;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            min-height: 400px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${exampleTitle}</h1>
        
        <div class="info">
            <label>频道:</label> ${channelName}
        </div>
        <div class="info">
            <label>分类:</label> ${categoryTitle} (${categoryName})
        </div>
        <div class="info">
            <label>示例名称:</label> ${exampleName}
        </div>
        
        <div class="content">
            <p>示例内容区域 - 请在此处添加您的实现代码</p>
        </div>
    </div>
</body>
</html>`;

      // 写入文件
      fs.writeFileSync(filePath, htmlContent, "utf-8");
      console.log(
        `✓ 已创建: examples/${channelName}/${categoryName}/${exampleName}/${exampleTitle}.html`,
      );
    });
  });
});

console.log("\n✅ 所有示例文件创建完成!");
