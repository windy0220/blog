---
title: 使用VSCode调试Nuxt.js
date: 2020-05-01 00:00:20
tags: [VSCode, debug, nuxt]
---
由于Nuxt是在服务端获取API接口数据的，所有无法在浏览器中直接调试。

下面介绍使用VSCode调试Nuxt.js的服务端接口

点击 VSCode 侧栏上的 debug 工具，选择添加配置文件

![添加配置文件](images/Snipaste_2020-05-01_00-05-06.jpg)

添加如下内容

```json
{
    "version": "0.2.0",
    "configurations": [
        
        {
            "type": "node",
            "request": "attach",
            "name": "调试nuxt",
            "processId": "${command:PickProcess}",
            "port": 9229
        }
    ]
}
```

然后运行 `npm run dev`

选择好配置文件后，点击签名的小三角开始调试，会弹出窗口提示选择node.js进程。选择nuxt 本地的调试进程就好。默认是3000的端口

![image-20200501001312616](images/image-20200501001312616.png)

之后就进入了调试状态。

在VSCode中打上响应的断点，然后刷新对应的页面，就可以愉快的debug了。