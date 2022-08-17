---
title: 2018 年度总结
date: 2019-02-11 12:30:15
category: 年度总结
tags:
  - 年度总结
  - 随笔
---

今天是2019年1月24日，离2018年最后一天也已经过去将近一个月了。之所以现在才开始写年度总结，是因为这个学期期末考试开始得很早，我从18年年底就在复习功课。因此我在期末考试完后的现在完成过去一年的总结。

# 关于技术

个人感觉，在技术方面，2018年的成长是**自学能力**的提升。

去年的这个时候，我还是处于对新知识有些畏惧的状态，可以说对新知识或新技术有比较明显的抵触情绪。后来我才渐渐明白，这种情绪的根源是对自己技术的不自信和不认可。所以在过去的2018年，我几乎时时刻刻都在提醒自己不要有这样的想法，并积极接触并掌握了许多很新的技术。下面我想记录一下今年学会的技术

## React Native

说到React Native（以下简称“RN”），这是一个非常神奇的框架，能帮助我们通过编写Javascript代码，编译成Android和iOS多端复用的原生代码，对于小公司或者小项目来说非常高效。不过初次接触RN时之前并没有学习过React.js的语法，所以刚起步时可以说是困难重重，后来听一位学长说起RN这个框架，说可以用“React.js一步一个坑，React Native是半步一个坑”来形容这个框架。不过幸好当时没有放弃，最终我对于RN的熟悉程度已经可以赶超Vue.js了。在暑假的时候我使用RN独立自主完成了两个APP项目。

## Angular

学习Angular（以下简称“ng”）主要是社团的主要产品重新选型，选择了Angular为重构新版本的框架，前端UI库依旧是Bootstrap。ng给我的第一印象就是非常重，非常工程化，支持依赖注入，而且使用Typescript作为默认的开发语言。这样一些特性使得它在大项目开发中占有绝对优势。不过我对于这个框架，并不怎么熟练，因为我在学ng的途中就准备负责工作室的APP项目前端部分的开发了。但是，这个框架给我的印象很深刻，我以后有机会一定会重新开始学习它的。

## 微信小程序

微信小程序在2018年1月突然火了起来，有前瞻意识的开发者都敏锐地感觉到这个技术前途无量。于是我也开始尝试着学一学小程序的开发。说实话，这项技术真的给了我很大的惊喜，因为得益于腾讯在小程序中开放的丰富的API，以及和Vue.js类似的模板风格，小程序的开发过程很舒服，得心应手，一见如故。

## Node.js

这是一个既熟悉又陌生的一门语言。自从进入前端开发的坑，就再也没有离开过Node.js的怀抱。我们每次在写前端代码的时候总是少不了基于Node.js的Webpack等工具。但是，我们平时只关注前端页面的编写，而忽视了Node.js作为一个将本来只能运行在浏览器和Flash中的ECMAScript变成了在服务器语言中也能叱咤风云的语言——这本身就是一件非常伟大的事。而仔细地学习Node.js后，越来越感觉到它带给前端工程师的信心，推动我们跨出全栈开发的第一步。不过当我意识到这一点时已经是接近2018年末的日子了。在这之前，我已经学会了使用Koa、Express等框架搭建一个简单的后端应用。Node.js中涉及的更深奥的原理我还没来得及细细品味。这些事情就交给2019年了。

# 项目经验和个人成果

## Petlog

Petlog是一个寒假比赛项目，我一个人负责所有前端的开发，开发框架是Vue.js。这是我掌握Vue.js及其一些技巧后第一个项目，也是我第一次遵守团队开发协作规范的项目。虽然这个项目最终效果不是非常理想，但是我仍然将它作为一个我在前端的路上里程碑的一步。

项目仓库：[https://github.com/lenconda/petlog](https://github.com/lenconda/petlog)

## Pichub

### 前端部分

Pichub是一个每日壁纸推荐的小程序。这个小程序的前端部分依然是Vue.js，只不过是小程序专用Vue框架——mpvue，写法和Vue.js极为类似，但是Vue代码最后可以通过mpvue转换成小程序的wxml、wxss等代码。

项目仓库：[https://github.com/lenconda/pichub](https://github.com/lenconda/pichub)

### 后端部分

使用Node.js + Express搭建的后端应用，去掉了其中的View模块，完全纯RESTFul API设计。数据库采用MySQL，使用了crontab管理定时任务。

项目代码目前托管在Coding的私有仓库中，考虑到多种因素，此处不便贴出。

## Readhub

这是一个RN项目，调用Readhub的API（[https://api.readhub.me](https://api.readhub.me) ）完成其前端部分。前端部分采用RN技术，最终可以编译成Android和iOS APP。这是我第一次对RN进行的实践。

项目仓库：[https://github.com/lenconda/readhub](https://github.com/lenconda/readhub)

## Intruders

为了加深对RN的理解和丰富实战经验，我使用RN完成了这个搜索百度网盘资源的客户端项目。

### 前端

前端采用RN和Typescript技术进行开发，是对RN的进阶练习的作品。项目编译后可以直接打包出Android和iOS APP。

项目仓库：[https://github.com/lenconda/intruders_fe](https://github.com/lenconda/intruders_fe)

### 后端

后端采用Koa.js 2搭建，功能是从某百度网盘搜索网站动态爬去网盘搜索结果，并将其加工，以RESTFul API的形式向前端返回JSON数据。

项目仓库：[https://github.com/lenconda/intruders_be](https://github.com/lenconda/intruders_be)

## Koa2 REST CLI

这是我针对Koa2开发的一个模版生成器，支持生成支持Typescript + 依赖注入特性的模板，使用该工具生成的新Koa2项目中，只支持RESTFul，不支持View Engines。目前该工具已发布到npm仓库中，具体内容请看：[https://www.npmjs.com/package/koa2-rest-cli](https://www.npmjs.com/package/koa2-rest-cli)

项目仓库：[https://github.com/lenconda/koa2-rest-cli](https://github.com/lenconda/koa2-rest-cli)

## Free Proxy

因项目需要，从某proxy list网站动态爬取实时proxy列表。这个项目所有的方法都是基于Promise的。

项目仓库：[https://github.com/lenconda/free-proxy](https://github.com/lenconda/free-proxy)

# 社团活动

参与了云家园、南大家园APP的开发。

完成了家园工作室2018年前端招新的工作。其中，我负责研发组笔试试卷前端题和常识题的命题，之后的几场面试我也花了很多精力。

负责完成新生考核题前端部分的命题。

# 关于生活

总的来说，2018年过得没有想象中的顺利。大一下学期期末挂了一门课程，好在补考通过了。大二上学期我基本上还是挺满意的，目前这个学期的成绩已经完全出来了，没有挂科，可以过一个轻松的寒假了。

至于CET-4考试，我的成绩是559分，有点超出预期了，毕竟考前基本上没有复习。

驾照的话，今年依然没去考。

# 2019年展望

不论2018年过的好还是坏，我们都不应该沉溺于过去。新的一年，一切还是未知数，我们只能选择向前看。所以，我希望我在这一年可以达到以下几点对自身的要求：

- 系统性学习Node.js和Python，未来主攻后端和网络数据采集方向
- 多做一些项目，积累足够多的项目经验
- 花一些时间准备个人简历（以刘子健学长的简历为模板）
- 完成一次公司的笔试和面试（目前还没有定下来选择哪家公司）
- 拿到驾照（写完文章就去预约科目一考试）
