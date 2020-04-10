---
title: centos更新node和npm版本
date: 2020-04-11 01:19:32
tags: [centos, node, npm, update, 更新, Segmentation fault]
---
## 使用 n 工具 管理node 版本

```bash
npm install -g n
```

安装node

```bash
n 版本号

# 安装最新的稳定版本
n stable

# 安装最新版本
n latest

```

列表所有安装的版本

```bash
n list
```

切换版本

```bash
# 会显示一个可交互选择的列表
n

# 切换至指定版本
n 版本号
```

删除版本

```bash
n rm 版本号
```

#### 错误处理

如果npm -v报一下错误

```bash
Segmentation fault
```

使用 n 5.10.1 安装一个低版本 

然后 n list 列出所有按装的版本

n rm 12.16.1 删除错误的版本

n stable 安装最新的稳定版本

## npm版本管理

升级

```bash
npm i -g npm
```

若升级后版本没有变化

```bash
获取当前npm 路径 查看路径是否是最新的npm 路径

npm config get prefix

重新设置npm路径

npm config set prefix /usr/local

```