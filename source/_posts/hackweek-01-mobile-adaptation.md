---
title: 2017 HackWeek 记录 01 - 移动端适配
date: 2017-12-18 20:58:01
tags:
  - 2017 HackWeek
  - 比赛
  - 移动端适配
  - 移动端
  - 前端
category: 比赛记录
---

# 开篇

有幸参加了2017年南昌大学家园工作室举办的为期两周的黑客马拉松(Hack Weeks)。其实我很想通过类似的活动提升自己的能力。只不过当我真正参与到项目的开发中，才会发现，自己还是太年轻！

本系列文章记录了我在参与整个团队协作过程中遇到的问题和心得体会，其内容将会涵盖前端开发、UI设计原则、SQL语法、服务器配置以及如何高效地进行团队协作等方面的内容。

# 背景

可以说在这次Hack Week活动中折磨我最久的就是视觉稿。因为我以前并没有移动端适配和根据视觉稿来编写UI的经验，所以，当我拿到设计师给我的视觉稿时，其实我是一脸懵逼的。对视觉稿使用的不熟练以及移动端适配经验的缺失，成为在后来的两个星期中，不断折磨我的梦魇，也出于这些原因，给设计师带来很大的麻烦。因此，我深感自己的能力不足，尤其是移动端H5页面制作方面的知识，亟待补充。

今天我们的项目终于完成了调试工作，趁此机会赶紧补习了移动端适配的方案。

在下面的文章中，我将参考[使用Flexible实现手淘H5页面的终端适配](http://web.jobbole.com/84285/ "使用Flexible实现手淘H5页面的终端适配")学习移动终端H5适配

## 几个概念

### 物理像素(Physical Pixel)

> 物理像素又被称为设备像素(Device Pixel)，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

举例：iPhone 6的dp为 `750 × 1334`

### 设备独立像素(Density-independent Pixel)

> 设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

### CSS像素

> CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(Device-independent Pixel)，简称dip。

### 屏幕密度

> 屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

### 设备像素比(Device Pixel Ratio)

>设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

```
dpr = dp / dip
```

[![http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou22g7cj30eb07y0t1.jpg](http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou22g7cj30eb07y0t1.jpg "http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou22g7cj30eb07y0t1.jpg")](http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou22g7cj30eb07y0t1.jpg "http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou22g7cj30eb07y0t1.jpg")

## CSS的rem单位

rem就是相对于根元素`<html>`的font-size来做计算。而我们的方案中使用rem单位，是能轻易的根据`<html>`的`font-size`计算出元素的盒模型大小。

## Flexible.JS

Flexible是手机淘宝团队开发的JS库，用于解决H5适配问题。Flexible库使用方法就是在HTML中尽早引入`flexible.js`和`flexible_css.js`文件，这两个文件可以在

[http://lib.lenconda.top/flexible/flexible.js](http://lib.lenconda.top/flexible/flexible.js "http://lib.lenconda.top/flexible/flexible.js")
[http://lib.lenconda.top/flexible/flexible_css.js](http://lib.lenconda.top/flexible/flexible_css.js "http://lib.lenconda.top/flexible/flexible_css.js")

下载。

## 引用与使用

在HTML的`<head></head>`的最前面添加如下内容：

```html
<head>
  <meta charset="utf-8">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="yes" name="apple-touch-fullscreen">
  <meta content="telephone=no,email=no" name="format-detection">
  <script src="flexible.js"></script>
	<script src="flexible_css.js"></script>
</head>
```

### px与rem换算

这是最关键的一步，也是最折磨人的一步：通常来说，设计师给前端工程师的视觉稿，都是以px为单位的，但是要适配各种不同机型的像素密度，必须用到rem单位。

对于Flexible来说，它会将视觉稿分为100份，每份的单位称为`a`，这时，整个rem被认为`10a`，即1rem将会是视觉稿宽度的十分之一px。

例如，设计师通常会给出一个`750×1334px`的视觉稿，那么此时，1rem相当于`750 / 10 = 75px`，这个值被称为**rem基准值**。

根据视觉稿进行单位换算，公式如下：

> rem单位宽度 = px单位宽度 / 基准值

例如，在标准iPhone 6长宽的视觉稿中存在一张100×100的图片，那么换算成rem就是`100px / 75 ≈ 1.333333rem`即可。

## 如何在Webpack中引入

在Webpack中引入JS从来都不是一件容易的事情，但好在阿里前端团队制作了Flexible的NPM包。如果需要在Webpack中引入Flexible，需要在项目的根目录下执行：

### 安装lib-flexible

```bash
npm install lib-flexible --save
```

在`/src/main.js`下写入：

```javascript
import 'lib-flexible'
```

### 安装px2rem

```bash
npm install px2rem-loader --save-dev
```

安装完之后，更改`/build/utils.js`如下：

[![/images/17121601.png](/images/17121601.png "/images/17121601.png")](/images/17121601.png "/images/17121601.png")

**其中，`remUinit`的值为rem基准值**

### px2rem用法

> 直接写px，编译后会直接转化成rem ---- 除开下面两种情况，其他长度用这个
在px后面添加/*no*/，不会转化px，会原样输出。 --- 一般border需用这个
在px后面添加/*px*/,会根据dpr的不同，生成三套代码。---- 一般字体需用这个

# 引用一段话

前端与设计师的协作应该是比较简单的，最重要的是要规范设计提供给你的产物，通常对于前端来说，我们需要设计师提供标注尺寸后的设计稿以及各种元素的切图文件，有了这些就可以开始布局了。考虑到Retina显示屏以及这么多移动设备分辨率却不一样的问题，那么设计师应该提供多套设计稿吗？从网易和淘宝的做法来看，应该是不用了，我们可以按照设计稿，先做出一套布局，按照以上方法做适配，由于是等比适配，所以各个设备的视觉效果差异应该会很小，当然也排除不了一些需要媒介查询特殊处理的情况，这肯定避免不了的。下面是淘宝设计师分享的他们的工作流程：

- 第一步，视觉设计阶段，设计师按宽度750px（iPhone 6）做设计稿，除图片外所有设计元素用矢量路径来做。设计定稿后在750px的设计稿上做标注，输出标注图。同时等比放大1.5倍生成宽度1125px的设计稿，在1125px的稿子里切图。

- 第二步，输出两个交付物给开发工程师：一个是程序用到的@3x切图资源，另一个是宽度750px的设计标注图。

- 第三步，开发工程师拿到750px标注图和@3x切图资源，完成iPhone 6（375pt）的界面开发。此阶段不能用固定宽度的方式开发界面，得用自动布局（auto layout），方便后续适配到其它尺寸。

- 第四步，适配调试阶段，基于iPhone 6的界面效果，分别向上向下调试iPhone 6 plus（414pt）和iPhone 5S及以下（320pt）的界面效果。由此完成大中小三屏适配。

**注意第三步，就要使用我们以上介绍的网易跟淘宝的适配方法了。假如公司设计稿不是基于750的怎么办，其实很简单，按上图做一些相应替换即可，但是流程和方法还是一样的。解释一下为什么要在@3x的图里切，这是因为现在市面上也有不少像魅蓝note这种超高清屏幕，devicePixelRatio已经达到3了，这个切图保证在所有设备都清晰显示。**
