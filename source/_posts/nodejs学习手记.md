---
title: nodejs学习手记
date: 2017-02-14 22:26:34
tags: nodejs
---
# LINUX安装node
#### 从官网下载linux已编译版本 https://nodejs.org/en/download/
> wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-x64.tar.xz
#### 解压
> tar xvf node-v6.9.5-linux-64
#### 设置全局连接
```
ln -s /root/node-v6.9.5-linux-x64/bin/node /usr/local/bin/node
ln -s /root/node-v6.9.5-linux-x64/bin/npm /usr/local/bin/npm
```
----

# 1.创建一个http服务器
```javascript
var http = require('http');

http.createServer(function (request, response) {
// 发送 HTTP 头部
// HTTP 状态值: 200 : OK
// 内容类型: text/plain
response.writeHead(200, {'Content-Type': 'text/plain'});
// 发送响应数据 "Hello World"
response.end('Hello World\n');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如
#### 本地安装
> npm install express     
#### 全局安装
> npm install express -g  

你可以使用以下命令来查看所有全局安装的模块：

> $ npm ls -g

````
Package.json 属性说明
name - 包名。
version - 包的版本号。
description - 包的描述。
homepage - 包的官网 url 。
author - 包的作者姓名。
contributors - 包的其他贡献者姓名。
dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")。
keywords - 关键字
````

#### 卸载模块
我们可以使用以下命令来卸载 Node.js 模块。

> $ npm uninstall express

卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

> $ npm ls

#### 更新模块
我们可以使用以下命令更新模块：

> $ npm update express

#### 搜索模块
使用以下来搜索模块：

> $ npm search express

#### 创建模块
> NPM init
----
#REPL

我们可以输入以下命令来启动 Node 的终端：
````
$ node
>
````

这时我们就可以在 > 后输入简单的表达式，并按下回车键来计算结果。
> 普通计算 3+8

> 代数计算 var x=10; x+10

#### do...while循环
#### _可获取表达式的值
````
     x+y
     var sum = _
     sum可输出x+y的值
````

#### REPL 命令
````
ctrl + c - 退出当前终端。
ctrl + c 按下两次 - 退出 Node REPL。
ctrl + d - 退出 Node REPL.
向上/向下 键 - 查看输入的历史命令
tab 键 - 列出当前命令
.help - 列出使用命令
.break - 退出多行表达式
.clear - 退出多行表达式
.save filename - 保存当前的 Node REPL 会话到指定文件
.load filename - 载入当前 Node REPL 会话的文件内容。
````
----
# 回调函数
