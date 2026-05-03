# AGENTS.md

## 项目概览

ESP32-P4 UART 数据仪表盘，React 19 + TypeScript + Vite 8 单页应用。通过 MQTT 接收 ESP32-P4 上传的数据，MUI v9 + Tailwind v4 渲染。

## 开发命令

```bash
pnpm dev       # 启动 dev server (Vite HMR)
pnpm build     # tsc -b && vite build (先类型检查再构建)
pnpm lint      # eslint . (flat config)
pnpm preview   # 预览生产构建
```

无测试框架、无 CI、无 Docker。构建必须执行 `tsc -b`（项目引用编译），不能跳过。

## TypeScript 约束

- `verbatimModuleSyntax: true` → 类型导入必须用 `import type`
- `erasableSyntaxOnly: true` → 禁止 enum、namespace、parameter properties
- `noUnusedLocals` / `noUnusedParameters` → 未使用的变量/参数会报错

## 框架/工具链特性

- **React Compiler**: 通过 `@rolldown/plugin-babel` + `reactCompilerPreset` 启用，自动记忆化
- **Tailwind v4**: `style.css` 中 `@import "tailwindcss"`，无传统配置文件
- **MUI v9**: Emotion 驱动，无需手动 Babel preset
- **MQTT**: `mqtt` 库连接 ESP32，无封装层，直接使用

## 入口

- `index.html` → `src/main.tsx` → `src/App.tsx`
- CSS 入口：`src/style.css` (Tailwind)
- 字体：`@fontsource/roboto`（在 main.tsx 中导入 300/400/500/700 字重）
