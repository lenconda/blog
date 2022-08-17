---
title: 再谈移动端适配
date: 2018-04-10 11:48:50
tags:
  - 前端
  - 移动端
  - 移动端适配
  - CSS
category: 移动端开发
---

# 引言

移动端适配一向是很令人头大的问题，因为随着移动设备型号数量的爆发式增长，手机屏幕尺寸越来越多样化，网页内容自适应屏幕尺寸进行显示的需求也就越来越强烈。原本可能通过百分比/媒体查询等简单手段就可以常见的适配问题，但是对于页面有复杂结构或者视觉上有特殊要求的，就需要通过其他手段来解决了。

# 像素基础

### 像素

像素是一个老生常谈的问题了。不论是做前端开发还是做UI设计，都离不开这个话题。其实真要深究起来，像素是一个十分复杂的概念。追溯到上世纪6、70年代，计算机的输出设备还是点阵式打印机，如何使打印机打印出文字和图形？科学家们研究出了很多点组成的阵列，通过控制每一个点的黑白，最终组成文字和图形。现代计算机的显示器也借鉴了这个设计，发明了像素。
像素分为两种：

### 物理像素

又称**设备像素(Device Pixel, DP)**，这是组成显示设备的最小单位。可以理解为显示器上的一个一个的点，这些点组成一个个阵列。因为这些点间隔太短，排布太密集，所以肉眼观察不到颗粒感，物理像素通过RGB显色系统，分别控制RGB三基色通道的明与暗，形成了各种颜色。这就是所谓的视觉欺骗效果。任何显示设备的物理像素的数量都是不变的，出厂前就已经设定好。
物理像素的单位是pt，计算公式为：

> 1pt = 1 / 72 inch

![](http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou1ggrgj30ds07t74e.jpg)

### 设备独立像素

设备独立像素(Density-independent Pixel, DIP)又称**密度无关像素**，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素。所以它是一种抽象出的逻辑像素。前端开发中用到的CSS像素（px像素及px衍生单位像素）就是一种典型的设备独立像素。这种像素有决定因素——PPI或DPI。

![](http://ww3.sinaimg.cn/mw690/0064cTs2jw1ey8ou22g7cj30eb07y0t1.jpg)

### PPI

PPI名为每英寸像素。它是一个表示打印图像或显示器单位面积上像素数量的指数。一般用来计量电脑显示器，电视机和手持电子设备屏幕的精细程度。通常情况下，每英寸像素值越高，屏幕能显示的图像也越精细。
我们通常可以在手机的参数列表中发现名为“屏幕尺寸”的参数，比如说5.5inch。那么这个究竟是什么概念呢？这其实是手机对角线的长度，采用英寸为单位。
PPI的计算可以采用如下公式：
![](https://wikimedia.org/api/rest_v1/media/math/render/svg/d30ee099bd8351610c8746eeb1128aba5e786b86)

其中：

> d<sub>p</sub>为屏幕对角线的分辨率
w<sub>p</sub>为屏幕横向分辨率
h<sub>p</sub>为屏幕纵向分辨率
d<sub>i</sub>为屏幕对角线的长度(单位为英寸)

### DP-DIP关联

我们已经了解到，前端工程师口中常提到的“px、em”等单位，实际上是计算机软件系统虚拟抽象出的一种概念，但因为它们是逻辑意义上的，人们可以轻松理解，所以这种像素在前端开发和平面设计中被广泛应用。那么，物理像素又是怎么和设备独立像素联系起来的呢？于是我们引出了**设备像素比(Device Pixel Ratio, DPR)**的概念。DPR与DP和DIP存在如下转换关系：

> 设备像素比(DPR) ＝ 物理像素(DP) / 设备独立像素(DIP)

基于以上的转换关系，通过DPR，设备独立像素便可以转换成显示设备能够读懂的物理像素，并根据编码控制物理像素点的明暗变化，从而显示图像。

# 视口基础(搬运)

视口的概念相当复杂，想要完全搞清楚也是不太容易的，我对这个也没有做深入的研究，所以请参阅：[CSS像素、物理像素、逻辑像素、设备像素比、PPI、Viewport](https://github.com/jawil/blog/issues/21)

# 移动端适配的历史

### 无适配

这是较早期的移动端网页的形态——几乎没有哪个网站会针对移动设备进行，除非有特殊需求或者用户跨平台范围特别广的。在我的印象中，我读初中的时候（2013年左右），连百度都没有移动端适配，还要手动缩放。为了验证这个说法，特意去[https://archive.org](https://archive.org)上选取了2013年7月31日百度新闻的截图：

![](https://lenconda.oss-cn-beijing.aliyuncs.com/180410/3.png)

### ViewPort缩放

以最小的iPhone 4/5的宽度（320px）为基准，还原视觉稿。

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0 />
```

然后对不同屏幕分辨率的手机进行简单粗暴的等比例缩放设置。例如：iPhone 8（375px）`initial-scale = 375 / 320 = 1.18`

这种方式虽然能达到目的，但`initial-scale`越来越大，页面内容也就被拉伸也越厉害，导致页面内容会变得模糊。这个方法已经被摒弃了。

### 媒体查询

采用对视口宽度进行媒体查询的方法设置断点，当视口宽度变化时，对相应的样式进行修改，从而达到样式随视口宽变化的效果。这种方式的好处是比较简单，而且图片的尺寸也可以非常容易地控制。不足之处则在于代码量很大，不易于维护，而且宽屏和窄屏的效果并不是非常好。

### 响应式布局

在近几年兴起的响应式布局热潮中，涌现出无数优秀的解决方案，比如Twitter开发和维护的Bootstrap，为移动端和原生应用量身定制的Ionic，响应式的SemanticUI等，为移动端适配带来无尽便利。拿Bootstrap来说，其栅格系统能同时兼顾5种不同尺寸的屏幕，不失美观，为后起之秀提供了一种全新的思路。

### 移动端分流

这种方式近几年被国内的大厂所采用。移动端分流实质上是Web服务器通过判断Request Header中的`User-Agent`字段判断用户是否使用移动设备访问站点，如果匹配到移动端的`User-Agent`，那么将会跳转至移动站点。比如说百度的PC首页是`https://www.baidu.com`，而使用移动端访问则会自动跳转至移动站点`https://wap.baidu.com`。这种方式实现了移动端的精细化适配（因为不需要考虑PC端），但是缺点在于`User-Agent`完全由用户控制，用户可以利用`User-Agent`进行欺骗，从而引发不可预期的结果。

# REM适配

关于rem这个CSS像素单位，MDN的描述如下：

> REM（root em）和em以同样的方式工作，但它总是等于默认基础字体大小的尺寸；继承的字体大小将不起作用，所以这听起来像一个比em更好的选择，虽然在旧版本的IE上不被支持).

rem是一个相对单位，对象为`html`选择器中`font-size`的值，一般来说，rem与基础字体大小(px)有如下对应关系（取其值为12px）：

> 1rem = 12px

不论父元素的`font-size`的值是多少，1rem的值永远等于基础字体大小，除非它本身改变，否则rem的参照值不会改变。

### 基于淘宝Flexible的REM适配及其原理

在一次阿里AMFE无线前端团队双十一技术分享的时候，从手机淘宝团队中流传出了一种更加灵活的布局方案——Flexible布局，其具体原理可以概括成如下几点：

- 将视觉稿分成100份，每份被称为一个单位`a`
- 1rem被认为10a

Flexible会将实际视口宽度除以10，并将这个值设置为根元素`html`的`font-size`值。

由此可以推出：对于采用标准iPhone 6的`750×1334`视觉稿来说

> 1a = 7.5px
1rem = 75px

基于这个计算结果，我们就能将1:1标注稿的px数值除以75转换成rem数值，再套用到CSS中。

淘宝的Flexible实现了真正的弹性布局，而且达到了**只适配一种机型，其他任何机型都能适配**的效果。我们接下来讨论的另一种REM适配也是基于这种方案的。

> 关于淘宝Flexible的具体使用方法和更深层次的原理，请移步[使用Flexible实现手淘H5页面的终端适配](http://web.jobbole.com/84285/)

### 基于VW的REM适配及其原理

前面说到，Flexible实现了弹性布局，但是这种方式需要使用专门的Javascript对DOM进行修改。实际上由于浏览器的不同，Flexible有几率出现未知的问题。因此，我想基于Flexible改造出一种更完美的解决方案。从CSS的相对单位入手，我发现了VW比较适合。下面引用一段对vw、vh、vm的描述：

- vw是视口宽度的单位，视口宽度是100vw
- vh是视口高度的单位，视口高度是100vh
- vm取vw和vh较小的一个除以100作为单位

我们可以惊奇地发现，vw也是将视口宽度分割为100个columns。

# 浏览器兼容性

既然如此，事情就变得简单起来了。不过先别急，在使用一个CSS特性之前，我们最好去检查一下它的兼容性。以下是我从[Can I Use](https://caniuse.com/#search=vw)中找到的关于这几个单位的基本兼容情况：

![](https://lenconda.oss-cn-beijing.aliyuncs.com/180412/TIM%E6%88%AA%E5%9B%BE20180409195346.png)

除Opera Mini全版本和IE低版本不支持之外，其他的浏览器基本上都已经支持vw了。

# 实现

兼容性不至于特别差，因此我们可以进行下一步的实现。

根据Flexible的实现原理，我们类比出直接使用CSS对根元素样式进行修改：

```css
html {
  font-size: 10vw !important;
}
```

这样一来，`html`的`font-size`的值就变成视口宽度的10%，达到了和Flexible相同的效果。但是，我发现如果使用宽屏移动设备（例如iPad、Nexus平板等平板设备）时，Web组件将会变的很大很大，并不是很美观。于是，我发现Flexible在视口宽度大于等于540px时，基础字体大小将会保持54px。于是，在CSS中添加一个媒体查询：

```css
@media (min-width: 540px) {
  html {
    font-size: 54px !important; /*no*/ /*这个no注释主要是为了防止px2rem将px转换成rem*/
  }
}
```

在查询到的视口宽度大于540px时，`html`的`font-size`将被固定为54px。接下来的步骤，就和淘宝Flexible的操作一模一样了。

另外，根据bug测试的结果来看，当flexible.css结合normalize.css使用时，`button`、`textarea`、`input`等元素的字体大小可能超大，这是因为在normalize.css的第258行将`font-size`的值设成了100%从而导致问题的发生。

针对这个bug，我建议在flexible.css末尾加上这段代码：

```css
button,
input,
optgroup,
select,
textarea {
  *font-size: 100%;
}
```

> 注意：如果要结合normalize.css使用，normalize.css必须在flexible.css之前引入

至此，这个方案已经被完整实现了，暂且称它为`flexible.css`。完整代码如下：

flexible.css

```css
html {
  font-size: 10vw !important;
}
@media (min-width: 540px) {
  html {
    font-size: 54px !important; /*no*/
  }
}
button,
input,
optgroup,
select,
textarea {
  font-size: initial;
  *font-size: 100%;
}
```

使用时，最好在较前的代码中引入。

# VW适配

这种适配方法和REM适配类似，值是将CSS中的所有px单位转换成vw单位，从而达到移动端适配的目的。这个适配方法我还没有作过详细的研究，在这篇文章中就不详细描述了。参考文章：[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

# 参考

[1]. [使用Flexible实现手淘H5页面的终端适配](http://web.jobbole.com/84285/)
[2]. [移动端前端适配方案对比](https://www.jianshu.com/p/e5ca5b78e03e)
[3]. [移动端适配方案(上)](https://github.com/riskers/blog/issues/17)
[4]. [简单粗暴的移动端适配方案 - REM](http://imweb.io/topic/5a523cc0a192c3b460fce3a5)
[5]. [移动端Web页面适配方案](https://segmentfault.com/a/1190000008767416)
[6]. [动态rem解决移动前端适配](http://www.cnblogs.com/leinov/p/5209456.html)
[7]. [Can I USE](https://caniuse.com/#search=vw)
[8]. [CSS的值和单位 - 学习 Web 开发 \| MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Values_and_units)
[9]. [CSS像素、物理像素、逻辑像素、设备像素比、PPI、Viewport](https://github.com/jawil/blog/issues/21)
