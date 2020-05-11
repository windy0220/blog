---
title: 常用linux命令
date: 2020-04-22 23:07:07
tags: [linux, command, 常用, 命令]
---
#### tar压缩 解压缩
```bash
# 压缩
tar czvf filename.tar dirname

# 解压缩
tar zxvf filename.tar
```

#### 指定用户或组 将目前目录下的所有文件与子目录的拥有者皆设为 www，群体的使用者 www:
```bash
chown -R www.www *
```

#### iptables
```
# 查看 iptables
iptables -nvL

# 添加规则 这里添加了一个 3306 端口
iptables -I INPUT 4 -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT

# 保存
service iptables save
```

#### mysql数据库
```bash
# 登录数据库
mysql -uroot -p

# 创建一个用户
create user username@'%' identified by 'password';

# 授权
grant all privileges on *.* to windy_db@'%' with grant option;
#  *.* 为所有权限， 也可以指定库和表 dbname.tablename
#  grant all privileges 为授权所有操作，也可单独指定  grant select,insert,update,delete,create,drop
```