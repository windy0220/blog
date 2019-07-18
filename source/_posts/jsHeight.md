---
title: js各种高度的获取
date: 2019-07-18 17:02:32
tags: [offsetTop, pageYOffset, clientHeight, getBoundingClientRect]

---
js各种高度的获取
<!-- more -->
![js各种高度示意图](/images/jsHeight.jpg)

#### 距离父元素顶部的距离
```javascript
// js
ele.offsetTop;

// jq
$('ele').offset().top;
```

#### 网页被卷起来的高度
```javascript
// js
document.documentElement.scrollTop || document.body.scrollTop
window.pageYOffset

// jq
$(window).scrollTop()
```

#### 元素的高度/宽度
```javascript
// js
document.querySelector('.eleClass').clientHeight;

// jq
$('.eleClass').height();
```

#### 窗口的高度
```javascript
//js
window.innerHeight || document.documentElement.clientHeight

```

#### getBoundingClientRect
```javascript
//元素顶部距窗口顶部的距离
element.getBoundingClientRect().top 

//元素底部部距窗口顶部的距离
element.getBoundingClientRect().bottom 

```