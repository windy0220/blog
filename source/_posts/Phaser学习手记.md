---
title: Phaser学习手记
date: 2017-05-27 22:25:32
tags: phaser
---
## 实例化
```javascript
new Phaser.Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig);
```

例子：
```javascrpt
var game = new Phaser.Game(300, 400, Phaser.AUTO, container);
```

```javascript
width //游戏宽度
height //游戏高度
renderer //游戏渲染方式 Phaser.CANVAS/Phaser.WEBGL/Phaser.AUTO
parent//游戏的容器 DOM元素或ID
state //游戏默认场景
transparent //画布元素是否透明
antialias //是否开启抗锯齿
physicsConfig //物理引擎配置
```

## Game对象属性
暂停游戏
```
game.Paused = true
```

运行游戏
```
game.Paused = false
```

其他属性

```javascript
game.add; //是对游戏对象工厂的一个引用
game.camera; //是游戏中摄像机对象的引用
game.input; //是游戏中的用户交互事件对象的引用
game.load; //是游戏资源加载模块的引用
game.scale; //是游戏缩放模块的引用
game.sound; //是游戏声音模块的引用
game.stage; //是游戏舞台对象的引用
game.particles; //是游戏粒子系统的引用
game.physics; //是游戏物理系统的引用
game.state; //是游戏场景管理对象的引用
```

## State 场景

**创建场景对象 Phaser.State 的两种形式**

对象形式
```javascript
{
    init: function(){},
    preload: function(){},
    ....
}
```

函数形式
```javascript
function(){
    this.init = function(){},
    this.preload = funtion(){},
    ...
}
```
**preload, create, update, render 至少要存在一个**

```javascript
init(); //场景初始化代码
preload(); //加载游戏资源
create(); //创建游戏显示对象或注册时间等
update(); //游戏每一帧都会调用
render(); //游戏每一个渲染周期都会调用 默认一帧就是一个渲染周期
```



## Phaser.StateManager场景管理对象

```javascript
var game = new Phaser.Game();
game.state.add(name, state); //添加场景（场景名称，场景对象）
game.state.start(name); //运行启动场景
```

## Phaser.Loader 加载游戏资源

```
game.load.image(); //加载图片
game.load.spritesheet(); //加载图片集 需小图尺寸一致
game.load.atlas(); //加载图片集 大小不同 尺寸不一
game.load.audio(); //加载声音
game.load.audiosprite(); //加载声音集
game.load.text(); //加载文本文件
game.load.xml(); //加载XML文件
game.load.binary(); //加载二进制文件
```
**Loader事件**

单个资源加载完成事件
```javascript
game.load.onFileComlete.add(function(){ //单个资源加载成功后调用该事件
    var progress =game.load.progress;//使用game.load.progress 来获取所有资源的加载进度1表示1%
});
```

所有资源加载完成事件
```javascript
game.load.onLoadComplete.add(function(){
});
```
## Phaser.Stage舞台
```
var game = new Phaser.Game();
//使用game.stage来引用舞台对象
//改变舞台的背景颜色 十六进制颜色0xffffff 舞台默认黑色
game.stage.setBackgroundColor(backgroundColor);
```

## Phaser.World 世界
```
//设置世界边界的大小
game.world.setBounds(x, y, width, heigint);
```

## Phaser.Camera
```
game.camera.x = 100; //改变摄像机在X轴上的位置
game.camera.y = 100; //改变摄像机在Y轴上的位置
game.camera.focusOn(displayObject); //让摄像机定位到物体上
game.camera.focusOnxy(x, y); //让摄像机定位到x, y这个坐标上
game.camera.follow(target); //让摄像机跟随目标物体target

sprite.fixedToCamera = true;//精灵固定到摄像机
sprite.cameraOffset.setTo(200, 500);//相对于摄像机的偏移
```

## 游戏的缩放控制

```
//可以使用game.scale 来引用当前游戏的Phaser.ScaleManager对象
//之后可以使用 scaleMode 属性来改变缩放模式
game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
```

缩放模式
> EXACT_FIT 缩放到父元素的大小，可能会改变宽高比

> SHOW_ALL 保持宽高比缩放到父元素的大小 一般用这个

> USER_SCALE 自定义缩放 需要使用 game.scale.setUserScale(0.5, 0.5) 设定

缩放配置可以放到init方法中

**水平和垂直居中**
```
game.scale.pageAlignHorizontally = true; //水平居中
game.scale.pageAlignVertically = true; //垂直居中
```

## 文字

```
game.add.text(x, y, text, style, group);
```

style文字样式设置的3种方法
```
var text = game.add.text(0, 0, "Hello", Style); //添加文字时以对象的方式设置 可以直接设置或引用设置
Style ={
    font: "bold 24px Arial",
    fill: "#fff"
}

text.style.fill = "#fff"; //通过文字的styel对象设置

text.fill = "#fff"; //在文字对象上直接设置
```

文字样式属性
```
text.fill = '#fff'; //文字颜色
text.font = '微软雅黑'; //字体
text.fontSize = 60; //字号
text.fontWeight = 'normal';  //粗细 默认加粗
text.style.backgroundColor = '#0f0'; //背景颜色 必须通过style对象设置
text.stroke = '#f00'; //描边颜色
text.strokeThickness = 10; //描边宽度
text.wordWrap = true; //自动换行
text.wordWrapWidth = 150; //超过设定宽度 自动换行 wordWrap必须为true
```

## 特殊字体

3种特殊字体
```
webFont //类似于css的用法 需要先激活（建立一个dom容器 设定该容器的字体为webFont即可激活），因为加载字体需要一定的时间，使用Phaser 时可用setTimeout延迟加载。

BitmapText //图片文字 一般用这个

RetroFont //同BitmapText
```

> **BitmapText 文字制作工具**

- BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
- Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
- **Littera (Web-based, free): http://kvazars.com/littera/**

> Littera的使用

1. 先点击左侧的FONT Select Font 选择一个本地字体进行上传
2. 在上方Included glyphs 输入框中输入需要的所有文字
3. 使用 Fill Stroke 等进行样式的编辑
4. 在上方导出栏里设置导出格式为XML（默认）点击Export导出

> BitmapText 的使用

preload方法中
```
game.load.bitmapFont('font', 'asset/font.png', 'asset/font.fnt'); //'定义资源名称', '文字图片路径', '文字图片配置文件'
```
create方法中
```
var text = game.add.bitmapText(0, 0, 'font', 'Hello', 30);//x坐标, y坐标, 资源名称, 文字内容, 文字大小
```

## 组
 
Phaser.world 是最顶层的组

> 创建组

```
var group = game.add.group();
```

> 给组添加子元素的几种方法

- 创建图片或精灵时指定组
- group.add(key) 方法直接添加 (资源名称)
- group.create(x, y, 'key', frame?, exists?) 方法创建子元素并添加进组 (x坐标, y坐标, 资源名称, 帧, 是否显示)

> 组的操作

```
group.alpha = 0.5; //透明度
group.x = 100; //x坐标
group.scale.set(0.5); //缩放
...
```

## 动画

- Phaser.Tween 补间动画
- Phaser.Animation 逐帧动画

#### 补间动画

> 创建补间动画

```
var tween = game.add.tween(boject);
tween.to(propertis, duration, ease, autoStart, delay, repeat, yoyo);//当前过渡到指定
tween.from(propertis, duration, ease, autoStart, delay, repeat, yoyo);//指定过渡到当前

propertis //状态属性集合 {x:300, y:200}

duration //持续时间 毫秒
ease //缓动函数 参照文档 docs/src_tween_TweenManager.js.html easeMap部分
autoStart //是否自动开始
delay //延迟
repeat //重复次数 -1无限次
yoyo //是否反向执行
```

> 补间动画操作方法

```
tween.start(); //开始
tween.stop(); //停止
tween.pause(); //暂停
tween.resume(); //恢复
```

> 使用方法 在create方法中

```
var phaser = game.add.image(0, 0, 'phaser');
var tween = game.add.tween(phaser);
tween.to({y:300}, 2000, Phaser.Easing.Bounce.Out, true, 0, 100, true);
tween.from({y:300}, 2000, Phaser.Easing.Bounce.Out, true, 0, 100, true);
```

#### 逐帧动画

需要使用game.load.spritesheet 加载雪碧精灵图片且每个精灵大小相同

```
var sprite = game.add.sprite();

//定义动画
sprite.animations.add(name, frames);

//播放动画
sprite.animations.play(name, frameRate, loop, killOnComplete);

//停止动画
sprite.animations.stop(name);
```

```
//preload方法中
game.load.spritesheet('man', 'asset/man.png', 136, 152); //('key', '资源路径', 每帧宽度, 每帧高度)

//create方法中
var man = game.add.sprite(0, 0, 'man');

man.animations.add('run', [26,27,28,29,30]);//('定义动画名称', 动画所需的帧)

man.animations.play('run', 60, true);//('要播放的动画名称', 每秒帧数, 是否循环)

```

## Atlas 

Atlas每一帧大小可以不固定

使用 http://renderhjs.net/shoebox/ 将图片拖到程序的Sprite Sheet上，生成XML格式的文件

```
//preload方法中
game.load.atlasXML('man', 'asset/atlas.png', 'asset/atlas.xml');// (key, 图片资源地址, xml文件地址)

//create方法同spritesheet动画 其中帧可以使用xml中帧的name值


```

## 粒子系统

> 粒子发射器的创建

```
var emitter = game.add.emitter(x?, y?, maxParticles?); //(x坐标, y坐标, 粒子在屏幕上显示的最大数量)
```

> 创建粒子

```
emitter.makeParticles(keys, frames?, quantity?, collide?, collideWorldBounds?);//(名称, 帧数, 要产生多少粒子, 粒子之间/粒子跟边界是否碰撞)
```

> 实例

```
//preload
game.load.image('bubble', 'asset/bubble.png');

//create
//粒子发射器的创建
var emitter = game.add.emitter(game.width/2, game.height/2, 50);//(x坐标, y坐标, 粒子在屏幕上显示的最大数量)

//创建粒子
emitter.makeParticles('bubble', [0,1,2,3,4,5,6,7], 1000, true, true);//(名称, 可用帧（随机调用）, 要产生多少粒子, 粒子之间/粒子跟边界是否碰撞)

//粒子的控制
emitter.setXSpeed(500, 1000);//X轴控制速度(min?, max?) 负值先左正值向右
emitter.setXSpeed(500, 1000);//Y轴控制速度(min?, max?)
emitter.setScale(0, 1, 0, 1, 3000);//缩放 (minX?, maxX?, minY?, maxY?, rate?) rate：最小值过渡到最大值的时间
emitter.setAlpha(0, 1, 3000);//透明度 (min?, max?, rate?, ease?)
emitter.setRotation(100, 200); //角速度,自身旋转的速度 (min?, max?)

//物理引擎
emitter.gravity = 600; //重力
emitter.bounce.y = 0.8; //弹跳

//发射粒子
emitter.start(false, 3000, 1000, 50);//(是否一次发射所有粒子如为false则一次发射一个, 粒子生存时间, 多久发射一次, 有多少粒子需要发射默认50 )

//发射粒子方法2 可无限发射
emitter.flow(3000, 1000, 10, -1); //(粒子生存周期0为永远不会消失, 多久发射一次, 每一次发射多少粒子, 总共有多少粒子可以发射-1位无限)

//update
game.physice.arcade.collide(emitter); //每一帧进行碰撞检测

```

## Tiled 瓦片地图

> 制作工具 http://www.mapeditor.org/

- 添加瓦片图集
- 新建图层 设置图块大小
- 构建地图 可使用图章和油漆桶工具，填充错误可使用橡皮擦工具，按ctrl可连续选中图集
- 导出地图 选择json

## 使用tiled 瓦片地图
```
//preload
game.load.tilemap('mario_map', 'asset/tilemap/mario.json', null, Phaser.Tilemap.TILED_JSON);//(资源名称, 资源json地址, null, 格式)
game.load.image('mario', 'asset/tilemap/mario.png');//加载瓦片图片集合

//create
var map = game.add.tilemap('mario_map'); //(资源名称) 创建瓦片地图

map.addTilesetImage('super_mario', 'mario'); //添加瓦片地图集合(Tiled软件中瓦片集合名称, 瓦片集合图片资源名称)
 
var layer = map.createLayer('world'); //创建层 (Tiled软件中层的名字)
```
> 动态修改瓦片地图

```
//create
//注意，所有参数已瓦片为单位不是像素，从0开始
//获取指定位置上的瓦片 
var tile = map.getTile(0, 24);
//在指定位置设置指定的瓦片
map.putTile(tile, 0, 0);
//在指定区域填充指定的瓦片 （瓦片集合索引，开始位置x,y, 结束位置x,y）
map.fill(12, 0, 0, 20, 20);

//瓦片的复制与粘贴
var tiles = map.copy(0, 19, 5, 5);
map.paste(0, 0, tiles);

//在指定区域内用一种瓦片替换另一种瓦片 前两个参数为集合索引，后四个为矩形区域，不指定区域替换所有
map.replace(1, 12, 0, 0, 10, 10);
```

> 瓦片地图碰撞检测

```
tilemap.setCollision(indexes, collides?, layer?); //(可以是一个数组瓦片集合索引, 是否进行碰撞检测, 在哪个层进行碰撞检测)

tilemap.setCollisionBetween(start, stop, collides?, layer?);//(瓦片集合索引开始, 瓦片集合索引结束, 是否进行碰撞检测, 在哪个层进行碰撞检测)
```
实例

```
//create
//设置需要碰撞的瓦片
map.setCollisionBetween(15,16);
map.setCollisionBetween(20,25);

map.setCollision(40);

//设置要碰撞的瓦片从1开始
map.setCollision([20,21,26,27,15,23,38, 39,40]);
//排除要碰撞的瓦片
map.setCollisionByExclusion([7, 32, 35, 36, 47]);
//针对gameLayer这个层进行碰撞检测，即别的层不受影响
map.setCollisionBetween(1, 40, true, gameLayer);

//启用物理引擎
game.physics.startSystem(Phaser.physics.ARCADE);

//update
game.physics.arcade.collide(player, layer);//碰撞检测
//角色与地图图层接触后该方法返回true
player.body.onFloor()

```

## 事件系统Phaser.Signal

> Signal对象的创建

```
var signal = new Phaser.Signal();

//添加事件监听器
signal.add(listener, listenerContext?, priority?, args?, args?, args?....);//(函数, 函数上下文, 优先度, 参数可以有多个)

//添加事件监听器 只执行一次
signal.addOnce(listener, listenerContext?, priority?, args?, args?, args?....);

//移除单个事件监听器
signal.remove(listener);

//移除该signal对象上的所有事件监听器
signal.removeAll();

//向所有该signal对象上的监听器分发事件
signal.dispatch(params?);

//注销signal对象 注销后不会再分发事件 相应内存也会被释放
signal.dispose();
```

> 一些重要的系统事件

```
var game = new Phaser.Game();

//onBlur, onFocus, onPause, onResume 都是game对象的一个属性，但代表的都是一个signal对象
game.onBlur //游戏失去焦点
game.onFocus //游戏获得焦点
game.onPause //游戏暂停事件
game.onResume //游戏恢复事件

//给onPause添加一个事件监听器
game.onPause.add(function(){
    alert('游戏已暂停');
})

//scale对象
game.scale.onFullScreenChange //当进入或退出全屏时
game.scale.onOrientationChange //当设备横竖屏切换时
game.scale.onSizeChange //当游戏尺寸改变时

//资源加载中的一些事件
game.load.onFileComplete //当一个文件加载完成时
game.load.onFileError //当一个文件加载失败时
game.load.onFileStart //当一个文件开始加载时
game.load.onLoadComplete //当所有资源加载完成时

//补间动画中的一些事件
tween.onStart
tween.onComplete
tween.onLoop
tween.onRepeat

//关键帧动画事件
animation.onStart
animation.onComplete
animation.onLoop
animation.onUpdate //动画帧变化时
```

## 用户交互管理对象 Phaser.Input

```
var game = new Phaser.Game();

//使用游戏实例对象的input属性来引用当前的用户交互管理对象
game.input // => new Phaser.Input(game)
```

> 基本属性和方法

```
game.input.onDown //按下事件
game.input.onUp //离开事件
game.input.onTap //轻击事件
game.input.onHold //长按事件

//添加鼠标或手指移动事件侦听器
game.input.addMoveCallback(callback, context);


//删除鼠标或手指移动事件侦听器
game.input.deleteMoveCallback(callback, context);
```

> Pointer对象

代表一个指针对象，可以是鼠标，手指或其他输入设备。多点触摸会出现多个Pointer对象

```
var game = new Phaser.Game();

//获取最近一次激活的pointer对象
var pointer = game.input.activePointer;

pointer.clientX //指针事件发生时的x坐标
pointer.clientY //指针事件发生时的Y坐标

pointer.isDown //用来判断指针是否在按下状态
pointer.isUp //用来判断指针是否在释放状态
```

> 鼠标对象

```javascript
//获取鼠标对象
var mouse = game.input.mouse;

//获取为鼠标定制的Pointer对象
var mousePointer = game.input.mousePointer

//设置鼠标滚轮事件的回调函数
mouse.mouseWheelCallback
//鼠标滚轮的滚动方向，1为向上， -1为向下
mouse.wheelDelta

mousePointer.leftButton //鼠标左键对象
mousePointer.middleButton //鼠标中键对象
mousePointer.rightButton //鼠标右键对象
```

> 键盘对象

```javascript
var game = new Phaser.Game();
//获取键盘对象
var keyboard = game.input.keyboard;

//添加按键回调 所有按键
keyboard.addCallbacks(context, onDown, onUp, onPress)

//创建一个键对象
var key = keyboard.addKey(keycode) //=>返回Phaser.Key对象 keycode文档中查找
//创建一个包含上下左右方向键的对象
keyboard.createCursorKeys()

key.isDown //用来判断该键是否处于按下状态
key.isUp  //用来判断该键是否处于释放状态
key.onDown //键按下时的Signal对象
key.onUp  //键释放时的Signal对象

key.altKey //判断是否alt键也被同时按下
key.ctrlKey //判断是否ctrl键也被同时按下
key.shiftKey //判断是否shift键也被同时按下
```

> 实例 - 画笔

```javascript
this.create = function(){
    graphics = game.add.graphics(0, 0); //创建图形对象
    
    game.input.onDown.add(function(){//指针按下时
        graphics.beginFill(0xffffff);//设置填充样式
        draw();
        game.input.addMoveCallback(draw);//添加指针移动回调函数
    });
    
    game.input.onUp.add(function(){
    
        game.input.deleteMoveCallback(draw); //删除指针移动回调函数
    });
}

function draw(){
    var pointer = game.input.activePointer;
    graphics.drawCircle(pointer.x, pointer.y, 10); //绘制直径为10的圆
}
```

> 实例 - 键盘

```javascript

var rightKey;

this.create = function(){
    //添加按键
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);//右方向键 其他常量 UP DOWN LEFT
}

this.update = function(){
    if(upKey.isDown){
        sprite.y--;
    }else if(otherKey.isDown){
    otherCode;
    }
}

```

## 特定游戏对象的交互事件处理 Phaser.Events

input的为全局 events为特定对象

```
var game = new Phaser.Game();
var sprite = game.add.sprite();
sprite.inputEnabled = true; //开启输入事件
//获取该游戏对象的Phaser.Events对象
var events = sprite.events;

events.onInputDown; //当指针在该对象上按下时的事件（signal）
events.onInputUp; //当指针在该对象上释放时的事件（signal）
events.onInputOver; //当指针进入该对象时的事件（signal）
events.onInputOut; //当指针离开该对象时的事件（signal）

```

> Phaser.InputHandler对象 拖动对象

```
var game = new Phaser.Game();
var sprite = game.add.sprite();
sprite.inputEnabled = true; //开启输入事件
//获取该游戏对象的Phaser.InputHandler对象
var InputHandler = sprite.input;

inputHandler.enableDrag() //使对象能拖动
inputHandler.disableDrag() //禁用拖动

inputHandler.pointerOver() //判断指针是否在该对象之内
inputHandler.pointerOut() //判断指针是否在该对象之外
inputHandler.pointerX() //当指针在该对象之内时相对于该对象的X坐标
inputHandler.pointerY() //当指针在该对象之内时相对于该对象的y坐标

//当设置该值为true时,
//在单击或拖动该对象时它会自动位于显示列表的最上方
inputHandler.bringToTop
```

## 音频处理 Phaser.SoundManager

```
var game = new Phaser.Game();

var soundManager = game.sound; //获取SoundManager对象

//game.add.audio()方法返回的就是一个Phaser.Sound对象
var sound = game.add.audio(key, volume?, loop?); //(资源名称, 音量大小0~1, 是否循环)
```

> 音频资源的加载

```
game.load.audio(key, urls, autoDecode?); //(资源名称, 资源地址, 是否自动解码(true));

game.load.audio('foo', 'foo.mp3'); //字符串形式

game.load.audio('foo', ['foo.ogg', 'foo.wav', 'foo.mp3']); //数组形式
```

> audio sprite

```
game.load.sudiosprite(key, urls, jsonURL?, jsonDate?, autoDecode?);// jsonUrl,jsonDate 二选一

```
audio sprite 数据生成工具
https://github.com/tonistiigi/audiosprite

```audiosprite --autoplay bg_loop --output mygameaudio bg_loop.wav *.mp3```

> 实例

```
\\preload

\\单一音频
game.load.audio('sound1', 'asset/audio/1.mp3');

\\音频sprite
game.load.audiosprite('audiosprite', [
    'asset/audio/maudiosprite.ogg',
    'asset/audio/maudiosprite.m4a',
    'asset/audio/maudiosprite.mp3',
    'asset/audio/maudiosprite.ac3'],
    'asset/audio/maudiosprite.json',);

\\create
var sound = game.add.audio('sound1');
var audiosprite = game.add.audioSprite('audiosprite');
```

## 音频资源的使用和管理

> 播放控制

```
sound.play(marker?, position?, volume?, loop?, forceRestart?);
//marker 标注名称
//position 播放位置
//volume 音量 0~1
//loop 是否循环
//forceRestart 是否强制重新开始

sound.pause(); //暂停播放
sound.resume(); //恢复播放
sound.stop(); //停止播放

```

> 分段标注

```
//标注声音
sound.addMarker(name, start, duration, volume?, loop?);
//name 资源名称
//start 开始时间 秒
//duration 持续时间 秒
//volume 音量大小
//loop 循环

sound.play(name); //播放标注的声音

sound.removeMarker(name); //移除标注
```

> 声音的淡入淡出

```
//淡入
sound.fadeIn(duration?, loop?, marker?);
//duration 持续时间 毫秒
//替代sound.play

//淡出
sound.fadeOut(duration?); 
//自定义
sound.fadeTo(duration?, volume?);
volume 过渡到的音量
```

> 声音事件相关的Signal对象

```
sound.onPlay
sound.onPause
sound.onResume
sound.onStop
sound.onFadeComplete //淡入淡出完成时
sound.onMarkerComplete //某一段标注的声音播放完成时
sound.onLoop 
sound.onMute //静音时
```
ex
```
sound.onPlay.add(function(){
    alert('Play');
})
```

## 物理引擎

> 开启物理引擎

```
\\Phaser默认使用ARCADE物理引擎，所以可以不写下面这句
game.physics.startSystem(Phaser.Physics.ARCADE);
```

> 在游戏精灵上启用物理引擎

```
game.physics.enable(sprite, Phaser.Physics.ARCADE);
```

> 在组中启用物理引起

为组中的没一个子元素启用物理引擎

```
group.enableBody = true;

//指定物理引擎
group.physicsBodyType = Phaser.Physics.AARCADE;
```

> 精灵的body对象

当精灵启用物理引擎后，就会拥有一个body属性，物理属性都是附加在精灵的body对象上的。
```
sprite.body;
```

> body属性

速度
```
sprite.body.velocity = new Phaser.Point(100, 100); //(x, y) x为横向运动，正值向右，负值向左

//OR
sprite.body.velocity.set(100); //(x,y)如果只传一个参数，说明x和y都是这个值

//OR
sprite.body.velocity.x = 100;
sprite.body.velocity.y = 100;
```
加速度
```
sprite.body.acceleration = new Phaser.Point(100, 100); 

//OR
sprite.body.acceleration.set(100); 

//OR
sprite.body.acceleration.x = 100;
sprite.body.acceleration.y = 100;
```

角速度和角速度的加速度
```
sprite.body.angularVelocity = 90; //正数顺时针旋转，负数为逆时针旋转 单位：度/秒

sprite.body.angularAcceleration = 45;
```

阻力
```
sprite.body.drap = new Phaser.Point(100, 100); 

//OR
sprite.body.drap.set(100); 

//OR
sprite.body.drap.x = 100;
sprite.body.drap.y = 100;

```

重力
```
sprite.body.gravity = new Phaser.Point(100, 100); 

//OR
sprite.body.gravity.set(100); 

//OR
sprite.body.gravity.x = 100;
sprite.body.gravity.y = 100;
```

弹跳 0~1
```
sprite.body.bounce = new Phaser.Point(0.5, 0.5); 

//OR
sprite.body.bounce.set(0.5); 

//OR
sprite.body.bounce.x = 0.5;
sprite.body.bounce.y = 0.5;

```

OTHER
```
sprite.body.friction.set(100); //设置与其他物体接触时的摩擦力
sprite.body.rotation = Math.PI; //设置角度
sprite.body.immovable = true; //设置该物体是否时固定的
sprite.body.mass = 10; //设置物体的相对质量, 默认为1
sprite.body.maxVelocity.set(100, 200); //设置最大速度
sprite.maxAngular = 1000; //设置最大角速度

sprite.body.setSize(width, height, offsetX, offsetY); //设置body范围大小
sprite.body.reset(x, y);//重置所有物理属性

```

#### Arcade引擎提供的一些静态方法
以指定的速度运动到目的地(返回到目的地的角度)

```
game.physics.arcade.moveToXY(sprite, x, y, speed);
game.physics.arcade.moveToObject(sprite, destination, speed);
game.physics.arcade.moveToPointer(sprite, speed, potinter);
```

以指定的加速度运动到目的地

```
game.physics.arcade.accelerateToXY(sprite, x, y, speed);
game.physics.arcade.accelerateToObject(sprite, destination, speed);
game.physics.arcade.accelerateToPointer(sprite, speed, potinter);
```

一些工具
```
//计算角度
game.physics.arcade.angleBetween(source, target);
game.physics.arcade.angleToPointer(displayObject, pointer);
game.physics.arcade.angleToXY(displayObject, x, y);

//计算距离
game.physics.arcade.distanceBetween(source, target);
game.physics.arcade.distanceToPointer(displayObject, pointer);
//计算速度
game.physics.arcade.
```

## 碰撞检测

overlap方法 只是检测不产生物理效果 需使用在update方法中
```
game.physics.arcade.overlap(sprite1, sprite2, function(){console.log('It is overlap!')});
```
collide方法 产生物理效果 需使用在update方法中，对象可以是精灵或组
```
game.physics.arcade.collide(sprite1, sprite2, function(){console.log('It is collide!')});

game.physics.arcade.collide(sprite, group);

game.physics.arcade.collide(group); //组内碰撞检测
```
与游戏边界进行碰撞检测
```
sprite.body.collideWorldBounds = true;
```

## debug
显示FPS
```
//preload
game.time.advancedTiming = true;

//render
game.debug.text(game.time.fps, 32, 320, "#00ff00");  
```

