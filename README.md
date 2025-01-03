# 金句卡片生成器

一个Chrome扩展,用于生成精美的金句卡片。

## 功能特性

- 网页文字选择并生成卡片
- 多种卡片模板
- 自定义样式设置
- 导出多种图片格式(PNG/JPG/WebP)
- 历史记录与撤销/重做
- 模板导入导出
- 图片质量和缩放设置

## 使用说明

1. 安装扩展
   - 在Chrome扩展商店搜索"金句卡片生成器"并安装
   - 或下载发布包,打开Chrome扩展管理页面,加载已解压的扩展程序

2. 基本使用
   - 在网页中选择文字
   - 右键点击,选择"生成金句卡片"
   - 在弹出窗口中编辑文字
   - 选择模板和调整样式
   - 点击导出按钮生成图片

3. 高级功能
   - 自定义模板样式
   - 导入/导出模板
   - 调整导出图片质量
   - 查看历史记录
   - 撤销/重做操作

## 开发说明

### 环境要求

- Node.js 16+
- pnpm 8+ (推荐)

### 安装依赖

```bash
# 安装 pnpm
npm install -g pnpm

# 克隆项目
git clone https://github.com/your/project.git
cd project

# 安装依赖
pnpm install

# 重命名PostCSS配置文件
# Windows CMD:
rename postcss.config.js postcss.config.cjs
# 或者手动在文件资源管理器中将 postcss.config.js 重命名为 postcss.config.cjs

# 启动开发服务器
pnpm dev
```

> 推荐使用pnpm替代npm,可以共享依赖并节省磁盘空间。

### 开发命令

```bash
# 开发模式
pnpm dev

# 构建
pnpm build

# 打包扩展
pnpm pack
```

### 项目结构

```
src/
  ├── background/    # 后台脚本
  ├── content/       # 内容脚本
  ├── popup/         # 弹出窗口
  ├── options/       # 设置页面
  ├── common/        # 公共组件
  └── utils/         # 工具函数
```

### 技术栈

- React 18
- TypeScript
- TailwindCSS
- Vite
- Chrome Extension API

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交变更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

## 许可证

MIT
```

```json:package.json
{
  "name": "quote-card-generator",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "pack": "node scripts/pack.js"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.23",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.0.4",
    "vite": "^4.3.9"
  }
}
```

这些置文件主要完成:

1. Vite构建配置 - 处理多入口打包
2. PostCSS和TailwindCSS配置 - 样式处理
3. HTML模板 - popup和options页面
4. README - 项目文档
5. package.json - 项目依赖和脚本

接下来你需要:

1. 安装依赖:
```bash
npm install
```

2. 创建开发分支:
```bash
git checkout -b dev
```

3. 启动开发服务器:
```bash
npm run dev
```

