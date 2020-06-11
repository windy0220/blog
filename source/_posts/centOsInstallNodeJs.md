---
layout: centos
title: Centos 安装 NodeJs PM2 守护NUXT
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

# 安装pm2
npm i -g pm2

创建配置文件 server.json
```
{
  "name": "your-project-name",
  "script": "build/main.js",
  "cwd": "./",
  "watch": [
  ],
  "ignore_watch": [
      "node_modules",
      "logs"
  ],
  "watch_options": {
      "followSymlinks": false
  },
  "error_file": "./logs/app-err.log",
  "out_file": "./logs/app-out.log",
  "env": {
      "NODE_ENV": "production"
  }
}
```

package.json添加pm2 scripts
```
 "scripts": {
    "pm2": "cross-env pm2 start server.json"
 }
```

运行
```
npm run pm2
```

#### pm2 常用命令
|说明|命令|
|-|-|
|启动进程/应用 |pm2 start bin/www 或 pm2 start app.js|
|重命名进程/应用 |pm2 start app.js --name wb123|
|添加进程/应用 | watch pm2 start bin/www --watch|
|结束进程/应用 | pm2 stop www|
|结束所有进程/应用 | pm2 stop all|
|删除进程/应用 | pm2 delete www|
|删除所有进程/应用 | pm2 delete all|
|列出所有进程/应用 | pm2 list|
|查看某个进程/应用具体情况 | pm2 describe www|
|查看进程/应用的资源消耗情况 | pm2 monit|
|查看pm2的日志 | pm2 logs|
|若要查看某个进程/应用的日志,使用 | pm2 logs www|
|重新启动进程/应用 | pm2 restart www|
|重新启动所有进程/应用 | pm2 restart all|

#### 错误

1. -bash: pm2: command not found
替换 node-v12.18.0-linux-x64 为你的node 版本号
```
ln -s /root/node-v12.18.0-linux-x64/lib/node_modules/pm2/bin/pm2 /usr/local/bin
```