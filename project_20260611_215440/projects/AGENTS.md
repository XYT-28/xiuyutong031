# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 项目概述

修宇峒的个人主页，浅色科技风格。包含 Hero 分栏、个人档案、技能矩阵、项目 Bento 网格、成长时间轴、联系方式等模块。Canvas 网络动画背景、环形图表、进度条动画、滚动渐显动效。

## 目录结构

```
├── public/                 # 静态资源
├── src/
│   ├── app/
│   │   ├── globals.css     # 全局样式（浅色主题 + 动画 + 网格背景）
│   │   ├── layout.tsx      # 根布局（字体预加载）
│   │   └── page.tsx        # 首页入口
│   ├── components/
│   │   ├── ui/             # Shadcn UI 组件库
│   │   ├── font-preload.tsx   # 字体 preconnect 客户端组件
│   │   └── home-page.tsx      # 主页组件（含所有模块）
│   ├── hooks/              # 自定义 Hooks
│   └── lib/                # 工具库
├── DESIGN.md               # 设计规范
└── package.json
```

## 核心组件

### home-page.tsx
完整的个人主页组件：
- **Navigation** - 透明→白色吸顶导航栏
- **HeroSection** - 左文字 + 右侧迷你仪表盘（环形图 + 活跃度柱状图），Canvas 网络连线背景
- **AboutSection** - 双栏：左文字叙述 + 右关键指标计数卡片 + 性格标签
- **SkillsSection** - 3 列技能组（带动画进度条）+ 技术栈标签云
- **ProjectsSection** - Bento 不等宽网格（2+1 / 1+2 布局）
- **TimelineSection** - 竖向单线时间轴 + 交错渐显
- **ContactSection** - 3 列联系方式卡片 + 邮件 CTA
- **Footer** - 简洁页脚

### 自定义 Hooks
- `useInView` - Intersection Observer 滚动动画触发
- `useCountUp` - 数字计数动画

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

## 开发规范

### 编码规范
- 默认按 TypeScript `strict` 心智写代码
- 禁止隐式 `any` 和 `as any`
- 客户端组件使用 `'use client'` 指令
- Canvas 动画使用 `useRef` + `useEffect` 管理
- 禁止在 .map() 回调中调用 React Hooks

### Hydration 问题防范
- 禁止在 JSX 渲染逻辑中使用 `Math.random()`、`Date.now()` 等动态数据
- Canvas 粒子位置使用固定初始值 + 运行时随机

## UI 设计与组件规范

- 浅色科技风：背景 #fafbfc，卡片 #ffffff
- 主强调色：#2563eb (Blue-600)，辅助 #0891b2 (Cyan-600)
- 网格背景：grid-bg class（淡蓝色细线网格）
- 字体：Inter + JetBrains Mono + PingFang SC

## 构建与测试命令

- `pnpm dev` - 开发环境
- `pnpm build` - 构建
- `pnpm ts-check` - TypeScript 类型检查
- `pnpm lint --quiet` - ESLint 检查
