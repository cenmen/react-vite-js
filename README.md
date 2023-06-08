## 📑 安装使用步骤

- **Install：**

```text
# node > 14.18.0 (16.15.0)
yarn
```

- **Run：**

```text
# 开发环境
npm run dev

# 测试环境
npm run tst

# 生产环境
npm run prod
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:tst

# 生产环境
npm run build:prod
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint

# prettier 格式化代码
npm run lint:prettier
```

## 📚 文件资源目录

```text
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 公用组件
│  ├─ layout              # 布局组件
│  ├─ ├─ Header           # 布局头部组件
│  ├─ ├─ Layout           # 整体布局组件
│  ├─ ├─ Menu             # 左侧菜单布局组件
│  ├─ ├─ Router           # 路由加载组件（初始化权限路由 重要）
│  ├─ ├─ Tabbar           # 标签栏
│  ├─ constants           # 全局常量
│  ├─ routers             # 路由管理
│  ├─ store               # 状态中心管理
│  ├─ styles              # 全局样式
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.jsx             # 入口页面
│  ├─ main.jsx            # 入口文件
├─ .env                   # vite 常用配置
├─ .env.dev               # vite 常用配置（开发环境）
├─ .env.tst               # vite 常用配置（测试环境）
├─ .env.prod              # vite 常用配置（生产环境）
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ index.html             # 入口 html
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ tailwind.config.js     # tailwind 配置
├─ vite.config.js         # vite 配置
└─ README.md              # README 介绍
```

![示例图](./example.png)