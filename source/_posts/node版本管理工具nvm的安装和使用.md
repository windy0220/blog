---
layout: windows
title: node版本管理工具nvm的安装和使用
date: 2021-05-28 00:09:38
tags: [node, npm, nvm, windows, 版本管理]
---
# windows node版本管理工具nvm的安装和使用

在实际的前端开发工作中，我们经常要维护一些老项目使用的是较旧版本的node和npm，新的项目又要使用比较新的node和npm，这时候就要祭出node版本工具了，上次说过 Linux上的node版本工具n，这次就来看看windows上的node版本管理工具nvm如何安装和使用。

#### 下载安装

官方给出了绿色版和安装版，这里推荐安装版，更方便快捷，省区了配置环境变量的麻烦。

下载地址 https://github.com/coreybutler/nvm-windows/releases

下载 nvm-setup.zip 即可。

下载完成解压安装即可。

这里要注意的是有两个路径提示，第一个是nvm的安装路径，第二个是nodeJs的安装路径。如果你的nodeJs安装在默认路径下。一路下一步即可安装成功。

![image-20210527234010427](/images/image-20210527234010427.png)

![image-20210527234032258](/images/image-20210527234032258.png)

#### 使用nvm安装nodeJs

安装 14.17.0 

```
nvm install 14.17.0
```

注意这里的版本号，需要真是存在才可以。可以去 https://nodejs.org/zh-cn/download/releases/ 查询需要的版本

如果遇到下载失败，也没有关系，我们可以到阿里的镜像网站下载对应的安装包，解压到nvm的路径里

例如我们需要 14.17.0 的版本 https://npm.taobao.org/mirrors/node/v14.17.0/

找到 `node-v14.17.0-win-x64.7z ` 下载解压至 `C:\Users\【这里一般是你的用户名】\AppData\Roaming\nvm\v14.17.0` 即可。

如果遇到安装后，node可以使用 npm 用不了也可以使用此方法。

#### 切换node版本

```
nvm use 14.17.0
```

即可切换。

如果切换后使用 `node -v` 命令发现版本没有切换。可以把原来安装的nodeJs目录改掉

如我原来的nodeJs安装目录是 `C:\Program Files\nodejs` 改为 `C:\Program Files\nodejsx` 即可成功

#### 显示安装的版本

```
nvm list
* 14.17.0 (Currently using 64-bit executable)
  8.17.0
```

带* 号的则为当前版本

#### 链接汇总

nvm 下载地址 https://github.com/coreybutler/nvm-windows/releases

nodeJs官方版本库 https://nodejs.org/zh-cn/download/releases/

阿里镜像源 https://npm.taobao.org/mirrors/node/




