---
title: 使用Jenkins实现自动化部署
date: 2018-07-05 23:51:58
tags: Jenkins
---
系统环境为阿里云 CentOS 8.0

#### 下载安装


```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

yum install jenkins



```

#### Jenkins 依赖JAVA 如果没有需要安装

```bash
# 检查时否安装
java -version

# centOS 需要安装 openjdk 的java ,搜索可用的包
yum search openjdk

# 安装
yum install java-1.8.0-openjdk

```

#### 启动 Jenkins
```bash
sudo service jenkins start

# 守护程序
sudo chkconfig jenkins on

```

Jenkins 将启动在 8080 端口

#### Nginx 反向代理设置
```conf
server {
  listen 80;
  server_name example.com; # 这里配置域名
  access_log off;
  index index.html index.htm index.php;

  #error_page 404 /404.html;
  #error_page 502 /502.html;

  location /{
    proxy_pass  http://localhost:8080/;
    proxy_redirect      http://localhost:8080 $scheme://example.com;
    proxy_redirect off;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
  }
}

```

重启 nginx
```bash
service nginx restart
```
---
#### 问题
##### 反向代理设置有误

解决办法：

- 打开浏览器进入 Jenkins
- 系统管理 -> 系统设置 -> Jenkins URL
- 在域名后面加上 :8080

##### 不推荐使用 JNLP3-connect 协议
``` 
This Jenkins instance uses deprecated protocols: JNLP3-connect. It may impact stability of the instance. If newer protocol versions are supported by all system components (agents, CLI and other clients), it is highly recommended to disable the deprecated protocols. See Protocol Configuration.
```
意思是 Jenkins 不推荐使用 JNLP3-connect 协议，会影响实例的稳定性。如果所有系统组件（代理，CLI和其他客户端）都支持较新的协议版本，则强烈建议禁用已弃用的协议。

解决办法：

系统管理 -> 
全局安全配置 -> 
点击代理中的代理协议 -> 
取消 
`Java Web Start Agent Protocol/1` 
`Java Web Start Agent Protocol/2`
`Java Web Start Agent Protocol/3` 前面的勾  -> 
保存

![image](https://note.youdao.com/yws/public/resource/aafab269782ca7bc084c5c7518a8a61e/xmlnote/2AB3785390634998944FC2F9322C92EF/2383)

##### 执行 Shell 脚本权限不够的问题

有时部署时需要用到 Shell 命令，Jenkins是没有权限执行的。

解决办法：

- 修改Jenkins配置文件
```bash
vim /etc/sysconfig/jenkins
# 修改 $JENKINS_USER 为 root
$JENKINS_USER="root"
```
- 设置相关权限
```bash
chown -R root:root /var/lib/jenkins
chown -R root:root /var/cache/jenkins
chown -R root:root /var/log/jenkins
```

- 重启服务并检查权限
```bash
# 重启 jenkins 服务
service jenkins restart

# 检查权限
ps -ef | grep jenkins
```