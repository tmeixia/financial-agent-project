# 项目规则（AGENTS.md）

## 项目定位

企业财务数字员工“小财”的全栈工程仓库。当前为 V0 版本：一个可在浏览器中完成单轮问答的对话应用。

## 项目结构

- `backend/`：Spring Boot + Spring AI 后端。
- `frontend/`：Vite + React + TypeScript 前端聊天页。
- `docker-compose.yml`：本地依赖服务（PostgreSQL + PGVector、Redis）。
- `init/pgvector.sql`：数据库初始化脚本，首次启动时自动启用 vector 扩展。

## 后端技术栈

- Java 21
- Spring Boot 3.x
- Spring AI 1.0.x（统一由 `spring-ai-bom` 管理版本）
- Maven 构建

## 前端技术栈

- Vite
- React 18
- TypeScript

## 模型接入

- 统一使用阿里云百炼平台（DashScope）。
- 百炼提供 OpenAI 兼容协议，因此后端直接引入 `spring-ai-starter-model-openai`。
- 默认对话模型：`qwen-plus`。
- 配置位于 `backend/src/main/resources/application.yml`。

## 核心约定

- 面向 `ChatClient` 编程；上层业务代码不直接依赖具体模型平台。
- 模型密钥必须经环境变量 `DASHSCOPE_API_KEY` 注入，禁止写死在源码、YAML、日志或对话中。
- 后端接口当前为 `GET /chat?q={question}`，返回模型生成的纯文本。
- 前端开发代理将 `/chat` 转发到 `http://localhost:8080`，避免跨域。

## 禁止事项

- 写死模型 API-Key。
- 绕过 BOM 为 Spring AI 子依赖手写版本号。
- 引入未经确认的新依赖。
- 在 V0 中过早加入 Agent 循环、工具调用或会话记忆。

## 代码风格

- 后端：使用构造函数注入；Spring Bean 类可根据场景使用包级可见性。
- 前端：函数组件 + Hooks；异步请求需处理 loading 与错误状态。
- 新增业务代码建议附带单元测试。
