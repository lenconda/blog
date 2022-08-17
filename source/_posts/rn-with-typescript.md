---
title: 在 React Native 中使用 TypeScript
date: 2018-07-25 11:35:55
tags:
  - React Native
  - 跨端
  - TypeScript
category: 跨端技术
---

JavaScript 是一门弱类型的编程语言，声明变量时不需要声明变量的数据类型，因此这门语言编写起来具有很强的灵活性。但是换句话说在开发大型项目或多人合作的项目中，JavaScript 混乱的变量数据类型常常会让人很头疼。因此，引入“数据类型”的概念就十分有必要了。

# 关于 TypeScript

TypeScript 是一门由 Microsoft 开发和维护的 JavaScript 的超集。TypeScript 可以使用 JavaScript 中的所有代码和编码概念，TypeScript 是为了使 JavaScript 的开发变得更加容易而创建的。

> - TypeScript 从核心语言方面和类概念的模塑方面对 JavaScript 对象模型进行扩展。
> - JavaScript 代码可以在无需任何修改的情况下与 TypeScript 一同工作，同时可以使用编译器将
> - TypeScript 代码转换为 JavaScript。
> - TypeScript 通过类型注解提供编译时的静态类型检查。
> - TypeScript 中的数据要求带有明确的类型，JavaScript不要求。
> - TypeScript 为函数提供了缺省参数值。
> - TypeScript 引入了 JavaScript 中没有的“类”概念。
> - TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。

# TypeScript 的优势

**1. 静态输入**：静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

**2. 大型的开发项目**：有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用TypeScript工具来进行重构更变的容易、快捷。

**3. 更好的协作**：当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

**4. 更强的生产力**：干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。

# 在 React Native 中开启 TypeScript 支持

在 React Native 中添加 TypeScript 的依赖：
```
npm install typescript react-native-typescript-transformer --save-dev
```

初始化 TypeScript：
```
yarn tsc --init --pretty --jsx react
```

添加 React 和 React Native 的类型：
```
npm install @types/react @types/react-native --save-dev
```

在根目录下新建 `rn-cli.config.js`，在文件中写入如下内容：
```
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx']
  },
}
```

# 在 `*.d.ts` 中声明 `module` 的 `type`

React Native 支持通过 `*.d.ts` 文件声明某个模块。当某个模块的作者没有提供对应的类型时，就能通过这种方式声明类型。

例如对 `react-native-extended-stylesheet` 模块的声明：

```javascript
/**
 * @declare for react-native-extended-stylesheet
 */
declare module 'react-native-extended-stylesheet' {
  function value(expr: any, prop?: string): any;
  function create(obj: Object): any;
  function build(rawGlobalVars: any): void;
}
```
