---
title: Await/Async 与 Promise
date: 2018-05-03 14:51:13
tags:
  - async/await
  - Promise
  - 异步编程
  - JavaScript
  - ECMAScript 规范
category: 前端技术
---

我经常会遇到这种问题：我想向后端POST几张图片，然后得到后端返回的文件名，这一步调用的函数是`A`函数。当所有图片都上传成功并且拿到文件名之后，再将文件名传给下一个调用的函数进行下一步处理，这一步调用的函数是`B`函数。我希望只需要用户触发一次就能按顺序执行这两个函数。然而，事与愿违，Javascript的函数调用似乎是同步的——执行`A`的同时，`B`也开始执行!这让我十分苦恼。

## 异步调用

后来我才了解到，其实Javascript是可以实现异步调用的，但是ES5中只能使用回调的方法实现异步，这将无法避免“回调地狱”的发生。于是，ECMA组织意识到这个问题，并在ES6中提出了`Promise`的概念。紧接着，ES7又基于`Promise`提出了`async/await`的概念。

引用一段对这个概念的评价：

> async/await是写异步代码的新方式，以前的方法有回调函数和Promise。
> async/await是基于Promise实现的，它不能用于普通的回调函数。
> async/await与Promise一样，是非阻塞的。
> async/await使得异步代码看起来像同步代码，这正是它的魔力所在。

## 一个简单的例子

有一段这样的代码：

```javascript
async function test () {
  return 'hello world'
}
let result = test()
console.log(result)
```

在Node.js中运行得到如下结果：

![图片](https://lenconda.oss-cn-beijing.aliyuncs.com/180406/1.png)

可以看出async返回的是一个Promise对象。官方文档中对async函数的返回值做出了阐释：

> An async function can contain an await expression that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.

值得注意的是，如果一个`async`函数返回的本身就是一个Promise对象，那么`async`关键字就变得没有必要了。

## Await

Await（Async wait），顾名思义就是等待async函数执行完之后调用的函数。它通常位于async函数的外部，用于等待async函数的返回值，并可以将等来的值赋给变量。最后代码看起来就像同步一样，正如上文所说，这是它的魅力所在。

```javascript
async function test() {
  return 'hello world'
}
async function result () {
  const result = await test()
  console.log(result)
}
result()
```

在上面一段代码中，async函数`result()`在内部使用了await，用于等待另一个async函数`test()`执行完毕，暴露出Promise对象并赋值给`result`。

## Then

如果不能用`await`获取`async`的返回值，我们应该用`.then()`去获取返回的Promise对象：
```javascript
async function test () {
  return 'hello world'
}
test().then(res => {
  console.log(res)
})
```

![图片](https://lenconda.oss-cn-beijing.aliyuncs.com/180406/2.png)

`.then()`能够直接解析Promise对象，并将对象封装的内容暴露给`.then()`中的第一个参数。
这种场景比较使用于Axios这种封装Ajax的工具。

## 原理

了解到`async/await`是一种语法糖，那么现在来看一看由ES7经过Babel转变成ES5的样子。还是上文的那个例子：

```javascript
async function test() {
  return 'hello world'
}
async function result () {
  const result = await test()
  console.log(result)
}
result()
```
经过Babel转换之后得到如下结果：

```javascript
'use strict';

var test = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', 'hello world');

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function test() {
    return _ref.apply(this, arguments);
  };
}();

var result = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return test();

          case 2:
            result = _context2.sent;

            console.log(result);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function result() {
    return _ref2.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

result();
```
我们可以对这段ES5代码进行一些皮毛上的分析：

 - Babel在处理`async/await`函数时，会自动生成一个构造器（Generator），其名称为`_asyncToGenerator(fn)`；
 - 这个函数接收一个Function类型的参数，在被`async/await`声明的函数中，该函数被调用，并在参数中调用`regeneratorRuntime()`函数（这应该是BabelJS中的某个模块），Babel的官网上是这么说的：
> This plugin uses the regenerator module to transform async and generator functions. regeneratorRuntime is not included.

 - 但是情况依然很扑朔迷离，毕竟这段代码比较复杂，甚至用到了上下文（context）。但是有一点可以肯定，这个函数起到了编译的作用，然后通过Promise进行更深的异步处理中。

以我现在的水平和对Babel的认识程度还不足以完全读懂这段代码。所以我觉得应该暂时先放一下，等功力修炼到一定程度再回过头来温习一遍比较好。

## 造个小轮子

前面讲到，使用`async/await`配合`Promise`的套路可以用于封装Ajax，比如说我最喜欢的Vue Resourcce就是基于Promise的。
既然了解了async/await和Promise，现在来造一个小轮子——还原Vue Resource最原始的形态。

```javascript
var XMLHttpRequest = require('xhr2') //在Node环境下没有XHR对象，所以引入XHR模块
function makeXhr (method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = () => resolve(JSON.parse(xhr.responseText))
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}
function getXhr (method, url) {
  makeXhr(method, url).then(res => {
    console.log(res)
  })
}
getXhr('GET', 'https://api.github.com/users/lenconda/gists')
```

这是最终的代码，我用它调用GitHub接口获取我的Gist，其执行结果如下：

![图片](https://lenconda.oss-cn-beijing.aliyuncs.com/180406/3.png)

同样，我们也可以在`getXhr()`中使用`await`调用`makeXhr()`，代码将会变成：

```javascript
var XMLHttpRequest = require('xhr2')
async function makeXhr (method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = () => resolve(JSON.parse(xhr.responseText))
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}
async function getXhr (method, url) {
  let result = await makeXhr(method, url)
  console.log(result)
}
getXhr('GET', 'https://api.github.com/users/lenconda/gists')
```

## 总结
写这篇文章主要是因为以前学ES6的时候这些新东西掌握的不是很牢，然后最近比赛、做项目很多地方又要用到这些东西。而且我很早就想学会用这些技术封装Ajax以及任何有意思的事情。当我大致明白这些东西的时候才发现，它们真的很强大，如果我能利用好，自己的技能又会上一个新台阶。

## 参考
[1]. [XMLHttpRequest - Web API 接口 \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
[2]. [Promise - JavaScript \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[3]. [async function - JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[4]. [Async/Await替代Promise的6个理由](https://blog.fundebug.com/2017/04/04/nodejs-async-await/)
[5]. [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)
