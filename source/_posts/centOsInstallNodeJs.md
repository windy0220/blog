---
layout: centos
title: Centos 安装 NodeJs
date: 2020-06-07 23:28:48
tags: [Centos, NodeJs]
---


# 获取下载链接

进入以下页面，获取 Linux Binaries (x64) 的链接
https://nodejs.org/en/download/ 

若需要其他版本请访问 https://nodejs.org/dist/

---
以下安装步骤以 `node-v12.18.0-linux-x64` 为例，其他版本替换相应路径即可。


# 下载
wget https://nodejs.org/dist/v12.18.0/node-v12.18.0-linux-x64.tar.xz

# 解压
xz -d node-v12.18.0-linux-x64.tar.xz
tar -xf node-v12.18.0-linux-x64.tar

# 部署
这里注意node解压的路径 以 `~` 目录为例
ln -s ~/node-v12.18.0-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v12.18.0-linux-x64/bin/npm /usr/bin/npm
ln -s ~/node-v12.18.0-linux-x64/bin/npm /usr/bin/npx

# 测试
node -v
npm
npx