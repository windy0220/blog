
title: 开启openClash之后，github的clone报错的问题
date: 2022-03-09 00:18:20
tags: [openclash,github,gitclone,失败]
---

今天在clone github 上的代码的时候发现报错了。如下图

![github clone 报错](/images/2022030901.jpg)

```bash
Cloning into 'blog'...
kex_exchange_identification: Connection closed by remote host
Connection closed by xxx.xxx.xxx.xxx port 22
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

在尝试关掉openClash之后发现，可以正常了，看来是代理的问题。

经过搜索，发现只要在规则里增加一条，便可以解决问题。

我的是在路由中使用的 openClash 操作方法具体如下：

- 全局设置-规则设置-打开自定义规则

- 在`rules:` 中增加一条 `- DST-PORT,22,DIRECT`

- 拉到最下放 点击保存配置，应用配置

![openClash配置](/images/2022030903.jpg)

等待重启完成之后便可以正常clone了。

![修复后正常clone](/images/2022030902.jpg)