---
title: 使用码云的WebHooks实现网站的自动部署
date: 2017-07-17 15:07:57
tags: [git, webhooks] 
banner: /images/20170717.jpg
thumbnail: /images/20170717.jpg
---
码云上提供了一个WebHooks功能，原理就是在本地push的时候码云的WebHooks会向远程服务器进行post请求，这个post还可以带上一个密码，防止被恶意post。

另外WebHooks还支持push, tag push, lssue 等共5种触发方式。

我想实现的是本地 tag push之后 服务器的本地仓库执行pull操作，从而实现网站的自动部署。使用tag push的原因是我并不想每次push都进行部署。

下面就一步一步来实现这个过程。

<!-- more -->

1. 首先在码云上创建一个项目，项目中只放 README.md，因为我们只是先实验下这样就够了。

2. 将这个项目clone到本地及服务器

3. 在服务器端创建一个pull.php文件，放到一个可以访问的网站目录，方便WebHooks进行post操作。php这里我们使用了shell_exec方法。在访问到该php文件后会执行pull.sh脚本。

shell_exec 默认是关闭的，要从php.ini中开启
```bash
vim /usr/local/php/etc/php.ini
```
搜索disable_function 将其中的 exec 和 shell_exec 删除。

> 这里尽量使用绝对路径，我使用了PHP的shell_exec函数，当然还可以使用exec system等函数。

*pull.php*
```php
<?php
$output = shell_exec("/usr/bin/sudo /root/pull.sh");
echo $output;
?>

```

*pull.sh*

```bash
#!/bin/sh
cd /data/wwwroot/bigma.cc #进入到需要git pull的网站目录
git pull #执行pull命令
```

创建两个脚本后，要对脚本执行 ```chmod +x filename``` 为其添加执行的权限。

4. 配置git公钥，公钥可以让你在服务器的本地仓库执行git pull的时候不需要输入密码。具体如何配置请参考。

5. 为服务器端的PHP添加执行shell脚本的权限
```bash
vi /etc/sudoers
#注释掉下面一行
#Defaults    requiretty

#末尾加入 www为http 用户 此处也可指定某个脚本无需密码
www ALL=(ALL) NOPASSWD: ALL

```

6. 使用 ```su www``` 切换到 www 用户执行 ```php pull.php``` 测试能否成功执行脚本，执行成功将返回 git pull的回馈信息。

7. 在码云的 WebHooks 中填入 pull.php 的url。本地执行git pull 看看网站目录是否自动更新了。

至此，使用 WebHooks 自动部署网站已配置完成。之后可以为pull.php加上密码验证提升安全性。
