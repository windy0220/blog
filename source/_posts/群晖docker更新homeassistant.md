---
title: 群晖docker更新homeassistant
date: 2022-03-10 00:20:26
tags:
---
docker版的homeassistant是最容易更新的，不用输入命令，点几下就搞定。
<!-- more -->

![更新之前的版本](/images/2022031009.png)

打开docker

在注册表中输入homeassistant

选择 homeassistant/home-assistant 右键-下载此映像

![下载镜像](/images/2022031001.png)

选择 latest 

![latest ](/images/2022031002.png)


下载完成后，在日志中可看到

`Add image from docker.io/homeassistant/home-assistant:latest`

![日志](/images/2022031003.png)

选择容器
关闭 homeassistant 容器

![关闭 homeassistant 容器](/images/2022031004.png)


右键-操作-(重置)清除-是

![重置](/images/2022031006.png)

不用担心你的数据都在，如果实在不放心，可以把镜像导出备份一下

![重置](/images/2022031008.png)

再打开

更新成功

![更新成功](/images/202203110.png)