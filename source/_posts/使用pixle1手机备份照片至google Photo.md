---
title: 使用pixle1手机备份照片至google Photo
date: 2021-10-24 3:23:34
tags: [googlePhoto,pixle,备份照片]
---
# iPhone 通过Pixle1 无限容量特权 备份照片到谷歌相册 Google Photo



一直在用google photo ，各种的图片分类和整理真的很方便，还会不定期的推送，它自动合成的视频和一些动图，虽然国内也有一刻相册，ios的相册也有了类似的功能，但这些跟googlePhoto比起来还是略有不足

今年2021年6月1号开始，谷歌相册开始不免费了，再备份就会占用15GB的存储空间，我也一直在找替代方案，尝试一些其他的相册服务之后，实在是不够完美，无意间发现 pixle 1 还可以无限容量的备份，就来了思路。

**所需设备：主力机，Pixle1, 群晖。**

**软件： Syncthing**

首先从闲鱼150收了一个二手的Pixle1 , 没有声音，略有烧屏，不过便宜能用就好。

<img src="/images/image-20211024030250183.png" alt="image-20211024030250183" style="zoom: 67%;" /><img src="/images/image-20211024030303790.png" alt="image-20211024030303790" style="zoom: 50%;" />

到手升级到了安卓10 ，居然有声音了，心想赚了，重启后又没有了，网上搜索了一下才知道，这个是当时的通病，不过无所谓了。

![image-20211024031617312](/images/image-20211024031617312.png)



看到相册这里，的确说明可以免费无限备份

#### 群晖安装 Syncthing

Syncthing 介绍请看官网这里就不多做介绍了。

https://docs.syncthing.net/index.html

先在套件中心新增一个套件来源

名称随意这里填写：imnks

位置填写：https://spk.imnks.com

这里的地址仅供参考。要是无法添加可以再换一个。

![image-20211024022648106](/images/image-20211024022648106.png)

然后就是搜索 Syncthing 点击安装。安装成功之后等待启动。

![image-20211024022914976](/images/image-20211024022914976.png)

启动完成之后，我们在浏览器中输入  http://192.168.2.42:8384/# 这里的地址换成你的NAS地址 端口号是 8384

![image-20211024023027701](/images/image-20211024023027701.png)

先在左侧新增文件夹，下图是我配置好的

![image-20211024023128223](/images/image-20211024023128223.png)

这里的文件夹路径可以在群晖的文件管理中右键-属性获得

![image-20211024023426149](/images/image-20211024023426149.png)

**这里我是通过手机上的 Moments app 备份至群晖的，这个Moments/Mobile文件夹下 就是根据你备份设备的名称自动建立了。因为我之前已经有了大量照片，新的同步方案只用于新的照片，我把我的手机改了下名称，这样再通过 Moments 同步到群晖 就会生成一个新的文件夹。**

复制这里的 所在位置，填入 Syncthing 的文件夹路径中

![image-20211024023809445](/images/image-20211024023809445.png)

第二个tab签是 要共享的设备 我这里已经有了 Pixel

![image-20211024023903368](/images/image-20211024023903368.png)



版本控制不用启用，忽略模式这里要填上 **@eaDir** 这个目录是群晖的全局搜索建立的索引目录，如果不排查也会同步到 远程设备上，这个我们是不需要的。

![image-20211024023944546](/images/image-20211024023944546.png)

高级这里我们选择仅发送即可，其他不用修改了。

![image-20211024024134095](/images/image-20211024024134095.png)



#### 在pixle1上安装 Syncthing

![image-20211024024850128](/images/image-20211024024850128.png)

安装之后，先通过 右上角的 + 来添加设备。

这里我们打开 群晖上的 Syncthing Web端 扫码添加

![image-20211024025011069](/images/image-20211024025011069.png)

扫码添加后就可以在手机端的设备tab签下看到了。

![image-20211024025150938](/images/image-20211024025150938.png)

然后切换到 文件夹 tab 添加一个要接收文件的文件夹，这里要注意的是，文件夹的路径要选到 DCIM 目录下，这个是相册目录，谷歌相册自动就识别了，有文件后就自动上传。目录种类这里 选择仅接收，这样等我们手机的存储占满后可以使用谷歌相册的释放空间功能释放本地空间，也不会影响NAS上的文件。

![image-20211024025250438](/images/image-20211024025250438.png)

至此已配置完成。之后手机上通过Moments 备份至 NAS后，Pixel1便会自动备份了，且是无限容量哦。

对了，记得关闭主力设备上的谷歌相册备份功能。

> 后记：ios的 livephoto 照片通过pixle1备份到google photo 后发现是一个 照片加一个视频，跟ios 直接备份的1张动态图片有出入，我通过查询发现，google 是通过备份设备来判断的，pixle1不会生成 live photo的照片，所以备份到 google photot 就是分开的，这个暂时无解。