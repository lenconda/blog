---
title: 从 0 开始实现一个「学院派」微前端方案
date: 2020-08-03 22:50:08
tags:
  - 微前端
  - 前端工程
category: 前端技术
---

# 前言
2016 年 11 月，ThoughtWorks 在[技术雷达（Technology Radar）](https://www.thoughtworks.com/radar)中首次提出了[微前端（Micro Frontends）](https://www.thoughtworks.com/radar/techniques/micro-frontends)的概念，将后端微服务化的思想引入前端。此后，在前端社区中，出现了很多优秀的开源解决方案，例如 [SingleSPA](https://single-spa.js.org/)、[Qiankun](https://qiankun.umijs.org/)、[IceStark](https://github.com/ice-lab/icestark) 等。
微前端的实施方式有很多种，具体可以参考 [Phodal 的文章](https://github.com/phodal/microfrontends#%E5%AE%9E%E6%96%BD%E5%BE%AE%E5%89%8D%E7%AB%AF%E7%9A%84%E5%85%AD%E7%A7%8D%E6%96%B9%E5%BC%8F)。**关于这些实现方式和微前端诞生的意义、解决的业务痛点，在这里就不再赘述了。**
本文将以一个在校大学生的视角，基于我在学校社团里为数不多的中后台开发实战经验，从 0 开始实现一个「学院派」微前端方案，抛砖引玉地提供我对于微前端技术落地的思考和思路。
# 设计思路和实现
从目前开源社区的现状来看，SingleSPA 是一个发展历史比较悠久的微前端解决方案，拥有完善的社区支持和维护力量。
SingleSPA 架构中有主应用和子应用两种角色，主应用作为应用的框架运行时环境，动态地配置子应用，通过监听全局路由事件完成子应用的加载、卸载以及其他生命周期的管理。在子应用被挂载完成后，路由便由被挂载的子应用接管。
但是，基于 SystemJS 的子应用加载机制在某种程度上提高了上手学习成本，除此之外，由于其要求子应用实现一个约定的出口和生命周期，因此对子应用的侵入性是在所难免的。
## 需求拆解


我所提供的思路在大体上和 SingleSPA 相同，但在一些细节上会做一些个人认为更优的处理。先对需求做一些拆分：

- 主应用和子应用**都不应该被限制所使用的技术栈**
- 主应用和子应用**都不应该被限制所采用的部署形式和位置**
- 主应用应该实现启动时注册约定好数据结构的子应用配置信息的方法
- 主应用应该**只作为加载各个子应用的容器，而不建议写入过多的业务代码和样式代码**
- 主应用应该**掌控全局路由，并通过监听全局路由事件管理子应用的生命周期**
- 主应用**将子应用挂载完成后，应该把路由交给子应用接管，但仍保留一级路由的监听器**
- 主应用应该实现子应用所有的生命周期，并拥有处理这些生命周期对应的勾子函数的权利
- 主应用**应该有效地隔离全局变量和样式以避免子应用间可能存在的交叉污染**
- 主应用应该支持引入全局的依赖以避免子应用重复引用相同的依赖造成不必要的体积浪费
- 主应用应该实现全局变量共享和应用间通信机制
- 子应用应该提供挂载点、JS 资源、CSS 资源及其他可能被要求提供的信息
- 子应用**可以是一个独立的 SPA APP**，并能通过挂载到某个 DOM 节点上完成渲染
- 子应用应该可以**独立开发、独立部署，甚至独立运行**
- 子应用应该无法感知自己身处何种环境，例如在某个主应用、在另一个不同的主应用或是独立运行

此时，主应用和各个子应用之间的联系可以抽象成下图所示的内容：

![1596387087799-3e2650f7-e01b-434d-85cc-e7b1ef30c959](/images/2020/08/1596387087799-3e2650f7-e01b-434d-85cc-e7b1ef30c959.png)

它不仅能给予主应用和子应用足够的灵活度（**因为技术栈不受限制，并且子应用构建后的产物格式没有特别大的变化**），也使得对子应用的侵入性几乎降低到 0（**当然，打包子应用时可能需要修改产物的 `publicPath`** ）。将它命名为 Faun（国际标准音标：/ˈfɔːn/，取自古罗马神话中半人半羊的精灵）。其构造函数如下： 
```javascript
function Faun() {
  const props = {
  	// ...
    registeredSubApplications: {}, // 保存已注册的子应用配置表
  }
}
```
关于 Faun 的相关文档和仓库地址，请见[相关链接](#9tTdT)。
## 子应用配置约定
目前采用的子应用配置约定是最简化的，即主应用从远程拉取（也可以硬编码）一份包含各个子应用信息的字典格式的数据，其定义如下：
```typescript
// 单个子应用配置
declare interface ISubApplicationConfig {
  scripts?: Array<string>; // 子应用的 JS 资源地址
  styles?: Array<string>; // 子应用的 CSS 资源地址
  mountPointID: string; // 子应用挂载点 ID
  useCSSPrefix?: boolean; // 子应用是否需要启用 CSSPrefix 保护机制，默认为 true
  assetURLMapper?: (url: string) => string; // 重写 Chunked 资源 URL 的方法，默认返回原始 URL
  prefixElementSelector?: () => Node; // 选择 CSS Prefix 机制中作用的 DOM 节点，默认为 <html>
}

// 子应用配置表
declare interface ISubApplicationConfigMap {
  [key: string]: Partial<ISubApplicationConfig>; // 子应用对应的激活路由与子应用配置通过字典表示
}
```
> 之所以采用字典数据结构组织子应用配置表，**是因为在一个运行时环境里，一个激活路由只能对应一个子应用。**因此采用此数据结构不需要投入额外的成本确保激活路由与子应用对应关系的唯一性。

一份最简单的配置表可以是这样：
```javascript
const configMap = {
  '/vue': {
    scripts: [
      '//localhost:8181/app.js',
    ],
    styles: [],
    mountPointID: 'app',
    useCSSPrefix: false,
    assetURLMapper: url => '//localhost:8182' + url,
    prefixElementSelector: => document.body,
  },
  '/react': {
    scripts: [
      '//localhost:8182/static/js/main.bundle.js',
      '//localhost:8182/static/js/vendors.chunk.js',
    ],
    styles: [
      '//localhost:8182/static/css/main.css',
    ],
    mountPointID: 'root',
  },
}
```
## 注册子应用
注册子应用功能将拉取的配置表复制一份至 Faun 实例中的 `props` 里：
```javascript
this.registerSubApplications = function(subApplicationInfo) {
  if (typeof subApplicationInfo !== 'object' || Array.isArray(subApplicationInfo)) {
    return this;
  }

  Object.assign(this.registeredSubApplications, {
    ...cloneDeep(subApplicationInfo),
  });
}
```
## 路由监听
由于二级及以下的路由将会被子应用接管，而子应用可能会采用 Hash 模式管理应用的路由，因此**为了兼容 Hash  模式的子应用，主应用采用 History 模式管理路由。**
使用 `History.prototype.pushState` 方法改变 History 路由，但是 `onpopstate` 方法只能监听 `popState` 操作（即 History 模式下浏览器的回退/前进操作），如果希望能监听 `pushState` 操作，需要重写 `pushState` 方法，调用 `dispatchEvent` 方法。
但是为了简单起见，在 Faun 中，我使用了现成的库—— `history` 实现 History 路由变化的监听。
对于 History 变化事件，需要注册一个监听器：
```javascript
this.history.listen(function(location, action) {
	// ...
  handleRouteChange(...);
  // ...
}
```
其中 `handleRouteChange` 函数如下：
```javascript
const handleRouteChange = function(props, location, callback) {
  // 读出先前路由和下一路由
  const nextPathArray = location.pathname.split('/');
  const previousPath = props.currentLocation.pathname || '';
  const previousPathArray = previousPath.split('/');

  previousPathArray.shift();
  nextPathArray.shift();

  if (previousPathArray[0] === nextPathArray[0]) {
    return;
  }

  const nextPathname = `/${nextPathArray[0]}`;
  const previousPathname = `/${previousPathArray[0]}`;

  // 调用回调函数，做进一步处理
  callback && isFunction(callback) && callback(previousPathname, nextPathname);
};

// 调用 handleRouteChange
handleRouteChange(props, location, function(prev, next) {
  // 刷新当前路由，更新到 props.currentLocation 中
  refreshLocation.call(props, _this.history.location);
  // 调用 loader 中的卸载方法，卸载当前子应用，如果返回 false，就中止卸载过程
  if (!unloadSubApplication(props, prev, next, _this)) {
    return;
  }
  // 卸载成功后，加载新的子应用
  loadSubApplication(props, next, _this, action, _this.history.location);
});
```
对于全局拦截 `a` 标签点击事件进行 History 跳转，其实这个功能当时卡了我挺久，算是第一个坑。最后采取了如下方式拦截 `a` 标签的点击事件，虽然并不是特别完美。为了实现对特定 `a` 标签的拦截，需要实现一个 Event Listener，监听全局 `click` 事件，并拦截标签名、是否有 `data-faun-link`，以及 `href` 是否同域：
```javascript
if (
  event.target.tagName.toLowerCase() === 'a'
  && event.target.hasAttribute('data-faun-link')
  && event.target.host === window.location.host
) {
  // 处理监听到的事件，以及 location
  const { pathname, search } = event.target;
  const currentRoutePathname = pathname || '';
  const currentRouteSearch = search || '';
  const currentRouteResources = props.registeredSubApplications[currentRoutePathname];

  if (currentRouteResources) {
    history.push(`${currentRoutePathname}${currentRouteSearch}`, generateRandomString());
  } else {
    throw new ReferenceError(...);
  }

  return false; // 阻止事件向上冒泡以及其他点击 a 标签的默认行为
}
```
为了使主应用可以使用 `history` 切换路由，将 `history` 作为一个 API 暴露于原型和构造函数中：
```javascript
import { createBrowserHistory } from 'history';
Polyatomic.prototype.history = Polyatomic.history = createBrowserHistory();
```
在主应用中，可以调用 `history` 实现路由的跳转，引起 History 监听到变化的事件：
主应用技术栈为 React：
```jsx
const app = new Polyatomic();
const Foo = () => <a onClick={() => app.history.push('/route1')}>Route 1</a>;
```
主应用技术栈为 Vue：
```vue
<template>
	<a @click="handleClick">Route 1</a>
</template>

<script>
export default {
	methmods: {
  	handleClick() {
    	const app = new Polyatomic();
      app.history.push('/route1');
    },
  },
}
</script>
```
主应用技术栈为原生或 jQuery：
```html
<a onclick="handleClick">Route 1</a>
<script>
function handleClick() {
	var app = new Polyatomic();
  app.history.push('/route1');
}
</script>
```
在**任何技术栈的主应用**中，在 `a` 标签中使用 `data-faun-link` ，并将 `href` 设置为 `/` 开头的字符串或者与主应用同域的链接，将会被 `onclick` 拦截并执行 `history.push`，从而实现类似于超链接跳转的效果：
```html
<a href="/route1" data-faun-link>Route 1</a>
```
由于采用 `history` 作为处理路由变化的通用工具，以及在设计上抹平了采用不同技术栈的主应用在 `history` 调用上的差异，因此，主应用的技术栈**可以不受限制**。
## 沙箱
为了避免子应用间 JS 和 CSS 的污染和冲突，以及更方便地管理子应用的行为，需要引入「沙箱（Sandbox）」的概念，将上述能力封装在沙箱内。沙箱的构造函数如下：
```javascript
function Sandbox(name, useCSSPrefix = true) {
  const props = {
    domSnapshot: [], // 存储挂载后拍下的 DOM 快照
    mountPointElement: null, // 根据 mountPointID 生成的挂载点
    windowSnapshot: {}, // 存储挂载后拍下的 window 对象快照
    prefix: random(), // CSS Prefix 字符串
    bundleExecutors: [], // 被加载的 JavaScript 代码
    styleElements: [], // 被加载的 CSS 代码
    disableRewriteEventListeners: null, // 在卸载时调用，清除对 addEventListener 的重写
    modifiedPropsMap: {}, // 存储被修改的 window 对象的属性
    observer: null, // MutationObserver 实例
    childNodeOperator: childNodeOperator(), // 管理重写和恢复 DOM 子元素操作的 API
    defaultPrefixElement: document.documentElement, // 默认 CSS Prefix 作用对象元素
  };

  this.mountPointID = ''; // 挂载点 ID
  this.name = name || ''; // Sandbox 名称，通常是一级路由
  this.bundles = []; // JavaScript 资源 URL
  this.css = []; // CSS 资源 URL
  this.useCSSPrefix = useCSSPrefix; // 是否开启 CSS Prefix 机制
  this.assetURLMapper = url => url; // 见前文
  this.prefixElementSelector = () => props.defaultPrefixElement; // 见前文
}
```
### 创建沙箱
沙箱的创建通过 `Sandbox` 中的 `create` 方法实现：
```javascript
Sandbox.prototype.create = async function(subApplicationConfig) {
  const { mountPointID } = subApplicationConfig;
  if (!subApplicationConfig || !mountPointID || typeof mountPointID !== 'string') {
    return;
  }

  this.mountPointID = mountPointID;
  this.mountPoint = createElement('div', { id: this.mountPointID });

  // ... 资源加载逻辑
};
```
`create` 是一个异步函数，接收子应用配置表。
#### 获取 JS 资源
一个子应用的 JS 资源就是一个被打包工具（如 Webpack、Parcel、Rollup 等）构建后的产物，即 Bundle。在一般场景中，这些 Bundle 会以动态 `script` 标签的形式注入 URL，随后浏览器加载这些 Bundle，Bundle 执行后就可以认为完成了渲染。因此，它们本质上可以通过 `eval` 执行的。我将这些 Bundle 代码封装进一个函数，作为 Bundle 执行函数：
```javascript
if (subApplicationConfig.scripts && subApplicationConfig.scripts.length) {
  for (const bundleURL of subApplicationConfig.scripts) {
    this.bundles.push(bundleURL);
    // 通过 unfetch 获取 Bundle 的内容
    const data = await fetch(bundleURL);
    if (data) {
      // 将这些内容封装进一个新函数中
      this.bundleExecutors.push(new Function(data));
    }
  }
}
```
#### 获取 CSS 资源
与获取 JS 资源类似，CSS 资源也是通过 Ajax 获取内容后生成一个 `style` 标签的：
```javascript
if (subApplicationConfig.styles && subApplicationConfig.styles.length) {
  for (const stylesURL of subApplicationConfig.styles) {
    this.css.push(stylesURL);
    const data = await fetch(stylesURL);
    if (data) {
      const prefixedData = cssPrefix(data, this.prefix);
      const currentStyleElement = createElement('style', { type: 'text/css' });
      currentStyleElement.innerHTML = prefixedData;
      this.styleElements.push(currentStyleElement);
    }
  }
}
```
### 样式隔离
CSS 不具有作用域（Scope）或命名空间（Namespace），因此某个子应用有可能受主应用样式和其他子应用样式的影响。为了避免这种情况，需要在沙箱中实现样式隔离。对于样式隔离，社区中已有一些很不错的方案，例如：利用 HTML Entry 的特性、Shadow DOM、CSS Module、动态 `style` 标签等。我在沙箱中采用三种方式用于隔离样式：契约、动态 `style` 标签以及 PostCSS 和 `postcss-prefix-selector` 插件共同实现样式的隔离。
#### 契约
对于每一个注册到主应用的子应用，其外层包裹一个在所有子应用范围内唯一的类名，例如：
对于应用 1：
```css
.xeUj3 .button {
	background-color: #ddd;
}
```
对于应用 2：
```css
.jtW3yK .button {
	background-color: #eee;
  outline: none;
}
```
对于每个挂载点，都必须加上约定的类名，例如应用 1 的挂载点可以是 `<div id="app" classname="xeUj3"></div>`。具体可以参考[微前端在美团外卖的实践](https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html)。采用这种方式组织起来的应用通常是最容易被打破规则的，因为契约的遵守完全取决于每个子应用的开发维护团队，而人往往是一个流程或一个体系里最薄弱和不确定性最强的环节。因此，在一个主子应用体系中，不能只采用契约作为唯一的样式隔离方式。
#### 动态 `style` 标签
动态 `style` 标签的实现较为简单，可以依托沙箱的挂载和卸载能力实现。
在沙箱挂载时，将创建沙箱时生成的 CSS 资源挂载到 `head` 标签内：
```javascript
this.styleElements.forEach(element => document.head.appendChild(element));
```
同理，在沙箱卸载时，从 `head` 中移除被 `append` 的标签。
#### CSS Prefix 机制
使用 `css` 解析获取到的 CSS 规则字符串，循环遍历每个选择器，并按一定的规则为其添加一个前缀，该前缀为 `Sandbox.prototype.prefix`：
```javascript
export default function(input, prefix) {
  if (!input) {
    return '';
  }

  if (!prefix) {
    return input;
  }

  const parsedStyleRules = parse(input);
  const prefixWithSpace = /\s+$/.test(prefix) ? prefix : `${prefix} `;
  const keyframeRules = [
    'keyframes',
    '-webkit-keyframes',
    '-moz-keyframes',
    '-o-keyframes',
  ];

  function excludeSelector(selector, excludeArr) {
    return excludeArr.some(excludeRule => {
      if (excludeRule instanceof RegExp) {
        return excludeRule.test(selector);
      }

      return selector === excludeRule;
    });
  }

  parsedStyleRules.stylesheet.rules.forEach(rule => {
    if (rule.type !== 'rule') {
      return rule;
    }

    if (rule.parent && keyframeRules.includes(rule.parent.type)) {
      return rule;
    }

    rule.selectors = rule.selectors.map(selector => {
      if (excludeSelector(selector, ['html', 'body', '*']) || selector.startsWith(`.${prefix}`)) {
        return selector;
      }

      return '.' + prefixWithSpace + selector;
    });
  });

  const result = stringify(parsedStyleRules);

  return result;
};
```
默认规则会将 `html` 、`body` 、`*` 选择器排除在外。
对于 `prefix` 的生成，使用 `generateRandomString` 函数生成一个 8 位随机字符串：
```javascript
const generateRandomString = (() => {
  const cache = {};

  return () => {
    const randomString = (Math.random() / Date.now()).toString(36).slice(-9, -1);
    if (!cache[randomString] && /^[a-zA-Z]/.test(randomString)) {
      cache[randomString] = 1;
      return randomString;
    } else {
      return generateRandomString();
    }
  };
})();
```
> `generateRandomString` 采用闭包配合缓存的方式生成随机字符串，由于闭包的特性，生成的随机字符串在用于生成 `prefix` 时是完全不会重复的。

除此之外，在沙箱挂载时，需要给 `html` 标签设置类名，类名名称为 `prefix` 的值：
```javascript
this.rootElement.classList = [...this.rootElement.classList, this.prefix].join(' ');
```
当沙箱被挂载时，可以看见如下效果：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/190088/1594395730626-172f67a9-eca2-4803-b4dd-e8f3fe535b2e.png#align=left&display=inline&height=95&margin=%5Bobject%20Object%5D&name=image.png&originHeight=190&originWidth=644&size=35405&status=done&style=none&width=322)
同样地，当沙箱被卸载时，需要移除这个类名：
```javascript
this.rootElement.classList = Array.from(this.rootElement).filter(item => item !== this.prefix).join(' ');
```
> Faun **同时采用**以上三种方法以保证样式的隔离。

### 全局变量隔离
全局变量同样需要被隔离，以防不同子应用依赖了 `window` 上同一个键名的全局变量。对全局变量的隔离处理能力同样收敛于沙箱中：
在沙箱被挂载时，遍历 `window` 上所有变量，并保存至 `props.windowSnapshot` 中，除此之外，在 `props.modifyPropsMap` 中记录下 `window` 上的可写变量：
```javascript
const takeWindowSnapshot = function(props) {
  props.windowSnapshot = {};

  traverseProps(window, prop => {
    props.windowSnapshot[prop] = window[prop];
  });

  Object.keys(props.modifiedPropsMap).forEach(prop => {
    if (Object.getOwnPropertyDescriptor(window, prop).writable) {
      window[prop] = props.modifiedPropsMap[prop];
    }
  });
};
```
在沙箱被卸载时，遍历 `window`，并与 `props.windowSnapshot` 中同名属性对比，如果不相等，说明挂载完成后该属性已经发生改变，因此需要从 `props.modifyPropsMap` 中恢复这个变量：
```javascript
this._modifyPropsMap = {};

traverseProps(window, prop => {
  if (
    window[prop] !== this.windowSnapshot[prop]
    && Object.getOwnPropertyDescriptor(window, prop).writable
  ) {
    this._modifyPropsMap[prop] = window[prop];
    window[prop] = this.windowSnapshot[prop];
  }
});
```
### 事件监听器隔离
采用重写 `window.addEventListener` 的方式监听事件监听器的修改：
```javascript
import { noop } from '../utils/lodash';

const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

/**
 * rewrite event listener functions on window
 * @returns {function(): (...args: any[]) => void}
 */
export default function rewriteEventListener() {
  const listenerMap = new Map();

  window.addEventListener = (type, listener, options) => {
    const listeners = listenerMap.get(type) || [];
    listenerMap.set(type, [...listeners, listener]);
    return originalAddEventListener.call(window, type, listener, options);
  };

  window.removeEventListener = (type, listener, options) => {
    const storedTypeListeners = listenerMap.get(type);
    if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listener) !== -1) {
      storedTypeListeners.splice(storedTypeListeners.indexOf(listener), 1);
    }
    return originalRemoveEventListener.call(window, type, listener, options);
  };

  /**
   * remove listeners and rewrites
   */
  return function free() {
    listenerMap.forEach((listeners, type) =>
      [...listeners].forEach(listener => window.removeEventListener(type, listener)),
    );
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;

    return noop;
  };
}
```
### `publicPath` 处理函数
在常见的前端打包工具中，通常会提供类似于构建产物前缀的选项，例如 Webpack 中的 `publicPath` 。很多应用都不会将 URL 的主机名、端口、协议等写入该选项，因为写入相对的路径会更有利于域名或其他 URL 相关的更换或迁移。
然而，在 Faun 中，这有可能导致 404 错误。即使在注册子应用时，所有的资源都会被加上绝对路径的 URL，但仍无法避免出现拆包的配置，例如有一些应用在某个路由下依赖 `/path/to/0.chunk.js`，此时在主应用中加载这个 URL 的资源必然会导致错误的发生。
为了规避这种可能出现的情况，同时为了保证对子应用做出最小的修改，Faun 提供了一个用于处理这些 URL 的方法：  `assetURLMapper` （用法在前文中提到）。
Chunked 资源一般会以 DOM 子元素操作的方式引入。Faun 重写了 `appendChild` 、`insertBefore` 、`append` 和 `prepend` 四种方法以监听并拦截 Chunked 资源的插入，并调用 `assetURLMapper` 修改它们的 URL：
```javascript
/**
 * get node name
 * @param {Node} node
 */
function getNodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase() || '';
}

/**
 * get processed element using processor
 * @param {Element} element
 * @param {Function} processor
 */
function getResultElement(element, processor) {
  const nodeName = getNodeName(element);
  if (/^script$|^link$/.test(nodeName)) {
    const result = processor && typeof processor === 'function' && processor(element);
    if (result) {
      return result;
    }
    return element;
  }
  return element;
}

/**
 * process a collection of elements or DOMStrings
 * @param {...Array} collection
 * @param {Function} processor
 */
function mapHTMLCollection(collection, processor) {
  const args = Array.from(collection);
  const results = args.map(arg => {
    if (arg instanceof Element) {
      return getResultElement(arg, processor);
    }
    return arg;
  });
  return results;
}

export default function() {
  const appendChild = Element.prototype.appendChild;
  const insertBefore = Element.prototype.insertBefore;
  const append = Element.prototype.append;
  const prepend = Element.prototype.prepend;

  function overwriteAppendChild(callback) {
    Element.prototype.appendChild = function(element) {
      return appendChild.call(this, getResultElement(element, callback));
    };
  }

  function overwriteInsertBefore(callback) {
    Element.prototype.insertBefore = function(newChild, refChild) {
      return insertBefore.call(this, getResultElement(newChild, callback), refChild);
    };
  }

  function overwriteAppend(callback) {
    if (!append) {
      return;
    }

    Element.prototype.append = function() {
      const results = mapHTMLCollection(arguments, callback);
      return append.call(this, ...results);
    };
  }

  function overwritePrepend(callback) {
    if (!prepend) {
      return;
    }

    Element.prototype.prepend = function() {
      const results = mapHTMLCollection(arguments, callback);
      return prepend.call(this, ...results);
    };
  }

  return {
    /**
     * callback for new element
     * @param {Function} callback
     */
    intercept(callback) {
      overwriteAppendChild(callback);
      overwriteInsertBefore(callback);
      overwriteAppend(callback);
      overwritePrepend(callback);
    },

    stop() {
      Element.prototype.appendChild = appendChild;
      Element.prototype.insertBefore = insertBefore;
      Element.prototype.append = append;
      Element.prototype.prepend = prepend;
    },
  };
}
```
### 通过快照封装隔离逻辑
Faun Sandbox 实现了快照技术用于记录 DOM 和 `window` 对象上的变化。
对于 DOM 记录，Sandbox 通过 `takeDOMSnapshot` 和 `restoreDOMSnapshot` 实现，而对于 `window` 的变更，则通过 `takeWindowSnapshot` 和 `restoreWindowSnapshot` 实现。
#### `Sandbox.protototype.takeDOMSnapshot`
```javascript
const takeDOMSnapshot = function(props) {
  const _this = this;

  // 重写 DOM 节点操作方法，拦截 script 和 link 标签，调用用户定义的 Mapper 处理相应的 URL
  props.childNodeOperator.intercept(function(element) {
    const nodeName = element.nodeName && element.nodeName.toLowerCase() || '';
    switch(nodeName) {
    case 'script': {
      const src = element.getAttribute('src');
      if (src) {
        element.setAttribute('src', _this.assetURLMapper(src));
      }
      break;
    }
    case 'link': {
      const href = element.getAttribute('href');
      const rel = element.getAttribute('rel');
      if (href && rel === 'stylesheet') {
        element.setAttribute('href', _this.assetURLMapper(href));
      }
      break;
    }
    default:
      break;
    }
    return element;
  });

  // MutationObserver 监听器，监听 DOM 的变化
  props.observer && props.observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};
```
Sandbox 通过 `MutationObserver` 监听 DOM 的变化，并记录在 `props.domSnapshot` 中。
第 4 行到第 26 行是对  `script` 和 `link` 的资源 URL 的处理逻辑。 
#### `Sandbox.prototype.restoreDOMSnapshot`
在沙箱卸载时，该方法被调用，用于恢复原生 DOM 子元素操作以及其他清场工作：
```javascript
const restoreDOMSnapshot = function(props) {
  props.domSnapshot.forEach(node => node && node.remove());
  props.styleElements.forEach(element => element && element.remove());
  props.observer && props.observer.disconnect && props.observer.disconnect();
  props.childNodeOperator.stop();
};
```
#### `Sandbox.prototype.takeWindowSnapshot`
请见[全局变量隔离](#c9o9Y)一节。
#### `Sandbox.prototype.restoreWindowSnapshot`
在沙箱卸载时，该方法被调用，用于恢复挂载前 `window` 对象的可写属性：
```javascript
const restoreWindowSnapshot = function(props) {
  props.modifiedPropsMap = {};

  traverseProps(window, prop => {
    if (
      window[prop] !== props.windowSnapshot[prop]
      && Object.getOwnPropertyDescriptor(window, prop).writable
    ) {
      props.modifiedPropsMap[prop] = window[prop];
      window[prop] = props.windowSnapshot[prop];
    }
  });
};
```
### 沙箱的挂载与卸载
在 Sandbox 中通过 `mount` 和 `unmount` 实现挂载与卸载。
#### `Sandbox.prototype.mount`
沙箱被挂载时，调用该方法，并开始控制快照的拍摄：
```javascript
const mount = function(props) {
  this.takeDOMSnapshot();
  props.disableRewriteEventListeners = overwriteEventListeners();

  const checkExistElement = document.getElementById(this.mountPointID);

  if (checkExistElement) {
    checkExistElement.remove();
  }

  document.body.appendChild(Array.prototype.slice.call([props.mountPointElement])[0]);

  const prefixElement = this.prefixElementSelector() || props.defaultPrefixElement;
  if (prefixElement && prefixElement instanceof Node && this.useCSSPrefix) {
    prefixElement.classList = [...prefixElement.classList, props.prefix].join(' ');
  }

  // 挂载 CSS 样式
  if (props.styleElements && Array.isArray(props.styleElements)) {
    props.styleElements.forEach(element => document.head.appendChild(element));
  }

  !!props.windowSnapshot.length && this.restoreWindowSnapshot();

  // 执行 JavaScript Bundle
  props.bundleExecutors && props.bundleExecutors.forEach(executor => {
    if (isFunction(executor)) {
      executor.call();
    }
  });
};
```
#### `Sandbox.prototype.unmount`
在沙箱卸载时调用此方法，用于管理快照的恢复和清场：
```javascript
const unmount = function(props) {
  const currentMountPointElement = document.getElementById(this.mountPointID);
  // 清空挂载点
  currentMountPointElement && currentMountPointElement.remove();
  const prefixElement = this.prefixElementSelector() || props.defaultPrefixElement;
  // 清理 CSS Prefix 机制留下的 Class
  if (prefixElement && prefixElement instanceof Node && this.useCSSPrefix) {
    prefixElement.classList = Array.from(prefixElement.classList).filter(item => item !== props.prefix).join(' ');
  }
  this.takeWindowSnapshot();
  // 恢复 window.addEventListener
  props.disableRewriteEventListeners && props.disableRewriteEventListeners();
  this.restoreDOMSnapshot();
  // 清空 DOM 快照
  props.domSnapshot.splice(0, props.domSnapshot.length);
};
```
### 通过路由变化控制沙箱挂载与卸载
Faun 实现了对路由的监听以及基于 Sandbox 快照的方式管理子应用的生命周期行为。Faun 完整的功能需要通过路由机制将路由变化与各个沙箱联系起来。
Faun 提供了类似于栈的结构。在初始化主应用时，会将一个默认的 Sandbox 入栈，此后如果有新的路由被访问，意味着一个新的 Sandbox 被创建。同时，它将会被压入栈中：
```javascript
function Faun() {
  // ...
	const props = {
  	// ...
    sandboxes: [new Sandbox('@@default')],
  }
}
```
此外，一个名为 `position` 的指针用于表示目前的路由对应着栈中的哪一个 Sandbox：
```javascript
function Faun() {
  // ...
  const props = {
  	// ...
    position: 0,
  }
}
```
当路由回退或前进时， `direction` 指针通过 `forward` 和 `backward` 标明当前操作是前进还是回退：
```javascript
function Faun() {
  // ...
  const props = {
  	// ...
    direction: 'forward',
  }
}
```
对于如何判断当前操作是前进还是后退，History 并没有提供一个有效的 API，仅仅只是通过 `POP` 表示目前在进行历史回溯操作，因此，需要重写 History 中的一些 API 达到判断操作方向的目的：
```javascript
// Keep track of current position
let currentIndex = (history.state && history.state.index) || 0;

// Set initial index, before replacing setters
if (!history.state || !('index' in history.state)) {
  history.replaceState(
    { index: currentIndex, state: history.state },
    document.title,
  );
}

// Native functions
const getState = Object.getOwnPropertyDescriptor(History.prototype, 'state').get;
const { pushState, replaceState } = history;

// Detect forward and back changes
function onPopstate() {
  const state = getState.call(history);

  // State is unset when `location.hash` is set. Update with incremented index
  if (!state) {
    replaceState.call(history, { index: currentIndex + 1 }, document.title);
  }
  const index = state ? state.index : currentIndex + 1;

  const direction = index > currentIndex ? 'forward' : 'back';
  window.dispatchEvent(new Event(direction));

  currentIndex = index;
}

// Create functions which modify index
function modifyStateFunction(func, n) {
  return (state, ...args) => {
    func.call(history, { index: currentIndex + n, state }, ...args);
    // Only update currentIndex if call succeeded
    currentIndex += n;
  };
}

// Override getter to only return the real state
function modifyStateGetter(cls) {
  const { get } = Object.getOwnPropertyDescriptor(cls.prototype, 'state');

  Object.defineProperty(cls.prototype, 'state', {
    configurable: true,
    enumerable: true,
    get() {
      const _this = get.call(this);
      return _this && _this.state || '';
    },
    set: undefined,
  });
}

modifyStateGetter(History);
modifyStateGetter(PopStateEvent);
history.pushState = modifyStateFunction(pushState, 1);
history.replaceState = modifyStateFunction(replaceState, 0);
window.addEventListener('popstate', onPopstate);
```
## 子应用生命周期
子应用的生命周期由主应用实现，目前的生命周期勾子有 6 个： `loading`、 `loaded`、 `mounted`、 `beforeUnmount`、 `unmounted`。生命周期的定义如下：
```javascript
export default function() {
  const _HOOKS = ['loading', 'loaded', 'mounted', 'beforeUnmount', 'unmounted'];

  const hooks = {};

  return new Proxy(hooks, {
    // eslint-disable-next-line max-params
    set: function(target, property, value, receiver) {
      // check if the hook name is in _HOOKS
      if (_HOOKS.indexOf(property) === -1) {
        throw new ReferenceError(`[Faun] Hook with name \`${property}\` is not allowed`);
      }

      // check the value is a function or not
      if (!isFunction(value)) {
        throw new TypeError('[Faun] A hook should be a function');
      }

      Reflect.set(target, property, value);

      return true;
    },
  });
};
```
由于将生命周期函数设置到一个 Faun 并不理解的勾子上（例如勾子名称不是约定的 6 个之一）是不被允许的，因此需要将 `hooks` 对象包装在 `Proxy` 中，并实现一个白名单数组 `_HOOKS` 用于过滤非法的生命周期勾子注入。
`hooks` 位于 `Faun.prototype` 上，需要在实例化 `Faun` 后设置 `hooks`：
```javascript
const app = new Faun();

app.hooks.loading = function(pathname) {
  console.log('loading', this);
  console.log('pathname: ', pathname);
};

app.hooks.loaded = function(pathname, sandbox) {
  console.log('loaded', this);
  console.log('pathname: ', pathname);
  console.log('sandbox: ', sandbox);
};

app.hooks.mounted = function(pathname, sandbox) {
  console.log('mounted', this);
  console.log('pathname: ', pathname);
  console.log('sandbox: ', sandbox);
};

app.hooks.beforeUnmount = function(prev, next) {
  console.log('beforeUnmount', this);
  console.log('prev: ', prev);
  console.log('next: ', next);
  return true;
};

app.hooks.unmounted = function(prev, next, sandbox) {
  console.log('unmounted', this);
  console.log('prev: ', prev);
  console.log('next: ', next);
  console.log('sandbox: ', sandbox);
};
```
## 全局依赖
提供 `setGlobalDependence` 将全局的依赖设置在 `window` 上，子应用可以通过设置 `external` 的方式减少打包的体积，并在挂载到主应用时访问被排除在外的全局依赖。
使用数组以键值对的形式存储全局依赖：
```javascript
const deps = [];
/**
 * set global deps to window
 * @public
 * @param {string}
 * @param {any}
*/
this.addGlobalDependence = function(name, dep) {
  if (name && dep) {
    deps.push({ name, dep });
  }
};
```
在 Faun 实例启动时，将依赖注入到 `window` 中：
```javascript
if (Array.isArray(deps) && deps.length) {
  initGlobalDependencies(deps);
}
```
其中， `initGlobalDependencies` 方法的实现如下：
```javascript
export const initGlobalDependencies = function(deps) {
  if (!Array.isArray) {
    throw new TypeError('[Faun] Param `deps` should be an array');
  }

  const globalDeps = deps.reduce((current, next) => {
    const { name, dep } = next;

    if (!name || !dep || typeof name !== 'string') {
      throw new TypeError('[Faun] Params is in a wrong type');
    }

    if (window[name]) {
      throw new ReferenceError(`[Faun] Dependence \`${name}\` already exist on \`window\``);
    }

    current[name] = dep;

    return current;
  }, {});

  Object.assign(window, globalDeps);
  return globalDeps;
};
```
## 应用间通信和数据共享机制
应用间通信和数据共享机制依靠全局对象 `window` 上的某个命名空间，确保主子应用都能访问，并在此基础上提供相应的方法和事件处理器。其中，应用间通信机制采用发布订阅模式实现。
# 总结
对以上技术实现的合理组合和设计，最终可以形成完成度较高的最基础的微前端方案 Faun。Faun 融合了 SingleSPA、Qiankun、Icestark 等流行微前端方案的优势，又与这些方案有一些设计上的差异。Faun 在使用体验上比较接近 Icestark，在血缘上类似于 Qiankun 和 SingleSPA。
但 Faun 的短板在于缺少业务定制的 API，对主应用以及单体应用拆分接入在业务逻辑划分和定制上有一定的要求。
Faun 诞生于作者基于有限的实战经验以及在实践过程中选型微前端方案时对微前端方案以及微前端规范本身的一些思考和沉淀，因此可以称之为「学院派」，没有经历过业务接入的考验，仍然有待打磨。
最后贴上 Faun 的架构图：

![1596387604185-7bb807e4-f182-4a66-8459-3183c20eac4a](/images/2020/08/1596387604185-7bb807e4-f182-4a66-8459-3183c20eac4a.png)

<h1 id="9tTdT">相关链接</h1>

项目 GitHub 地址：[https://github.com/lenconda/faun.git](https://github.com/lenconda/faun.git)
项目 NPM 地址：[https://www.npmjs.com/package/faun](https://www.npmjs.com/package/faun)
项目文档：[https://faun.lenconda.top](https://faun.lenconda.top)
# 参考资料

- [微前端在美团外卖的实践](https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html)
- [前端微服务在字节跳动的打磨与应用](https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html)
- [微前端在小米 CRM 系统的实践](https://xiaomi-info.github.io/2020/04/14/fe-microfrontends-practice/)
- [micro-frontends.org](https://micro-frontends.org/)
- [微前端方案 icestark 的现在与未来](https://zhuanlan.zhihu.com/p/101164985)
- [面向大型工作台的微前端解决方案 icestark](https://zhuanlan.zhihu.com/p/88449415)
- [Micro Frontends | Technology Radar | ThoughtWorks](https://www.thoughtworks.com/radar/techniques/micro-frontends)
