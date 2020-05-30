---
layout: navcat
title: navicat 恢复数据后部分表丢失
date: 2020-05-31 00:43:29
tags:
---
#### 发现问题
使用 navicat 恢复备份后发现部分表丢失
查看错误日志发现 创建表失败
```
[Err] 1067 - Invalid default value for '*******'
[Err] Failed to create Table: *******
```

#### 解决方案
搜索之后发现是因为升级到 mysql 5.7 之后默认值不兼容的问题。
解决办法就是修改 sql_mode

#### 解决
windows 环境下进入到 mysql 的 bin 目录下
shift加鼠标右键 选择在此处打开PowerShell 窗口

```
 .\mysql -hlocalhost -P3306 -uroot -p123123
```
> 注意这里在PowerShell下要使用 .\mysql 不是直接使用 mysql

输入 `show variables like 'sql_mode';` 查看当前的 sql_mode 设置

Variable_name | Value
-|-
sql_mode | ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |

如果结果中包含 `NO_ZERO_IN_DATE, NO_ZERO_DATE`
则需要修改

在命令行中执行 
```
set session sql_mode=‘ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION’;
```
这只是临时会话有效。需要修改配置文件。

尝试使用 
```
set sql_mode=‘ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION’;
```
也没有效果。

这里通过修改 配置文件 实现

· windows my.ini

· linux my.cnf

在配置文件[mysqld]中加上

> 注意要加在[mysqld]中
```
sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```
重启服务器，再次导入navicat备份，全部成功

#### 附 sql_mode常用值
 
name | desc
-|-
ONLY_FULL_GROUP_BY | 对于GROUP BY聚合操作，如果在SELECT中的列，没有在GROUP BY中出现，那么这个SQL是不合法的，因为列不在GROUP BY从句中
NO_AUTO_VALUE_ON_ZERO | 该值影响自增长列的插入。默认设置下，插入0或NULL代表生成下一个自增长值。如果用户希望插入的值为0，而该列又是自增长的，那么这个选项就有用了。
STRICT_TRANS_TABLES | 在该模式下，如果一个值不能插入到一个事务中，则中断当前的操作，对非事务表不做限制
NO_ZERO_IN_DATE | 在严格模式下，不允许日期和月份为零
NO_ZERO_DATE | 设置该值，mysql数据库不允许插入零日期，插入零日期会抛出错误而不是警告
ERROR_FOR_DIVISION_BY_ZERO | 在insert或update过程中，如果数据被零除，则产生错误而非警告。如果未给出该模式，那么数据被零除时Mysql返回NULL
NO_AUTO_CREATE_USER | 禁止GRANT创建密码为空的用户
NO_ENGINE_SUBSTITUTION | 如果需要的存储引擎被禁用或未编译，那么抛出错误。不设置此值时，用默认的存储引擎替代，并抛出一个异常
PIPES_AS_CONCAT | 将"&#124;&#124;"视为字符串的连接操作符而非或运算符，这和Oracle数据库是一样是，也和字符串的拼接函数Concat想类似
ANSI_QUOTES | 启用ANSI_QUOTES后，不能用双引号来引用字符串，因为它被解释为识别符