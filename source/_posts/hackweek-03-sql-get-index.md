---
title: 2017 HackWeek 记录 03 - SQL 获取某一条记录的索引序号
date: 2017-12-20 13:07:46
tags:
  - 2017 HackWeek
  - 比赛
  - SQL
category: 比赛记录
---

我们组的项目中的一个API涉及到个人排名信息展示，当时在和其他的开发人员讨论时确定了两种方法：
1. 先采用
```sql
SELECT * FROM `user` ORDER BY `percentage` desc
```
查询按照分数将序排列的dict，再由Python封装成json传回给前端，前端遍历一遍数组中所有元素，用条件语句筛选当前用户所在的index，再将index加上1，得到用户当前的排名；
2. 先采用
```sql
SELECT * FROM `user` ORDER BY `percentage` desc
```
得到一个排列后的记录，再从中寻找指定条件的记录，获取这个记录所在的index，直接将数值传回给前端。

经过我们数次实际的数据库查询实验，发现第一种方案在数据量达到一定数量时会严重拖慢前端渲染的速度，而第二种方案很难通过SQL查询的方式直接返回一个数值。这两个方案都有缺陷，一度使我们很尴尬。

后来，通过询问学长，我们在网上查阅资料时偶然发现了一个和我们的需求十分相似的SQL语句：

[![/images/17121603.png](/images/17121603.png "/images/17121603.png")](/images/17121603.png "/images/17121603.png")

这引起了我们的兴趣，于是我们很快照着这篇文章的模板写出了我们自己的代码：

```python
def chaxunmingci(self):
        conn = get_conn()
        cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
        sql="select rank from (select userid,(@rank:=@rank+1)as rank from user,(select(@rank :=0))temp order by percentage desc)userid where userid=%s"
        cursor.execute(sql,(self.userid))
        rows=cursor.fetchall()
        for row in rows:
            conn.commit()
            cursor.close()
            conn.close()
            return row['rank']
```

然后我们使用这段代码查询数据库，结果返回正确的值。

冷静下来分析这个语句，渐渐搞明白了这个神奇的语句的原理：

- `@`实质上是MySQL的一个用户变量(`@@`表示系统变量)；

- `:=`实质上是MySQL的变量赋值的操作，`SET`时可以不带`:`，但是`SELECT`时必须带上`:`；

- `@rank:=@rank+1`相当于自增循环赋值，其作用应该是给查询到的每条排好序的记录加上一个临时的flag，用于存放index

- 一开始的`SELECT rank FROM`应该是读取这个`rank`的值，因为在语句的最后添加了限定条件`WHERE userid=`，说明是选取特定用户ID的rank，通过这些步骤就能获取到特定用户的排名信息。

P.S. 由于我学习MySQL的时间并不长，所以只会基本的CURD操作。经过这次的项目开发实战，我领略到了SQL的神奇，很多奇技淫巧还有待发掘。
