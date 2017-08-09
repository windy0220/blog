---
title: Windows下搭建Laravel的Homestead开发环境
date: 2017-08-08 14:35:32
tags: [VirtualBox, Homestead, laravel]
banner: /images/banner_20170808.jpg
thumbnail: /images/banner_20170808.jpg

---
Laravel Homestead 是一个官方预封装的 Vagrant box，它为你提供了一个完美的开发环境，你无需在本地安装 PHP ，web 服务器，或其他服务软件。并且不用担心系统被搞乱！ Vagrant box 是完全一次性的。如果有什么地方出错了，你也可以在几分钟内销毁并重建 box ！
--以上内容摘抄自官方文档
<!--more-->

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
### 添加 homestead.box

添加laravel/homestead 到 varant box
其实就是下载一个virtualbox.box的虚拟机文件 1Gb左右大小，请挂好你的VPN 执行以下命令
```bash
$ vagrant box add laravel/homestead
```
会有三个选项让你选择。这里我们用的varant box 就选2
```bash
1) parallels
2) virtualbox
3) vmware_desktop
```
这样就开始下载了，耐心等待吧。
如果觉得下载太慢，复制出来其中的virtualbox.box 地址 用 Idm 下载。
然后Ctrl + C 打断下载。
在D盘或是别的盘建立一个 homestead 文件夹，把.box文件拷进去。在 Git Bash 输入
```bash
$ vagrant box add laravel/homestead file:///D:/homestead/virtualbox.box
```
后面的 file:///D:/homestead/virtualbox.box 是路径。

都搞顶后执行以下命令检查是否添加成功
```bash
$ vagrant box list
laravel/homestead (virtualbox, 3.0.0)
```
### 配置homestead

在D盘的 homestead 文件夹下执行
```bash
git clone https://github.com/laravel/homestead.git homestead
cd homestead
bash init.sh
```
然后我们在 D：/homestead/homestead/ 下会找到 Homestead.yaml 文件
这个就是 配置homestead 的配置文件

**虚拟机配置**
配置IP 内存和CPU核心数，默认就好
```xml
ip: "192.168.10.10"
memory: 2048
cpus: 1
```

**本地磁盘的映射**
map为本地PC的路径
to为虚拟机的路径
```xml
folders:
    - map: D:/homestead/Code
      to: /home/vagrant/Code
```

**站点配置**
map 为域名，当然这里我们不用去注册这个域名，只要在本地Hosts文件里映射下就好了。
windows 下 打开 C:\Windows\System32\drivers\etc\ 将hosts 复制到桌面，
打开添加一行```192.168.10.10 windy.app``` 保存，覆盖回去就好了。

to 为站点在虚拟机上的路径
这里要注意，如果你在Code下使用```laravel new blog``` 新建了一个 blog 的laravel项目那么站点路径应该如下
```bash
sites:
    - map: windy.app
      to: /home/vagrant/Code/blog/public
```


### 启动
配置完成之后在该目录下 也就是 D：/homestead/homestead/ 执行一下命令启动虚拟机
```bash
$ vagrant up
```
连接SSH
```bash
$ vagrant ssh
```

默认启动一个mysql数据库，默认的账号密码为
用户名：homestead
密码：secret
命令行登陆：
```bash
$ mysql -uhomestead -psecret
```

