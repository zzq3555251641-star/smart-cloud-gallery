# 智图云库

基于 Vue 3 + Spring Boot + 腾讯云 COS + WebSocket 的企业级智能协同云图库平台。

## 功能

- 公开图库：图片上传、检索、审核、以图搜图、颜色搜索、批量抓取
- 个人空间：私有图库、批量管理、快速编辑、用量分析
- 团队空间：成员邀请与权限管理、图片共享、WebSocket 实时协同编辑
- 图片处理：webp 压缩、缩略图、AI 扩图

## 技术栈

- 前端：Vue 3、Vite、TypeScript、Ant Design Vue、Pinia、Axios、ECharts
- 后端：Spring Boot 2.7、MyBatis-Plus、MySQL、Redis + Caffeine、Sa-Token、ShardingSphere、WebSocket、Disruptor、腾讯云 COS
- 前端工程化：ESLint + Prettier + TypeScript + OpenAPI 代码生成

## 目录结构

- `yu-picture-frontend/`：前端工程
- `yu-picture-backend/`：后端主工程
- `yu-picture-backend-ddd/`：DDD 分层版本（与主后端同端口，不能同时启动）

## 本地启动

1. 准备 MySQL 与 Redis，执行 `yu-picture-backend/sql/create_table.sql` 建库建表，并在 `application.yml` 中配置连接信息。
2. 配置腾讯云 COS 的 `cos.client.host / secretId / secretKey / region / bucket`，桶需要开通数据万象 CI（用于图片压缩、缩略图与图片信息解析）。
3. 启动后端：`mvn spring-boot:run`（JDK 17），默认地址 `http://localhost:8123/api`，接口文档 `/api/doc.html`。
4. 启动前端：`npm install && npm run dev`，默认地址 `http://localhost:5173/`。

> 公开图库只展示 `spaceId` 为空且审核通过的图片；普通用户上传的图片默认为待审核，需要管理员审核后才会出现在首页。
