---
title: 异步的 JavaScript：浅析浏览器事件循环
date: 2020-03-12 09:09:38
tags:
 - 前端
 - JavaScript
 - 浏览器技术
category: 前端技术
---

JavaScript 采用严格单线程的工作方式。这意味着 **JavaScript 没有创建多个子线程进行异步任务的功能**。但事实往往并非如此简单。在使用 JavaScript 开发时，我们也许会发现 JavaScript 的确能够实现异步。这背后的原因，与 JavaScript 采用的事件处理机制有关。这种机制被称为“事件循环”。在详尽阐释事件循环是什么之前，笔者希望您明白为什么 JavaScript 要采用单线程工作。

# 我们为何需要理解浏览器事件循环

浏览器事件循环是非常底层的知识。尽管我们在工作中并不是必须了解它。但是，要知道 JavaScript 是一种以事件驱动的语言——如果观察仔细的话，您一定能在您的代码中发现事件处理程序的存在，无论您是有意识地还是无意识地。因此，理解浏览器事件循环的工作原理似乎就显得十分必要，因为只有了解浏览器如何处理各种事件和任务，我们才能更好、更完美地使用事件驱动的方式编写更高质量的代码。

# JavaScript 为何采用单线程

自互联网被发明以来，随着逐年增加的互联网用户的涌入，单纯的 HTML 和 CSS 已经无法满足用户日益复杂的需求。因此，当年的网景公司（Netscape Communications Inc.，[https://isp.netscape.com](https://isp.netscape.com)）希望研发出一门专用于浏览器操作网页文档的语言。于是，JavaScript 应运而生。经过近 20 年的发展，JavaScript 已经相当成熟，以至于现如今 JavaScript 代码可以[运行于服务端作为一门后端语言](https://nodejs.org/en/docs/guides/getting-started-guide/)（[Node.js 如何工作？](https://stackoverflow.com/questions/9497076/how-node-js-works)）。然而，JavaScript 诞生的**根本任务仍然是为操作网页文档**。因此，这是这门语言融入血脉中的基因，无论它如何发展，都不能脱离这个基调。

> 也许您对 JavaScript 诞生的历史感兴趣，但这篇文章显然不适合讨论这个话题。如果您仍希望对此有更多的了解，请移步：[《A brief history of JavaScript》](https://medium.com/@benastontweet/lesson-1a-the-history-of-javascript-8c1ce3bffb17)

前面提到，JavaScript 是专门为浏览器而诞生的。因此，采用单线程工作方式，**与这门语言的用途密切相关**。作为浏览器脚本语言，JavaScript 的主要用途无非就是与用户交互和操作 DOM。试想一下，假如 JavaScript 是多线程的，其中一个线程希望删除一个 DOM 节点，而另一个线程则希望修改这个 DOM 节点，那么浏览器究竟应该选择哪一个进程执行相应的操作呢？**答案显然不确定**。

如果将 DOM 节点视为资源，一旦这样的情况发生，执行任务的线程必然会占用这个资源，因此这个线程必将会**与其他试图占用这个资源的线程发生互斥**，它（们）将进入阻塞状态。如果目前的线程依赖于这个（些）处于阻塞状态进程的操作，那么还有可能造成**死锁**。这种情况在现代计算机操作系统模型中有可能出现（因为操作系统允许多个线程同时运行），而且也有很好的处理或避免死锁的机制（如信号量机制、银行家算法等）。但在浏览器中，采用这种机制开销实在太大，而且也很容易造成开发人员的迷惑。因此，出于以上因素的考虑，JavaScript 的设计者们一致认为只有单线程才适合 JavaScript。

# 单线程带来的问题

任何事物都具有两面性。单线程的优势总是伴随着劣势到来。

单线程意味着 JavaScript 中一切的任务都需要排队，无论是计算量级大的 CPU 密集型操作，还是 I/O 耗时相对巨大的 Ajax、读取文件等操作，都需要按先来后到的顺序排列。等到前一个任务结束，当前任务才能开始。这对每个任务来说都不公平，也不符合常理，更会将浏览器的性能和资源，以及用户的耐心消耗殆尽。

这也是 JavaScript 的设计者们曾今苦恼过的问题。不过，他们找到了解决方案——事件循环。

# 初识事件循环

在计算机领域，事件环，或者被称为消息分发器、消息环、消息泵或者运行环这些定义**不过是一个程序结构体**，用以在程序中等待，分发事件或者消息。它的工作方式是向内部或者外部的“事件提供方”发出请求(通常采取封锁请求的方式，直到有事件发生)，然后再呼叫相应的事件处理器（又称“事件的分发”）。JavaScript 采用的也是这种方式来处理单线程带来的一些问题的。

回到上一节我们讨论到的问题，假设现在有一个计算量很大的任务和一个 Ajax 任务加入了线程维护的队列，JavaScript 会将 Ajax 任务加入异步队列（与此对应地，同步任务所在的队列被称为“主线程”）。CPU 继续执行主队列中的代码，完全不用理会目前也在执行的 Ajax 操作。当 Ajax 操作有了结果时，将通过它注册的处理回调函数将它重新加到主队列中。如此一来，每个任务的时间都得到了充分的利用。

# 浏览器事件循环

我们已经明白了 JavaScript 为何采用单线程的工作方式，以及 JavaScript 为了解决单线程造成的资源利用率的问题而引入的事件循环机制。

有了这些前置知识，就可以进一步了解事件循环在浏览器中是如何工作的。

> 本文中所有涉及浏览器的部分，包括但不限于源码展示、代码测试和原理剖析，皆是基于 Google V8 引擎及其开源项目 Chromium。

我们能够在 Chromium 源码中找到[这样一个方法](https://cs.chromium.org/chromium/src/base/message_loop/message_pump_default.cc?g=0&l=31)：

```cpp
void MessagePumpDefault::Run(Delegate* delegate) {
  // 可以自动设置是否还有任务在执行
  AutoReset<bool> auto_reset_keep_running(&keep_running_, true);

  // 事件循环的主体，一个永不停息的死循环
  for (;;) {
#if defined(OS_MACOSX)
    mac::ScopedNSAutoreleasePool autorelease_pool;
#endif

    // 将所有还在等待的任务，将它们送入队列
    Delegate::NextWorkInfo next_work_info = delegate->DoSomeWork();
    // 获取目前是否还有立即执行的任务
    bool has_more_immediate_work = next_work_info.is_immediate();
    // 如果没有任务正在被执行，跳过本次循环
    if (!keep_running_)
      break;

    // 如果有立即执行的任务，就继续这个循环
    if (has_more_immediate_work)
      continue;

    has_more_immediate_work = delegate->DoIdleWork();
    if (!keep_running_)
      break;

    if (has_more_immediate_work)
      continue;

    if (next_work_info.delayed_run_time.is_max()) {
      // 如果没有延时执行的任务，就一直等待
      event_.Wait();
    } else {
      // 如果有延时执行的任务，就获取指定的延时时间并设置定时器等待
      event_.TimedWait(next_work_info.remaining_delay());
    }
    // Since event_ is auto-reset, we don't need to do anything special here
    // other than service each delegate method.
  }
}
```

从上面的代码我们可以大致了解浏览器中事件循环的工作模式：

- 浏览器事件循环结构分为**任务队列（Task Queue）和微任务队列（Microtask Queue）**
- 任务可以被分为两种
    - 任务：在主线程上排队等候执行的任务，所有任务**按线性排列依次等待被执行**
    - 微任务：不进入主线程、而进入微任务队列（Microtask Queue）的任务，**只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行**
- 所有同步任务都在主线程上执行，形成执行上下文栈（Execution Context Stack）
- 异步任务都在任务队列中等待执行，**队列中是异步任务注册的回调**
- 当执行完主线程上的任务时，执行任务队列中的任务，将回调函数放入执行上下文栈中执行

## 任务

任务十分常见，它们必须可以开始，也可以结束（无论是执行成功或执行失败）。在前文中提到过，用于调度同步任务的数据结构是栈。栈是一种后进先出的数据结构。因此，**最先进入执行栈的任务往往是最后一个被执行的（在同一个事件循环内）**。当一个任务处于栈顶时，它将会被弹出栈，并执行。**只有当它执行结束后，下一个栈顶任务才能被弹出执行**。

不难理解任务的调度和执行方式。它们是一种严格按照顺序执行的任务。就好比在银行取票时必须排队才能取，只有当前面的人取到票之后下一个人才能开始取票。

常见的任务有：整段代码、`setTimeout`、`setInterval`、`setImmediate`、I/O、UI 渲染、`Promise` 的构造函数、`Promise.then` （你也许会疑惑，为什么这个方法不是异步的。**此方法本身是同步的**，但是它将注册一个（只对 `fufilled` 或只对 `rejected` 状态回调）或两个（同时对两种状态回调）回调函数，它才属于异步任务）等等。

## 微任务

主线程在**每次**执行任务之前，会先执行完所有的微任务，即**只要还存在微任务，就会一直执行微任务，直至清空所有的微任务，才会继续执行下一个任务**。类似于银行取票后前往柜台办理业务，如果在排队时希望再去做一件其他的事（可能是了解某种理财产品等），做完之后再回来，票号不会被作废。排队等待柜台服务的过程可以视为主线程上的任务，而做的其他事则可以视为微任务。任务在主线程中被执行时，也可以添加一个或多个新的微任务。

常见的微任务包括：`Promise.then` 注册的回调、`async/await`、`Object.observe` 等

## 细化理解

上述文字描述了浏览器中的任务可以被划分为任务和微任务。现在我们显然能够发现，之前我们并没有完全说明每次事件循环有哪些步骤。因此，我们十分有必要再细化这个过程：

- 浏览器事件循环结构分为任务队列和微任务队列
- 任务可以被分为两种
    - 任务
    - 微任务
- 执行代码
    - 整段代码进入执行上下文栈
    - 先执行任务
        - `<script>` 中所有同步的代码
        - 遇到计时器（都属于任务）时，加入任务队列
        - 遇到微任务则将微任务放入微任务队列中
        - 单次执行结束后，清空微任务队列
    - 执行微任务
        - 执行所有微任务
    - 循环这个过程，直至任务执行完毕

上述的过程就是事件循环。**每次循环时，先执行任务，执行任务前会清空微任务队列。**

> 为何 `<script>` 第一次进入执行上下文栈时会先执行其中的代码？这是因为刚开始执行代码时，微任务队列为空。作为任务，`<script>` 中所有的同步代码都会在第一次被执行。

如果描述仍不够清晰，以下的图片可能对于理解它有所帮助：

![https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

上图中，主线程运行的时候，产生堆和栈。堆往往作为存储对象等数据结构使用，我们暂时不用理会它。栈中的代码都是同步任务，并且可以调用其他的方法、API 等。它们（栈中的任务）通常会向任务队列中加入各种事件（`click`，`load` 等）的监听器和（或）各种回调。一旦栈中的任务全部执行完毕（即清空同步任务），主线程就会去读取任务队列，依次执行那些事件所对应的监听器和（或）回调函数。

> 与大多数面向对象的语言不同，JavaScript 中的对象并不是真正意义上的对象。JavaScript 的对象本质上是散列表（Hash Table）。您可能会对上图产生一些诸如“堆是用来干什么的”之类的疑惑，这也许是您要找的答案。然而，本文的主旨并非帮助您完全弄明白 JavaScript 在物理意义上如何分别存储所有类型的数据结构，因为，即使您并不明白有关的一切（或部分问题），也不太可能会妨碍对上图和全文的理解。当然，如果您仍希望弄懂这类问题，笔者提供了[一篇文章](https://medium.com/javascript-in-plain-english/understanding-javascript-heap-stack-event-loops-and-callback-queue-6fdec3cfe32e)帮助您弄懂 JavaScript 中的堆和栈在用途上的区别。

# 加深印象

在前文中，笔者提到了为什么 JavaScript 要选择单线程的工作方式、 JavaScript 是如何实现“看上去是”异步执行的，以及明确了 JavaScript 的同步任务和异步任务（宏任务和微任务）。至此，我们已经从理论上感性地认识了浏览器的事件循环机制。读到这里，您可以选择关闭这篇文章（因为上文已经帮助您对这个机制有了较为深入的理解）。当然，文章仍然没有结束，**因为感性地认知远没有理性地实践更能巩固我们对事物的认知（任何事物都是如此），而且通常更有必要**。因此，基于上述的内容，笔者提供了一些示例代码作为最佳实践以帮助您巩固和加深对事件循环机制的理解。

> 本节中的代码都是在 macOS 版本的基于 Chromium 开发的 Microsoft Edge 中运行的。但是没有必要使用和笔者相同的浏览器或 Chromium 发行版。您可以任意选择浏览器尝试下面的代码。请您记住：最好不要使用 Node.js 作为本文的测试环境。因为 Node.js 采用 `libuv` 实现事件循环机制，它在某些时候并不一定完全等同于浏览器的事件循环，更何况 Node.js 引入了 `process.nextTick` 改变一些代码在事件循环中的执行顺序，而本文所得出的结果并不是基于 Node.js 事件循环机制的。因此，为了避免不确定性因素，笔者建议您使用浏览器测试这些代码。
> 笔者的浏览器版本：
> ![Xnip2020-02-14_14-29-05](/images/2020/02/Xnip2020-02-14_14-29-05.jpg)

请您先从最简单的代码入手：

```javascript
console.log(0);

setTimeout(function() {
  console.log(1);
});

new Promise(function(resolve) {
  console.log(2);
  resolve();
}).then(function() {
  console.log(3);
});

console.log(4);
```

以一次事件循环为单位，考虑这段代码的工作流程：

第 1 次事件循环：

1. 整段代码作为任务，加入任务队列
2. 由于微任务队列为空，将整段代码弹出队列，压入执行上下文栈
3. 执行整段代码中所有同步代码，遇到任务加入任务队列，遇到微任务加入微任务队列
```javascript
// 同步代码
console.log(0);
console.log(2);
console.log(4);

// 任务
setTimeout

// 微任务
Promise.then
```

第 2 次事件循环

1. 清空微任务队列
```
console.log(3);
```

2. 执行一个任务中所有同步代码
```javascript
console.log(1);
```

运行结果如下图：

![Screen-Shot-2020-02-14-at-12.34.10-AM](/images/2020/02/Screen-Shot-2020-02-14-at-12.34.10-AM.png)

上面的例子即两次事件循环输出的结果。我们可以发现：**任何一段代码执行完毕至少需要经历一次事件循环**。您也许会感觉这段代码实在太简单，以至于能够直接看出答案。为了让情况更复杂些，笔者提供了再嵌套一些同步或异步代码（为了使您尽可能看明白下文中的解释，笔者在代码中对每块代码增加了必要的标注）：

```javascript
// {1}
setTimeout(function() {
  new Promise(function(resolve) {
    console.log(0);
    resolve();
    console.log(1);
  }).then(function() { // {2}
    console.log(2);
  });

  console.log(3);
});

// {3}
new Promise(function(resolve) {
  console.log(4);
  resolve();
  console.log(5);
}).then(function() { // {4}
  console.log(6);
  // {5}
  Promise.resolve().then(function() {
    console.log(7);
  }).then(function() { // {6}
    Promise.resolve().then(function() { // {7}
      console.log(8);
    })
  })
});

console.log(9); 
```

这么一来，整段代码似乎并不明朗，您也许并不能像上一个例子一眼看出结果，正是因为这段代码包含了不止一次事件循环。因此，您可能希望以某种更加清晰的方式阐述这段代码从开始执行到结束经历了什么。不幸的是，更方便快捷的解题方法可能并不存在，我们只能以浏览器的角度看待这段代码。

下面笔者给出了这段代码的运行过程：

第 1 次事件循环：

1. 整段代码作为任务，加入任务队列
2. 清空微任务队列（由于微任务队列为空，将整段代码弹出队列，压入执行上下文栈）
3. 执行一个任务（整段代码）所有同步代码
```javascript
console.log(4);
console.log(5);
console.log(9);
```
4. 遇到任务加入任务队列，遇到微任务加入微任务队列
```
// 任务
{1}

// 微任务
{4}
```

> 请您注意：当笔者表示队列中的情况时，使用数组作为描述队列数据结构。您可能已经了解过数组和队列的区别。尽管如此，笔者认为队列并不能很直观地展现在文本中，而且如果使用队列，出于文章严谨性考量，还需要在文中事先给出队列的数据结构定义。出于以上几种因素考虑，笔者仍决定采用数组形式代替数列展示。

第 2 次事件循环：

1. 清空微任务队列
```javascript
console.log(6);
```
2. 执行一个任务中所有的同步代码
3. 遇到任务加入任务队列，遇到微任务加入微任务队列
```
// 微任务
{5}
{6}
```

第 3 次事件循环

1. 清空微任务队列
```javascript
console.log(7);
```
2. 执行一个任务中所有的同步代码
3. 遇到任务加入任务队列，遇到微任务加入微任务队列
```
// 微任务
{7}
```

第 4 次事件循环

1. 清空微任务队列
```javascript
console.log(8);
```
2. 执行一个任务中所有的同步代码
3. 遇到任务加入任务队列，遇到微任务加入微任务队列

第 5 次事件循环

1. 清空微任务队列
2. 执行一个任务中所有的同步代码
```javascript
console.log(0);
console.log(1);
console.log(3);
```
3. 遇到任务加入任务队列，遇到微任务加入微任务队列
```javascript
// 微任务
{2}
```

第 6 次事件循环

1. 清空微任务队列
2. 执行一个任务中所有的同步代码
```javascript
console.log(2);
```
3. 遇到任务加入任务队列，遇到微任务加入微任务队列

我们仍然可以将这段代码在浏览器中运行一次：

![Xnip2020-02-14_15-42-39](/images/2020/02/Xnip2020-02-14_15-42-39.jpg)

# 结束语

首先，祝贺您一直跟随笔者的思路来到了本文的结尾。看到这里，您也许对浏览器事件循环有了全面且细致的理解，甚至对这个神奇的机制产生了更底层、更广泛的兴趣。确实如此，采用事件循环解决单线程带来的问题是非常棒的想法——它不仅完美可以解决异步执行问题，也能够帮助这门语言克服多线程工作所带来的诸多不便以及不必要性因素。在笔者的理解中，事件循环用一句话概括，大概可以这么说：**事件循环是一种机制，在每一次循环中，它都能够先顺序执行完所有同步代码，再执行一个宏任务。执行宏任务前，先全部执行微任务，再执行自身。等到所有宏任务都执行完毕，本轮事件循环将宣告结束。**

# 参考资料

- [Event Loop - Wikipedia](https://en.wikipedia.org/wiki/Event_loop)
- [Help, I'm stuck in an event-loop](http://vimeo.com/96425312)
- [avaScript Event Loop Explained](https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4)
- [The JavaScript Event Loop](https://flaviocopes.com/javascript-event-loop/)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [js中的异步任务：宏任务、微任务](https://www.jianshu.com/p/0dbe260b7837)
- [Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
