---
title: hassio 折腾 未完工
date: 2019-04-10 00:25:15
tags: [hassio,物联网]
---
# 树莓派安装 hass.io 折腾记

#### 下载烧录

这是官方的下载地址

https://www.home-assistant.io/hassio/installation/

一开始下的1.12版怎么也进不去系统，后来换了1.1版才可以。

https://github.com/home-assistant/hassos/releases/download/1.1/hassos_rpi3-64-1.1.img.gz

然后下载一个烧录工具etcher

https://www.balena.io/etcher/

把镜像烧到sd卡中

需要16G 以上的 TF 卡 官方推荐32G的卡 



#### 配置无限连接

配置 wifi 需要单独准备一个U盘来存放wifi连接信息

https://github.com/home-assistant/hassos/blob/dev/Documentation/network.md

uuid 的生成地址 https://www.uuidgenerator.net/

在`network`文件夹内创建文件`my-network` 

修改其中的 ssid为你的wifi psk 为你的wifi密码

```
[connection]
id=hassos-network
uuid=72111c67-4a5d-4d5c-925e-f8ee26efb3c3
type=802-11-wireless

[802-11-wireless]
mode=infrastructure
ssid=MY_SSID

[802-11-wireless-security]
auth-alg=open
key-mgmt=wpa-psk
psk=MY_WLAN_SECRET_KEY

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

#### 安装 HASSIO

一定要给安装hassio的树莓派全程翻墙

启动后过一会访问hassio.loacl:8123会看到一个蓝色的房子让你等20分钟，如果你翻墙网速够好也就20分钟的事，要不然可能永远也不会好。



#### 添加插件源

Hass.io -> ADD-ON STORE

**https://github.com/hassio-addons/repository** 

主要的插件

##### SSH server

可以让你ssh连接hass.io

配置也比较简单

```json
{
  "authorized_keys": [],
  "password": "youPassWord"
}
```

##### Configurator 

可以在页面上编辑hass.io的配置文件，配置文件是hass.io的核心内容，通过简单的配置在不用安装插件的情况下就可以接入大量智能设备

配置

```json
{
  "username": "yourUserName",
  "password": "yourPassWord",
  "ssl": false,
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem",
  "allowed_networks": [
    "192.168.0.0/16",
    "172.30.0.0/16"
  ],
  "banned_ips": [
    "8.8.8.8"
  ],
  "banlimit": 0,
  "ignore_pattern": [
    "__pycache__"
  ],
  "dirsfirst": false,
  "enforce_basepath": false,
  "notify_service": "persistent_notification.create"
}
```

你也可以使用winscp连接ssh直接编辑文件，但使用 Configurator 会帮你纠错

#### custom-ui 

https://bbs.hassbian.com/thread-3975-1-4.html

#### 开启MQTT

```yaml
mqtt:
  password: mqttPassWord
```

默认值

| Setting        | Value         |
| -------------- | ------------- |
| Port           | 1883          |
| User           | homeassistant |
| Websocket port | 8080          |





#### 接入homekit

在 configuration 文件里添加

```
homekit:
```

如果之前激活过，需要删掉config文件夹下的 .homekit.state 文件 然后重启

#### 斐讯设备



#### 小米设备



#### 博联设备



#### ESP8266

ESP_Easy_0

192.168.4.1

烧录固件时把io0接到GND

不接RXD TXD 可运行

**MQTT的配置**

Devices -> Send to Controller

Tools -> Advanced -> 勾上 MQTT Retain Msg

Controller -> Edit -> 填入MQTT 的 IP ，端口一般为1883, Controller User为homeassistant(hassio默认) 密码是在配置文件中配置的，Controller Subscribe 默认，Controller Publish 改第一个变量 如 /Lux/%tskname%/%valname%

Enabled 勾上

然后到 hassio 的 configuration 文件中配置

```yaml
sensor 3:
  - platform: mqtt
    name: "Lux" # 随便起，但中文不行
    state_topic: "/Lux/2561/Lux" # /你在esp8266 controller 中配置的/devices中的name/devices 中的Values 单位
    qos: 0
    retain: true
    unit_of_measurement: "lux" # 单位
```



#### Node RED

添加插件源 https://github.com/notoriousbdg/hassio-addons 







---



#### 资料参考

hass.io 官网 https://www.home-assistant.io

hass.io 组件一览表 https://www.home-assistant.io/components/

HassBan论坛 https://bbs.hassbian.com/forum.php

ESP EASY 官网 https://www.letscontrolit.com/    

ESP EASY wiki https://www.letscontrolit.com/wiki/index.php/Main_Page

安可信官网 http://en.ai-thinker.com/

ESP8266文档 http://en.ai-thinker.com/esp8266/docs

#### 软件下载

安信可串口调试助手 http://en.ai-thinker.com/_media/tools/aithinker_serial_tool_v1.2.3.7z

#### 物料列表

树莓派3B+

32G TF卡

ESP8266 芯片 ESP01

ESP8266 芯片 ESP V3

面包板

杜邦线

TTL

光敏传感器

