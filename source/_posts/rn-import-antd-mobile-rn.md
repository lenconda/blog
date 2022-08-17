---
title: 在 React Native 中引入 antd-mobile-rn
date: 2018-07-24 11:40:13
tags:
  - React Native
  - 跨端
category: 跨端技术
---

Ant Design Mobile终于推出了React Native版本，但是使用起来依然比较麻烦。对于我个人而言，平时做项目也只用其中的几个组件。而无论是antd-mobile还是antd-mobile-rn，按需加载都比较麻烦。所以本文主要记录如何以按需引入的方式使用antd-mobile-rn

# 官方描述

> - UI 样式高度可配置，拓展性更强，轻松适应各类产品风格
> - 基于 React Native 的 iOS / Android / Web 多平台支持，组件丰富、能全面覆盖各类场景 (antd-mobile)
> - 提供 "组件按需加载" / "Web 页面高清显示" / "SVG Icon" 等优化方案，一体式开发
> - 使用 TypeScript 开发，提供类型定义文件，支持类型及属性智能提示，方便业务开发
> - 全面兼容 react / preact

# 安装

```
npm install antd-mobile-rn --save
```

# 设置按需引入

安装`babel-plugin-import`：

```
npm install babel-plugin-import --save-dev
```

将项目根目录的`.babelrc`中替换为如下内容：

```javascript
{
  "presets": ["react-native"],
  "plugins": [
    ["import", { "libraryName": "antd-mobile-rn" }] // The difference with the Web platform is that you do not need to set the style
  ],
  "env": {
    "development": {
      "plugins": [
        "transform-react-jsx-source"
      ]
    }
  }
}
```

# 使用举例

引入Toast组件：
```javascript
import { Toast } from 'antd-mobile-rn';
```
