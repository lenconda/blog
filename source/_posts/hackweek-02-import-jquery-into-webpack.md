---
title: 2017 HackWeek 记录 02 - 在 Webpack 中引入 jQuery
date: 2017-12-19 13:04:28
tags:
  - 2017 HackWeek
  - 比赛
  - jQuery
  - Webpack
  - 前端工程
category: 比赛记录
---

# 背景

jQuery从诞生起，就以其简洁、高效迅速得到开发者的认可，如今绝大多数网站都采用jQuery库。而在我们组的项目中，我也想使用jQuery编写Ajax、元素选取之类的代码，但是我发现直接在HTML入口文件`src/index.html`中加入一个引入jQuery的`script`标签似乎并不会其任何作用，相反，引入JS文件之后反而给整个项目带来一大堆的报错。我也尝试过很多种方法将jQuery代码放在不同的位置，但是都不奏效。所以迫于时间压力，我不得不放弃在项目中引入jQuery的想法，这也成了这个项目中最大的遗憾。

# 尝试引入

今天HackWeek刚结束，我就迫不及待开始在Google上查阅相关资料。在查阅资料的过程中，我偶然发现其实jQuery也可以向其他的库一样通过模块的方式引入，于是我尝试在项目根目录下执行`npm install jquery`，执行成功，随后我再去JS入口文件`src/main.js`中写入

```javascript
import $ from 'jquery'
```

在页面写好一段jQuery代码，发现console还是报错：

[![/images/17121602.png](/images/17121602.png "/images/17121602.png")](/images/17121602.png "/images/17121602.png")

回头一看`main.js`发现import jQuery的那一行代码还是灰色的，应该是还有哪个地方没有配置好导致`$`没被使用，造成在代码中使用`$`之后报错。

# 解决问题

最后我在百度中寻找到了一种比较可行的办法，大概的意思就是将jQuery库当做一个插件写入Webpack的基本配置文件中，大概的解决办法是：

1. 先在`src/main.js`中写入：
```javascript
import $ from 'jquery'
```

2. 再向`build/webpack.base.conf.js`的头部写入
```javascript
const webpack = require('webpack')
```
这一步的主要目的是引入webpack模块，因为下面新建插件的代码需要用上这个常量。

3. 在`module.exports`段的末尾写入
```javascript
plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ]
```
使用`webpack.ProvidePlugin`新建一个plugin对象，将`jquery`赋值给`$`，然后，在项目根目录下执行

```bash
npm run dev
```

然后就可以在代码中使用jQuery了。
