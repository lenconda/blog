---
title: 在 React Native 中使用 jsx/tsx 扩展
date: 2018-07-23 11:42:56
tags:
  - React Native
  - 跨端
category: 跨端技术
---

# 前言

JSX是Javascript XML扩展，它是一种由Facebook提出的语法糖，其目的是在编写React程序时简化描述用户界面的过程。这种语法糖兼顾简洁性与可维护性。

> 一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面。JSX 乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。（摘自[JSX 简介](https://doc.react-china.org/docs/introducing-jsx.html)）

通常，一段JSX代码可以单独放在一个`*.jsx`文件中，再通过Babel的loader完成JSX到React DOM的转换。

在React Native项目中，JSX同样被广泛应用。但是React Native却存在一些令人费解的行为。在React Native项目中，`*.jsx`文件是默认不被支持的。当我们直接在React Native中通过ES6 import的方式引入某个JSX文件时，将会出现类似以下展示出的错误：

![https://lenconda.oss-cn-beijing.aliyuncs.com/180711/1.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180711/1.png)

# 解决方法

React Native的提供了一个名为`rn-cli.config.js`的文件。这个文件用于配置React Native的各种选项。在React Native启动服务的过程中，React Native会搜寻位于各个目录下的`rn-cli.config.js`文件，并且加载离根目录最近的那个。

在React Native的配置选项中，存在一个`getSourceExts()`的函数，返回一个数组，其中包含的元素为需要Babel loader解析的文件扩展名。

新建一个`rn-cli.config.js`

```
module.exports = {
    getSourceExts: () => [ 'jsx' ],
}
```

重新运行React Native脚本，即可解析JSX文件。

# 与TypeScript搭配

安装`react-native-typescript-transformer`：
```
npm install react-native-typescript-transformer --save-dev
```

将`rn-cli.config.js`的文件内容替换为如下：
```
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx', 'jsx'];
  }
}
```

React Native将正确解析以`*.ts`，`*.tsx`和`*.jsx`为后缀的文件。

# 参考

[1]. [Enabling .jsx files in React Native](http://www.fallingcanbedeadly.com/posts/enabling-react-native-jsx-extension)
