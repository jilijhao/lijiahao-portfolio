<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

All instructions apply equally in English and Chinese.

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the migration guide at `node_modules/next/dist/docs/migration.md` before writing any code; follow deprecation notices listed in `node_modules/next/dist/docs/deprecations.md`.

## 项目总结

- 这是一个基于 Next.js 16 的静态导出个人作品集项目。
- 主要使用 `app/` 路由、React 19、TypeScript、Tailwind CSS 4 和 `@tailwindcss/postcss`。
- 生产环境输出是静态站点，`next.config.ts` 中启用了 `output: "export"`。

## 关键路径

- `app/page.tsx`：主页入口。
- `app/layout.tsx`：根布局和全局样式引入点。
- `components/`：可复用 UI 组件。
- `lib/utils.ts`：通用工具函数。
- `public/`：静态资源。

## 主要命令

- `pnpm dev`：本地开发。
- `pnpm build`：构建静态站点。
- `pnpm start`：生产模式启动。
- `pnpm lint`：运行 ESLint。
- 更改后运行 `pnpm build` 和 `pnpm lint`；若存在 CI，则也运行 `pnpm test`。若构建或 lint 失败，先修复再提交 PR。

## 项目约定

- 优先级：1) 必须遵守：不要新增 serverless API 路径。2) 首选在 `app/` 下修改。3) 若更改静态资源路径，立即更新 `next.config.ts` 中的 `basePath` 和 `assetPrefix`。
- 生产环境通过 `basePath` 和 `assetPrefix` 将站点部署到 `/lijiahao-portfolio` 子路径。
- 这是一个静态导出项目；不要新增 SSR 路由。如果需要动态 routes 或 SSR 功能，请改为静态生成或排除，保持 `output: "export"` 相容。
- 组件和样式应保持简洁：限制每个组件的 CSS 类不超过 6 个，避免全局样式覆盖；参照 `components/ui/button.tsx` 的 Tailwind 类和结构。
- 不要假设该项目使用旧版 Next.js 或 pages 路由。

## 代码修改建议

- 优先修改 `app/` 下文件，避免在此仓库中新增 serverless API 路径。
- 若更改静态资源路径，请同时检查 `next.config.ts` 中的 `basePath` 和 `assetPrefix`。
- 如果 `pnpm build` 失败或资源 404，检查 `next.config.ts` 中 `basePath`/`assetPrefix` 是否匹配，必要时回退修改并在 PR 描述中包含构建日志。
- TypeScript 注释应使用单行或 JSDoc，单行注释不超过 80 字符；对于函数，提供 1-2 行描述和参数/返回值的简短 JSDoc。

## 其他参考

- README 中已有基础启动说明，重要内容不需要重复。

<!-- END:nextjs-agent-rules -->
