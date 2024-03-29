---
title: 构建规范的前端工作流与生态体系
date: 2020-03-20 13:17:59
category: 前端技术
tags:
  - 前端
  - 前端工程
  - 工程化
  - 工作流
  - 标准化
---

一个前端项目，可以只由一个人来完成。那么这时，这一个人就是整个前端团队的规范，而规范的制定则显得无关紧要。但现实往往并非如此。一个成熟的线上项目中往往需要一个前端团队完成技术选型、需求分析、开发、测试、集成、部署等流程。而一个好的前端团队，其强大不仅体现在对技术的使用上，同时也体现在是否有一套完备的工作流（Work Flow）用于规范在团队协作中的个人行为和团队宏观行为，以及一套基础设施用于支撑工作流和业务属性。

这篇文章是在笔者观察到工作室中存在的一些问题后针对这些问题提出的解决方案、参与构建的基础设施项目以及对工作室未来基础设施添加的构想的一次记录。

# 存在的问题

笔者在三年前加入了工作室，工作室的前端技术栈在当时其实是很先进的。然而，当笔者真正接手项目时，却发现工作室在团队协作和工作规范方面的问题其实比较大。单从前端方面来说，存在问题包括但不限于：

## 量身定制的脚手架

在工作室的前端项目中，我们通常都是使用特定的脚手架生成项目目录结构。例如，Vue 项目使用 Vue CLI，React 项目使用 Create React App，而有的项目则是由前端自主配置 Webpack 等构建工具。

这样做虽然都能达到工程化开发并上线的结果，但与此同时它带来的问题也是显而易见的：即使目前各大框架官方的脚手架已经十分先进了，但是它们并**不能保证符合每个项目的业务属性**。也就是说，我们通过这些脚手架生成项目之后，其实还需要根据自身项目的需要进行一些定制。而**工作室的项目技术栈基本上是类似的**，因此我们每创建一次项目，就可能需要在其他项目中拷贝一些代码，或者干脆写一套项目独有的但功能实现上相近的代码。于是，项目与项目间代码架构的不一致、创建项目效率低下、项目与项目间编码指南不一致就成了工作室现今最棘手的问题。

这些问题造成实际上的混乱是非常可怕的。当项目里的目录结构足够混乱时，我们根本无法在短时间内理解为何要这样组织一个项目的代码：

![Xnip2020-03-18_18-57-04-1](/images/2020/03/Xnip2020-03-18_18-57-04-1.jpg)

由于历史遗留问题，以及项目体量的日益膨胀，这个项目已经毫无架构可言，并且特别混乱。这其实和没有量身定制的脚手架有一定的关系。

## 自动化部署机制

在自动化集成和部署机制上，笔者已经研究过常见的 CI/CD 工具，并且在工作室最大的项目中得以成功落地。为了简化部署的流程，笔者选择了适合于工作室的 CI 工具：GitLab CI——因为我们拥有自建 GitLab 服务，因此它是最优的选择。

> 如果项目代码托管于 GitHub 上并且是开放的，那么可以尝试使用 [Travis CI](https://travis-ci.org/) 作为 CI 工具。也可以使用 GitHub Actions。

几个月之前工作室的自动化集成/部署机制其实是融为一体的：

![202003181059](/images/2020/03/202003181059.jpg)

显然，我们当时面临着下面几个问题

- 流程不够完善
- 无法与其他流程紧密配合
- 提交即部署，尽管体现了 CI 的作用，但没能考虑到测试环境的需要
- 基于 GitLab CI 的生态仍未构建，操作相对原始
- 没有在全站范围内推广

## 代码评审环节

早些时候，工作室几乎任何项目都没有形成完善的代码评审环节：开发人员要做的工作只是写代码，写完代码后向 `dev` 分支提交 Merge Request（以下简称“MR”），再由另一个人（拥有合并分支权限的任何一个人）合并这个 MR。

而问题恰恰容易出现在这个环节。当一段代码没有经过严格的测试用例证明其健壮性，以及没有良好的命名规范——一个毫无命名规范可言的项目往往会造成项目组成员之间的协作困难，增加不同开发人员之间的交流成本，进一步降低了开发效率。这样的代码往往就会成为未来项目的发展的潜在风险。而缺少相应的代码评审机制则相当于让这些风险毫无阻碍地通过了最后一道关卡，来到了线上生产环境。

**任何成熟的应用都不可能把回滚当作常态**。而最近一年的几次的生产事故更是充分地暴露出这个问题。质量问题最能反映整个项目组的专业程度。因此，这个环节一定不能被忽略。

## 代码风格和命名规范

作为一个团队项目，我们可能需要一些规范来约束我们的代码。即使在契约精神流行的现代，在项目开发过程中并不能寄希望于所有成员自觉履行某一契约。但是在工作室中，这种情况曾经真实发生过：

![QQ20200318-232212@2x](/images/2020/03/QQ20200318-232212@2x.png)

这是一些页面的命名。用红色方框框出的是英文命名法，而用蓝色方框框出的是拼音首字母命名法——在同一个项目中居然出现了两种不同的命名方式！更有甚者，有些文件的文件名称居然同时包含这两种命名方式：

![QQ20200318-232438@2x](/images/2020/03/QQ20200318-232438@2x.png)

在代码风格方面，工作室虽然使用了 ESLint 等工具约束单个项目的代码风格。然而，这其中仍旧存在一些问题：

- 工作室中并未统一一套规范，每个项目可能都有自身的规范
- 在初始化项目时，必须自己配置相应的规范，也可以从其他项目中拷贝过来，一定程度上增加了配置成本
- 仍然没有强有力的措施保证所有成员履行在代码风格上的契约

## 反馈机制

一个项目只要有用户存在，就一定会有反馈。工作室的项目中，反馈主要来源于用户、运营和开发者自身，反馈的主要信息主要包括前端异常、后端异常、用户体验等。但是慢慢地，反馈机制逐渐演变成了和下图类似的情况：

![202003182334](/images/2020/03/202003182334.jpg)

而由于缺少线上监控系统，我们很难获取相关的报错信息，因此，错误复现也成了非常棘手的问题。

# 解决问题

在总结出如上问题后，笔者认为问题虽然很严重，但依旧可以通过做一些改变解决一部分或全部的问题。与此同时，这些问题其实普遍地存在于很多其他团队或企业的前端项目组中，因此，熟悉一些常见的情景是有意义的。

**从前端开发者的角度考虑**，笔者将这些产生问题的因素主要分为以下四种：

- 人为可控：由开发人员或其他相关人员造成，但是可以控制。例如：代码风格、`TypeError` 等
- 人为不可控：由开发人员或其他相关人员造成，不可控，但是可以通过其他方式加以控制。例如：命名规范、后端 API 产生了超出预期的返回值等
- 非人为可控：由外部因素造成，但是可以控制。例如：SSL 证书到期、服务到期等
- 非人为不可控：由外部因素造成，但是不可控。例如：网络提供商出现异常，DNS 解析被污染等

> 我们需要解决的问题主要集中在人为可控和人为不可控因素方面。

在对工作室部分线上项目的开发和维护过程进行分析后，我们分析出以下的难点：

- 工作流程规范缺失导致项目代码质量不佳
- 代码质量不佳导致线上产品质量不佳
- 产品质量不佳导致反馈数量居高不下
- 反馈数量居高不下导致维护成本提高
- 维护成本提高导致不能集中精力在开发上
- 不能集中精力在开发上导致代码质量不佳

那么，久而久之，一个团队会因为以上的死循环而陷入僵局。在很长一段时间内，工作室一直都以“能上线就行、能稳定就行、能跑起来就行”为宗旨，虽然会注重代码质量，但实际上缺乏有意义的目标。因此，我们首先要明确一点，前端开发的目的永远都是为了服务于用户体验的。一个团队健康的开发生态，在于通过产品驱动开发。由于产品驱动开发，代码质量的提升和研发流程效率的提升就变成了其中的一个环节。同理，如果以产品以及用户体验为中心，反馈机制也应该属于其中的一个过程，对产品的更新迭代和故障修复起到指导作用。

于是，我们可以围绕产品，形成与之相关的三类角色：

- 开发环境：由开发者、本地开发环境组成，承担构建产品的技术任务
- 生产环境：使产品运行在互联网的载体，内容直接面向所有用户
- 用户代理：由产品的用户和用户代理（浏览器、Hybrid App 等）组成，是产品的直接受众

在一段时间的探索后，我们最终确定了由以上三者形成的**闭环体系**。根据闭环的流向，我们可以进一步确定以下三个环节中我们需要做的工作或配置：

## 开发环境 -> 生产环境

- 版本控制系统
    - Git
- ESLint 规范
    - JavaScript
    - TypeScript
    - React
    - Vue
- 创建项目结构
    - Yeoman
    - 自动创建 OSS Bucket
    - 自动创建 GitLab 仓库
    - 自动生成 ESLint 规范
    - 自动生成 GitLab CI 配置
- `pre-commit` 风格检查
    - Husky
    - Git Hooks
- 自动化测试
    - Mocha
    - Jest
    - TDD 模式
- 自动化构建
    - GitLab CI
    - Webpack
- 自动化部署到测试环境
    - GitLab CI
    - ZEIT Now
- 交付代码
    - GitLab
    - GitLab CI
    - Webpack

### 构建脚手架

目前我们也正在尝试学习 Angular 脚手架的特点，结合团队自身的需要构建适合工作室项目开发的脚手架。在脚手架的技术选型方面，我们选择了前端熟悉的技术栈：Node.js，配合 Yeoman 形成用户体验良好的、开箱即用的脚手架。

我们目前已经构建了两个脚手架：`@lenconda/generator-react-app` 和 `@lenconda/generator-react-ssr`，但是在某些细节上的处理还不够完善。我们预期的脚手架可以实现的功能可以用如下几点概括：

- 连接 GitLab，创建项目时自动在 GitLab 中建立相应的仓库
- 连接 OSS 服务，创建项目时自动在 OSS 中建立相应的 Bucket
- 连接 Now 服务，创建项目时自动在 Now 中建立相应的环境
- 获取返回信息，对在本地创建的项目进行进一步的配置（部署地址、测试地址等）
- 聚合所有的脚手架，由一个包统一管理（包括上述的连接服务的功能）

### 自动化部署机制

自动化部署机制基于 GitLab CI 实现 CI/CD/CD 流程：

#### 持续集成（CI）

![c5c8e6f40c7c133e22402c00bb7e1a25_1440w](/images/2020/03/c5c8e6f40c7c133e22402c00bb7e1a25_1440w.jpg)

持续集成强调开发人员提交了新代码之后，立刻进行构建、（单元）测试。根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。

#### 持续交付（CD）

![db7198e3c39e4656e18efcb4bd1b20b1_r](/images/2020/03/db7198e3c39e4656e18efcb4bd1b20b1_r.jpg)

在持续集成的基础上，`dev` 分支上每集成一次，就将代码实时地交付到测试环境（Staging Environment）中，供产品经理和内部人员测试。

在持续交付的基础上，当测试环境上的代码经测试没有问题后，就要将 `dev` 分支合并至 `master` 分支，进入生产版本的持续交付过程。

从开发分支合并至 `dev` 时触发 CI 和 CD：

- 单元测试
- 构建项目
- 将构建完成的项目部署至 Now
- 部署完成后返回对应的 URL 作为测试环境地址

从 `dev` 合并至 `master`  时在 `master` 分支上触发部署流程：

- 构建项目
- 将构建完成的项目部署至 OSS
- 完成新版本发布

在通过脚手架生成项目结构时，会在项目根目录中添加 `.gitlab-ci.yml` 作为 GitLab 的配置文件。同时，根据脚手架生成的 OSS 地址在项目根目录中添加 `scripts/deploy.js` 作为部署脚本。

一个项目中的 CI 配置文件可以是这样：

```yaml
image: node

stages:
- test
- build

test-staging:
  stage: test
  script:
  - npm run test

development-staging:
  stage: build
  only:
  - dev
  script:
  - npm install --registry=https://registry.npm.taobao.org
  - npm run deploy:dev

deployment-staging:
  stage: build
  only:
  - master
  script:
  - npm install --registry=https://registry.npm.taobao.org
  - npm run deploy:prod
```

CI 会监听 MR 事件，当分支出现变化时，按照上述的配置选择相应的 Job 并执行。于是，我们只需要关注如何编写代码和测试用例，而部署（包括生产环境和测试环境）、测试等工作则完全交给 CI 系统。这个措施在一定程度上减轻了开发人员的工作负担和时间成本。

我们可以在 GitLab 中管理每个 Pipeline：

![Xnip2020-03-19_22-41-28](/images/2020/03/Xnip2020-03-19_22-41-28.jpg)

每个 Pipeline 代表着一个 Commit。**只要每次 Commit 的原子性足够高，那么 Pipeline 便可以作为在生产环境中回滚的最小单位。**

### 代码评审

代码评审基于 GitLab MR 功能实现。我们主要实现了以下的代码评审流程：

- 自我评审：对自己产出的代码进行评审
    - 提交 MR 之前
    - 单元测试是否通过
    - 是否考虑到边界条件，是否会发生边界问题
    - 代码风格是否符合项目组要求
- 交叉评审：委派同组同学进行评审
    - 提交 MR 之后，由上级评审人或 MR 发起人委派
    - 在本地合并分支，测试功能是否正常
    - 完成后，在 MR 中填写评论，以及决定是否通过
- 上级评审：项目负责人
    - 综合交叉评审的结果和自身的判断，决定 MR 是否通过

看似冗杂的评审流程，会降低一次分支合并的实时性。因此，我们引入了钉钉 GitLab 机器人配合 GitLab Webhooks 实现提醒功能：

![Xnip2020-03-19_23-06-07](/images/2020/03/Xnip2020-03-19_23-06-07.jpg)

### 代码风格和命名规范

命名规范属于人为不可控因素，可以通过代码评审的方式加以控制。

代码风格属于人为可控因素。我们在处理这个因素时，采用了如下方法：

- 我们基于腾讯 AlloyTeam 的 ESLint 扩充了一些规范，分为 JavaScript、TypeScript、React、Vue 四种版本，用于每个项目。在生成项目时，根据相应的选择生成相应的 `.eslintrc.js` 文件
- 在每次提交前，我们通过 Husky 在 `pre-commit` 前运行一次 `eslint .`，若检查出有一些代码不符合 ESLint 规范，将会抛出错误，从而终止 Commit。因而，通过自动检测代码风格，可以保证不符合风格的代码进入版本库中。

## 生产环境 -> 用户代理

- 静态资源管理（OSS）
    - Bucket 自动化管理
        - 域名管理
    - 反向代理配置
- 内容分发机制（CDN）
    - 证书管理
    - 文件过期处理
    - 回源策略管理
- 性能优化策略（前端性能优化）
    - Webpack 打包优化
    - 图片优化
    - 静态资源优化
- 线上监控报警机制
    - 记录信息
        - 报错位置
        - 用户 UID
        - 代码编写人员
    - 反馈
        - 邮件
        - 钉钉
        - 短信

## 用户代理 -> 开发环境

- 层面
    - 用户行为跟踪（Google Analytics）
    - 性能监控（阿里云监控系统）
    - 异常反馈（阿里云监控系统）
    - 用户反馈（自建意见反馈系统或阿里意见反馈）
- 反馈渠道
    - 邮件
    - 钉钉
    - 短信

### 反馈机制

我们在生产环境中接入了前端线上监控系统，在出现问题时以邮件或短信的形式反馈回开发环境。负责人认领该问题时着手修复工作。而用户意见反馈则仍是由运营同学反馈回开发环境。

在未来，我们希望在线上监控系统报警时，根据当前的路径定位到具体的代码段自动发起 Issue，并通过 Git Blame 找出代码的编写人员，并将 Issue 委派给这些人员。

进一步将外部依赖（不属于团队研发的基础设施）剥离开，我们可以通过一张图片理解上述的闭环和工作流：

![Xnip2020-03-20_00-30-52](/images/2020/03/Xnip2020-03-20_00-30-52.jpg)

# 总结

即使我们已经总结出一套相对完备的工作流机制，但我们仍然面临着巨大的挑战：如何真正地将所有的细节落实下来，以及如何将复杂的基础设施依赖关系抽离出来，构建出一套掌控整个流程的系统。

对于细节的落实，还是要靠项目中的每个人自觉遵守，但是在一个工程中，人往往是最不可靠的环节，也是最薄弱的环节。一切有人参与的环节往往是最容易出问题的环节。因此，我们必须将人的因素转变为非人的因素：减少代码评审的工作量，尽最大可能交付自动流程参与评审——引入 Puppeteer 等技术作为集成测试工具；同时，使用静态类型检查或使用 TypeScript 提高代码的可维护性和健壮性，并通过 TDD 的开发模式确保单个函数的稳定性。

此外，我们还希望在未来构建一套用于连接内层工作流和外围基础设施的机制：这套系统能够处理**所有与外围基础设施的交互逻辑，并向内层提供相应的 API**。在内层中与 API 交互的是功能更为强大和完善的、以脚手架为基础的工具套件——所有的业务流程都将集成进套件中。这套类似于“总线”机制的系统是我们目前主要的研究方向。

# 参考资料

- [前端研发生态环境构建经验谈](http://www.uml.org.cn/rdmana/201404021.asp)
- [如何理解持续集成、持续交付、持续部署？](https://www.zhihu.com/question/23444990/answer/89426003)
