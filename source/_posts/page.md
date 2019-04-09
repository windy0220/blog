---
title: windows调试IOS页面工具
date: 2019-03-02 23:10:21
tags: [ios,debug]
---
#### 安装Scoop

环境win10 命令行工具 Power Shell

`iex (new-object net.webclient).downloadstring('https://get.scoop.sh')`

如果以上命令出错可能需要改变组策略 执行以下命令
`Set-ExecutionPolicy RemoteSigned -scope CurrentUser`
![628e76ae5016da498088e1a638b59279.jpeg](/images/20190302001.jpg)

#### 安装 ios-webkit-debug-proxy
项目git `https://github.com/google/ios-webkit-debug-proxy`


>如果 ping github.com 超时
>去以下网址查询github.com 和 github.global.ssl.fastly.net 的IP
>https://www.ipaddress.com/
>
>然后在hosts里添加
>192.30.253.112 github.com
>151.101.185.194 github.global.ssl.fastly.net
>执行 ipconfig /flushdns 刷新缓存


`scoop bucket add extras`
`scoop install ios-webkit-debug-proxy`

#### 启动代理

`ios_webkit_debug_proxy`
会提示
Listing devices on :9221


ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.html
Listing devices on :9221

使用chrome 打开
http://localhost:9222/