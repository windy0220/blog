---
title: Homestead
date: 2017-08-08 14:35:32
tags:[VirtualBox, Homestead, laravel]
banner: /images/banner-20170808.jpg
thumbnail: /images/banner-20170808.jpg
---

### 首先下载和安装VirtualBox和Vagrant

git bash
> https://git-for-windows.github.io/

VirtualBox
> https://www.virtualbox.org/wiki/Downloads

Vagrant 请下载对应版本 windows就下windows版的
> https://www.vagrantup.com/downloads.html

下载完 Vagrant 需要重启，重启完成后用 Git Bash 验证下 Vagrant是否安装成功

```bash
$ Vagrant -v
Vagrant 1.9.7

```

添加laravel/homestead 到 varant box
其实就是下载一个.box的虚拟机文件 1Gb左右大小，请挂好你的VPN 执行以下命令
```bash
$ vagrant box add laravel/homestead
```
执行以下命令检查是否添加成功
```bash
$ vagrant box list
laravel/homestead (virtualbox, 3.0.0)
```

如果觉得下载太慢，可以在执行 `vagrant box add laravel/homestead` 后会显示出.box的地址，
