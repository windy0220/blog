---
title: openwrt 下 dnsmasq 的配置
date: 2018-08-22 22:55:15
tags: [openwrt, dnsmasq]
---
dnsmasq 可以在局域网内 对网址映射到ip 类似于本地电脑的host
<!-- more -->
#### 打开 openwrt 上dnsmasq配置文件

```bash
vi /etc/config/dhcp 
```

#### 在 config dnsmasq  下添加

```
list address 'clients1.google.com/clients2.google.com/203.79.253.17'
```

`clients1.google.com/clients2.google.com`为域名，可以设置多个，使用‘/’分隔，最后一段是ip

#### 重启使之生效

```bash
/etc/init.d/dnsmasq restart
```