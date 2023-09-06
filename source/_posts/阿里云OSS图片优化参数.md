---
title: 阿里云OSS图片优化参数
date: 2021-06-07 14:16:23
tags: [阿里云,OSS,webP,图片优化,优化参数]
---
您可以通过格式转换参数，转换存储在OSS内原图的格式。本文介绍对图片进行格式转换时所用到的参数及示例。

## 参数说明

操作名称：**format**

参数说明如下：

| 取值范围 | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| **jpg**  | 将原图保存成JPG格式，如果原图是PNG、WebP、BMP等存在透明通道的格式，默认会把透明填充成白色。 |
| **png**  | 将原图保存成PNG格式。                                        |
| **webp** | 将原图保存成WebP格式。                                       |
| **bmp**  | 将原图保存成BMP格式。                                        |
| **gif**  | 原图为GIF图片则继续保存为GIF格式；原图不是GIF图片，则按原图格式保存。 |
| **tiff** | 将原图保存成TIFF格式。                                       |

## 注意事项

- 图片处理包含缩放操作时，建议将格式转换参数放到处理参数的最后。

  例如`image/resize,w_100/format,jpg`

- 图片处理包含缩放和水印操作时，建议将格式转换参数添加在缩放参数之后。

  例如`image/reisze,w_100/format,jpg/watermark,...`

## 示例

本文示例使用的Bucket为杭州地域名为image-demo的Bucket，图片外网访问地址为：

https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.gif[![gif](/images/p139212.png)](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/zh-CN/8448459951/p139212.png)

- 将原图转换为PNG格式

  图片处理URL为：https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.gif?x-oss-process=image/format,png[![png](/images/p139213.png)](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/zh-CN/8448459951/p139213.png)

- 将原图转换成JPG格式，并支持渐进显示

  需求及处理参数如下：

  - 图片设置为渐进显示：`interlace,1`
  - 图片转换为JPG格式：`format,jpg`

  图片处理URL为：https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.gif?x-oss-process=image/interlace,1/format,jpg

  ![img](/images/p2555.jpg)

- 将原图缩放为宽200 px，并转换为WebP格式

  需求及处理参数如下：

  - 图片缩放为宽200 px：`resize,w_200`
  - 图片转换为WebP格式：`format,webp`

  图片处理URL为：https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.gif?x-oss-process=image/resize,w_200/format,webp[![img](/images/p2559.webp)](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/zh-CN/1548459951/p2559.webp?spm=a2c4g.11186623.2.12.48fc66a35FOLP9&file=p2559.webp)



原文地址 https://help.aliyun.com/document_detail/44703.html?spm=a2c4g.11186623.6.752.665f7fd8tuPrz4