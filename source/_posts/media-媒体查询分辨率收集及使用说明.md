---
title: '@media 媒体查询分辨率收集及使用说明'
date: 2018-07-18 22:59:18
tags: [media, 媒体查询, 分辨率, css]
---

收集的一些响应式网页媒体查询的分辨率
<!-- more -->
## 苹果官网

```css
@media only screen and (max-width: 1044px) {
    #ac-globalnav {
        min-width:320px
    }
}
@media only screen and (max-width: 1023px) {
    #ac-gn-segmentbar {
        min-width:320px
    }
}
@media only screen and (max-width: 767px) {
    #ac-globalnav .ac-gn-searchresults-list {
        padding:3px 30px 0
    }
}
@media only screen and (max-width: 419px) {
    #ac-globalnav .ac-gn-searchresults-list {
        padding:4px 0
    }
}
```

## 微软官网
```css
@media (min-width:1779px) {
    html img.vp6 {
        display:block;
    }
}
@media (min-width:1400px) and (max-width:1778px) {
    html img.vp5 {
        display:block;
    }
}
@media (min-width:1084px) and (max-width:1399px) {
    html img.vp4 {
        display:block;
    }
}
@media (min-width:768px) and (max-width:1083px) {
    html img.vp3 {
        display:block;
    }
}
@media (min-width:540px) and (max-width:767px) {
    html img.vp2 {
        display:block;
    }
}
@media (max-width:539px) {
    html img.vp1 {
        display:block;
    }
}
```

## @media 使用说明
#### 设置meta
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```
- width = device-width：宽度等于当前设备的宽度
- initial-scale：初始的缩放比例（默认设置为1.0）
- minimum-scale：允许用户缩放到的最小比例（默认设置为1.0）
- maximum-scale：允许用户缩放到的最大比例（默认设置为1.0）
- user-scalable：用户是否可以手动缩放（默认设置为no，因为我们不希望用户放大缩小页面）
#### 加载兼容JS
IE8既不支持HTML5也不支持CSS3 Media，所以我们需要加载两个JS文件，来保证我们的代码实现兼容效果：
```html
<!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

#### 设置IE渲染方式默认为Edge
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

## 除了在@media 规则中使用外，媒体查询也可应用于HTML标签<link>以将样式表的应用限于某个特定媒体。
```html
<link rel="stylesheet" media="screen and (min-width: 900px)" href="widescreen-styles.css" />
```

## 基本语法
```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

## 媒体类型 mediatype
- all
适用于所有设备。
- print
为了加载合适的文档到当前使用的可视窗口. 需要提前咨询 paged media（媒体屏幕尺寸）, 以满足个别设备网页尺寸不匹配等问题。
- screen
主要适用于彩色的电脑屏幕
- speech
解析speech这个合成器. 


## 媒体查询包括四种逻辑运算符  and|not|only

- and 

```@media (min-width: 700px) and (orientation: landscape) { ... }```

- 逗号分隔(or)

```@media (min-width: 700px), handheld and (orientation: landscape) { ... }```

- not <i>not 对整句查询起效</i>

```@media not all and (monochrome) { ... }```

等价于

```@media not (all and (monochrome)) { ... }```

而不是

```@media (not all) and (monochrome) { ... }```

- only

```@media only (min-width: 300px) { ... }```

## 可用的其他参数 media feature

- width:浏览器可视宽度。
- height:浏览器可视高度。
- device-width:设备屏幕的宽度。
- device-height:设备屏幕的高度。
- orientation:检测设备目前处于横向还是纵向状态。
- aspect-ratio:检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)
- device-aspect-ratio:检测设备的宽度和高度的比例。
- color:检测颜色的位数。
- color-index:检查设备颜色索引表中的颜色，他的值不能是负数。
- monochrome:检测单色楨缓冲区域中的每个像素的位数。
- resolution:检测屏幕或打印机的分辨率。
- grid：检测输出的设备是网格的还是位图设备。


## 常用的分辨率

```css
/* 大屏幕 */
@media (min-width: 1200px) { ... }
 
/* 平板电脑和小屏电脑之间的分辨率 */
@media (min-width: 768px) and (max-width: 979px) { ... }
 
/* 横向放置的手机和竖向放置的平板之间的分辨率 */
@media (max-width: 767px) { ... }

/* 横向放置的手机及分辨率更小的设备 */
@media (max-width: 480px) { ... }
```
- 笔记本 1440px
- 小尺寸笔记本 1280px
- iPad Pro 1024px
- iPad 768px
- iPhone6/7/8 414px 

## 使用示例
```css
/*当页面宽度小于 960px 的时候执行包裹的css*/
@media screen and (max-width: 960px){
    body{
        background: #000;
    }
}

/*当页面宽度大于 960px 的时候执行包裹的css*/
@media screen and (min-width:960px){
    body{
        background:red;
    }
}


/*当设备的最大宽度等于 960px 的时候执行包裹的css*/
@media screen and (max-device-width:960px){
    body{
        background:red;
    }
}


/*当页面宽度大于 960px 且小于 1440px 的时候执行包裹的css*/
@media screen and (min-width:960px) and (max-width:1440px){
    body{
        background:red;
    }
}

/* 浏览器支持flex 且 页面宽度大于 900px 的时候执行包裹的css  */
@supports (display: flex) {
  @media screen and (min-width: 900px) {
    article {
      display: flex;
    }
  }
}
```

## 一些链接
@media说明
> https://developer.mozilla.org/en-US/docs/Web/CSS/@media

@media示例
> https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

设备分辨率查询网址
> http://viewportsizes.mattstow.com/
