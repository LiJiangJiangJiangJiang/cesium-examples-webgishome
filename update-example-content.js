import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 config.json
const configPath = path.join(__dirname, "public", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const examples = config.webgishome.examples;

// API 基础地址 - 参考 config_settings.js
const API_BASE_URL = "http://localhost:3000";

// 创建 axios 实例，参考 src/api/axios.js 的配置
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60秒超时
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

// 使用 Puppeteer 在浏览器环境中处理富文本内容
async function processHtmlWithBrowser(htmlContent) {
  if (!htmlContent) return null;

  let browser;
  try {
    console.log("      启动浏览器...");
    // 启动浏览器
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // 创建一个简单的 HTML 页面来加载 wangeditor
    await page.setContent(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Process HTML</title>
      </head>
      <body>
        <div id="editor-container"></div>
        <script type="module">
          import { createEditor } from 'https://unpkg.com/@wangeditor/editor@latest/dist/index.esm.js';
          
          window.processContent = async function(htmlContent) {
            try {
              const editor = createEditor({
                selector: '#editor-container',
                html: htmlContent,
                mode: 'default',
                config: {}
              });
              
              // 等待编辑器初始化
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // 获取纯文本内容
              const text = editor.getText();
              
              // 销毁编辑器
              editor.destroy();
              
              return text;
            } catch (error) {
              console.error('Error processing content:', error);
              return htmlContent; // 如果出错，返回原始内容
            }
          };
        </script>
      </body>
      </html>
    `,
      { waitUntil: "networkidle0", timeout: 30000 },
    );

    console.log("      处理富文本内容...");
    // 执行处理函数
    const processedHtml = await page.evaluate(async (content) => {
      if (window.processContent) {
        return await window.processContent(content);
      }
      return content;
    }, htmlContent);

    await browser.close();
    console.log("      浏览器处理完成");
    return processedHtml;
  } catch (error) {
    console.error("      浏览器处理错误:", error.message);
    if (browser) {
      await browser.close();
    }
    // 如果浏览器处理失败，返回原始内容
    return htmlContent;
  }
}

// 获取示例详情并处理 HTML 内容
async function getExampleDetail(exampleId) {
  try {
    const response = await service.get("/examples/info", {
      params: { id: exampleId },
    });

    const data = response.data?.data || response.data || {};
    const rawContent = data.content || "";

    if (!rawContent) {
      return null;
    }

    // 使用浏览器处理富文本内容，提取纯 HTML 代码
    const htmlStr = await processHtmlWithBrowser(rawContent);

    return htmlStr;
  } catch (error) {
    console.error(`  ❌ 获取示例 ${exampleId} 详情失败:`, error.message);
    return null;
  }
}

// 主函数
async function main() {
  console.log("开始获取示例内容并更新文件...\n");

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  // 遍历所有频道
  for (const channelName of Object.keys(examples)) {
    const categories = examples[channelName];
    console.log(`\n处理频道: ${channelName}`);

    // 遍历每个分类
    for (const category of categories) {
      const categoryName = category.name;
      const categoryTitle = category.title;
      console.log(`  分类: ${categoryTitle}`);

      // 遍历分类下的所有示例
      for (const example of category.children) {
        const exampleName = example.name;
        const exampleTitle = example.title;
        const exampleId = example.id;

        if (!exampleId) {
          console.log(`    ️  跳过 ${exampleTitle} (缺少 id)`);
          skipCount++;
          continue;
        }

        // 构建文件路径
        const dirPath = path.join(
          __dirname,
          "public",
          "examples",
          channelName,
          categoryName,
          exampleName,
        );
        const filePath = path.join(dirPath, `${exampleTitle}.html`);

        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
          console.log(`    ⚠️  文件不存在: ${exampleTitle}.html`);
          skipCount++;
          continue;
        }

        // 获取示例内容
        console.log(`    获取: ${exampleTitle} (id: ${exampleId})`);
        const content = await getExampleDetail(exampleId);

        if (!content) {
          console.log(`    ❌ 获取内容为空`);
          failCount++;
          continue;
        }

        // 写入文件
        try {
          fs.writeFileSync(filePath, content, "utf-8");
          console.log(`    ✅ 已更新: ${exampleTitle}.html`);
          successCount++;
        } catch (error) {
          console.error(`    ❌ 写入文件失败:`, error.message);
          failCount++;
        }
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ 处理完成！");
  console.log(`   成功: ${successCount} 个`);
  console.log(`   失败: ${failCount} 个`);
  console.log(`   跳过: ${skipCount} 个`);
  console.log("=".repeat(60));
}

// 运行
main().catch((error) => {
  console.error("程序执行出错:", error);
  process.exit(1);
});
