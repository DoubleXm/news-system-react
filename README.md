基于 `react` 的项目实践作业。感谢 **千峰 kerwin 老师** 带我重新温习了 `react` 相关全家桶的知识。这里也算是交上了一份作业。

[实践视频破站地址](https://www.bilibili.com/video/BV1dP4y1c7qd?p=152&vd_source=eb136bace6ca577e9c63c501d9996213)，如果涉及到侵权望及时提醒改正。

[项目仓库地址](https://github.com/ShuQingX/news-system-react)

页面基本为 1:1 复刻。但是在实现细节上可能有些许不同（毕竟 `Vue` 出身有一定的基础，主要注重一些接口的对接，页面实现两个框架其实没啥大的差异，思想基本相同），也可以给后续发现此内容的同学一个参考。

该项目技术栈使用：`react18` `react-router-dom@5` `redux` `antd` 为基本架构，后续加入了一些工具库 `echarts` `lodash` 等等。

后续如果有机会的话会考虑下 使用 `umi` `react-router-dom@6` 等其他技术构建其他的版本，当然这也是后话了。如果你查看这个项目没有其他的分支，那就是我胡咧咧。

**项目启动**

本项目在开始时一直使用 `node v14.x` 避免意外，请使用 14 及以上版本。

- `git clone https://github.com/ShuQingX/news-system-react.git`

- `npm install`

- `npm run serve` 启动 `json-server` 的后端服务

- `npm start` 启动前端

当然也有一些设计欠缺的地方。比如在 `/api` 这里，简单的认为项目没有这么大，就把接口全部放到一个文件，跟着视频越写发现文件越大，又不得不分开 😂。还有一些校验逻辑想当然的以为自己有些基础就提前设计好了。最后发现对接口字段的不理解，导致了最后路由鉴权的时候好多都是 `hack` 方案自己都看不下去了。不过好在功能还是实现了。（当然啦，我认为这都不是重点，重点是你能学到哪些内容）

项目演示就没有必要了，就象征性的放一个首页吧。

![home.png](/public/home.jpg)
