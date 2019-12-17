---
title:  使用weinre在windows上调试ios页面
date: 2019-12-17 11:54:53
tags: [weinre, windows, ios, 调试, debug]
---
# 使用weinre 在windows上调试ios页面

想调试ios页面却没有mac电脑，ios-webkit-debug-proxy 又有各种问题链接不上。可以试下 weinre！  不挑系统，都能调试，只要在要调试的脚本中添加一段js就好。对于在线的页面也可以使用抓包工具注入js脚本调试。
<!-- more -->


#### 安装

```bash
npm install weinre -g --registry=https://registry.npm.taobao.org
```

运行

```bash
weinre --httpPort 8081 --boundHost -all-
```

然后使用浏览器打开 `http://localhost:8081/` 可以看到

![image-20191213104301478](/images/image-20191213104301478.png)

在需要调试的页面上插入一段js

```html
<script src="http://换成你的ip:8081/target/target-script-min.js#anonymous"></script>
```

#### 手机页面的本地调试

- 本地起一个服务器，使用xampp 或 phpStudy 或其他你顺手的都可以。

- 本地开热点，windows 10 自带，如果你是台式机可能需要一个无线网卡才行

- 配置本地host 执行本地的服务器，服务器也要配置相应的域名

手机连上热点就可以使用Host中配置的域名访问本地站点了。

> tips: 可能需要关闭本地的防火墙能访问到 weinre 的脚本，或者把node.js添加到排除中，可以在手机上直接访问脚本试试。



#### 调试

点击 Access Points 下的 debug client user interface

![image-20191213112119445](/images/image-20191213112119445.png)

在 Targets 中选中要调试的页面

![image-20191213112238352](/images/image-20191213112238352.png)

就可以愉快的调试了，类似于 chrome 的控制台。
