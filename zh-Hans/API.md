# API

|环境|API 地址|
|---|--------|
|开发环境|http://localhost:5757/v1|
|生产环境|https://hitmers-api.solotime.xyz/v1|

采用 [JWT token](https://github.com/auth0/node-jsonwebtoken) 授权机制。

以下所有示例的初始化数据见 GitHub 上的 [seed 文件](https://github.com/upupming/HITMers-node-js-server/tree/dev/src/db/seeds)。

## 注册

由于软件只在特定人群中使用，目前仅支持注册码注册。

格式：`POST /v1/register`

**示例 1：**

请求 Body:

```json
{
	"user" : {
	  "id": "MsShi",
	  "name": "史老师",
	  "identify": "老师",
	  "phone_number": 120,
	  "language": "中英",
	  "session": 14,
	  "email": "shilaoshi@qq.com",
	  "school": "经管学院",
	  "password": "1456"
	},
	"registerCode": "sampleRegisterCode"
}
```

返回：200 OK

```json
The user has been added successfully.
```

?> 如果试图注册的 id 在数据库中已经存在，将返回 409 Conflict。

## 登录

验证用户信息，生成 token 用于之后的验证。

格式：`POST /v1/login`

参数只要能够唯一性即可，如果 `id` 一样还可增加其他信息作为筛选。

|参数|类型|是否必选|描述|
|---------|----|-------|----|
|user_id|string|否|用户唯一标识|
|id|string|是|学号/职工号|
|name|string|否|姓名|
|phone_number|string|否|电话号码|
|language|string|否|语种|
|session|number|否|届数|
|password|string|是|密码|

**示例 1：**

请求 Body:

```json
{id: 'no_such_id'}
```

返回：404 NOT FOUND

```json
{"auth":false,"token":null}
```

**示例 2：**

请求 Body:

```json
{id: 'Z003', password: 'worng-password'}
```

返回：401 Unauthorized

```json
{"auth":false,"token":null}
```

**示例 3：**

请求 Body:

```json
{id: 'Z003', password: '13849045786'}
```

返回：200 OK

```json
{
    "auth":true,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM1OTYyNDI5fQ.PN0WiiWeNGhd-FzJZErxh-RjAmp-2r9jTOoL7_g6Nho",
    "user":
        {"user_id":1,"id":"Z003","name":"张三","identify":"老师","phone_number":13849045786,"language":"中英","session":14,"email":"zhangsan@qq.com","school":"经管学院","password_changed_times":0,"reputation":0}
}
```

?> 用户密码采用 [bcrypt](https://github.com/dcodeIO/bcrypt.js) 哈希之后存储，即使在极端情况下数据库泄露，用户也不必担心密码泄露。加密算法参见[维基百科](https://en.wikipedia.org/wiki/Bcrypt)。

?> 后续所有请求如无特殊说明均需要在 header 中设置 `x-access-token` 字段为这里的得到的 `token`，否则将返回 401 Unauthorized。

## 用户信息

### GET

获取用户信息。

格式：

`GET /v1/user/all`

`GET /v1/user/:id`

**示例 1：**

`GET /v1/user/all`

返回： 200 OK

```json
[
    {"id":"Z003","name":"张三","identify":"老师","phone_number":13849045786,"language":"中英","session":14,"email":"zhangsan@qq.com","school":"经管学院","password_changed_times":0,"reputation":0},
    {"id":"L004","name":"李四","identify":"讲解员","phone_number":13848888786,"language":"韩文","session":13,"email":"lisi@163.com","school":"人文","password_changed_times":0,"reputation":0},
    {"id":"W005","name":"王五","identify":"馆藏人员","phone_number":10009045786,"language":"俄文","session":15,"email":"wangwu@qq.com","school":"计算机学院","password_changed_times":0,"reputation":0},
    {"id":"Z006","name":"赵六","identify":"讲解员","phone_number":13877745786,"language":"日文","session":16,"email":"zhaoliu@gmail.com","school":"材料学院","password_changed_times":0,"reputation":0}
]
```

`GET /v1/user/L004`

返回： 200 OK

```json
{"id":"L004","name":"李四","identify":"讲解员","phone_number":13848888786,"language":"韩文","session":13,"email":"lisi@163.com","school":"人文","password_changed_times":0,"reputation":0}
```

**示例 2：**

`GET /v1/user/L004`

返回：200 OK

```json
{"id":"L004","name":"李四","identify":"讲解员","phone_number":13848888786,"language":"韩文","session":13,"email":"lisi@163.com","school":"人文","password_changed_times":0,"reputation":0}
```

?> 只有 `identify` 为`老师`、`队长`的用户才有权限获取全部用户信息。也只有这些用户能够用自己的 `token` 获取其它用户的信息。否则将返回 403 Forbidden。


### POST

新增用户。

格式：`POST /v1/user`

**示例：**

请求 Body:

```json
[
    {"id":"moon5","name":"Moon Star","identify":"讲解员","phone_number":17766458988,"language":"中文","session":14,"email":"cs65@may.xyz","school":"人文学院"},
    {"id":"newton2","name":"Newton","identify":"馆藏人员","phone_number":18866458988,"language":"中英","session":16,"email":"cs6521@may.xyz","school":"外国语学院"}
]
```

返回：200 OK

```
Users have been added successfully.
```

?> 如果想要新增的用户中有已经存在于数据库中的，将拒绝整个请求并返回 409 Conflict。对于已存在用户，如需修改用户信息请使用 `PUT`。

### DELETE

删除用户。

格式：`DELETE /v1/user`

同样针对每个需要删除的用户，提供能唯一区分用户的极小信息量即可。

**示例：**

请求 Body:

```json
[
  {"id": "moon5"},
  {"id": "newton2"}
]
```

返回：200 OK

```
Users have been deleted successfully.
```

### PUT

更新用户信息，返回更新后的用户信息。

格式：

`PUT /v1/user`
`PUT /v1/user/:id`

**示例 1：**

`PUT /v1/user`

请求 Body:

```json
[{"id":"W00995","school":"美术学院","password":"so-easy-to-crack"},{"id":"Z006","reputation":"90","password":"easy-to-crack-too"}]
// or
[{"id":"W005","school":"美术学院","password":"so-easy-to-crack"},{"id":"Z006","reputation":"90","password":"easy-to-crack-too"}]
```

返回：200 OK

```json
[
    {"id":"Z006","name":"赵六","identify":"讲解员","phone_number":13877745786,"language":"日文","session":16,"email":"zhaoliu@gmail.com","school":"材料学院","password_changed_times":0,"reputation":90}
]
// or
[
    {"id":"W005","name":"王五","identify":"馆藏人员","phone_number":10009045786,"language":"俄文","session":15,"email":"wangwu@qq.com","school":"美术学院","password_changed_times":0,"reputation":0},
    {"id":"Z006","name":"赵六","identify":"讲解员","phone_number":13877745786,"language":"日文","session":16,"email":"zhaoliu@gmail.com","school":"材料学院","password_changed_times":0,"reputation":90}
]
```


**示例 2：**

`PUT /v1/user/W005`

请求 Body:

```json
{"id":"WangWuNewID","reputation":"19000","password":"easy-to-crack-too"}
```

返回：200 OK

```json
{"id":"WangWuNewID","name":"王五","identify":"馆藏人员","phone_number":10009045786,"language":"俄文","session":15,"email":"wangwu@qq.com","school":"计算机学院","password_changed_times":0,"reputation":19000}
```

?> 在示例 1 中第一个请求的数组中有的用户查询不到，将直接忽略并不返回任何错误信息。如需新增用户请使用 `POST`。

?> 在示例 2 中修改了用户 id，对应的用户需要再次获取 token，因为服务端以 token 解密之后的 id 判断用户是否具有访问权限。

?> 如果试图修改的 id 在数据库中已经存在，将返回 409 Conflict。

## 签到

### GET

格式：`GET /v1/check/:id`

**示例 1：**

`POST /v1/check/Z003`

请求 Query: 空

返回：200 OK

```json
[
    {"check_id":1,"id":"Z003","name":"张三","date_time":"2018-09-03T06:21:59.000Z","check_in":0,"check_out":1,"morning":1,"afternoon":0},
    {"check_id":2,"id":"Z003","name":"张三","date_time":"2018-07-02T16:00:00.000Z","check_in":0,"check_out":1,"morning":0,"afternoon":1},
    {"check_id":3,"id":"Z003","name":"张三","date_time":"2018-08-02T16:00:00.000Z","check_in":0,"check_out":1,"morning":0,"afternoon":1},
    {"check_id":4,"id":"Z003","name":"张三","date_time":"2018-07-05T16:00:00.000Z","check_in":0,"check_out":1,"morning":0,"afternoon":1}
]
```

**示例 2：**

`POST /v1/check/Z003`

请求 Query: 

```
year: 2018
month: 7
```

返回：200 OK

```json
[
    {"check_id":2,"id":"Z003","name":"张三","date_time":"2018-07-02T16:00:00.000Z","check_in":0,"check_out":1,"morning":0,"afternoon":1},
    {"check_id":4,"id":"Z003","name":"张三","date_time":"2018-07-05T16:00:00.000Z","check_in":0,"check_out":1,"morning":0,"afternoon":1}
]
```

?> 如果获取其他用户的签到信息，将返回 403 Forbidden。


### POST

格式：`POST /v1/check`

**示例：**

`POST /v1/check`

请求 Body:

```json
{"id":"L004","in":true,"morning":true}
``` 

返回：200 OK

```json
{
    "id": "L004",
    "name": "李四",
    "date_time": "2018-09-02T02:53:01.392Z",
    "check_in": true,
    "check_out": false,
    "morning": true,
    "afternoon": false
}
```

?> 请注意 `date_time` 是 UTC 时间, 详见[这篇帖子](https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc)。 您可以使用 `new Date(Date.parse("2018-08-05T09:59:37.000Z"))` 得到一个 `Date` 对象。

?> 如果尝试为其他用户签到，将返回 403 Forbidden。

## 班次

### GET

格式：

`GET /v1/shift`

返回一个三维数组，分别索引**第几日**、**早晚班**、**全部值班人员**。如果返回的数据为 `data`，则 `data[0][0][0]` 表示查询日期中**第一天**的**上午**值班的**第一个人**，其中每个班次的人员是按照他们的**声誉**递减排序的。

`GET /v1/shift/:id`

按 `id` 获取用户的一段时间的值班信息。

**示例 1：**

`GET /v1/shift`

请求 Query:

```
year:2018
startMonth:9
startDay:2
endMonth:9
endDay:4
```

返回：200 OK

```json
[
    [[],[{"id":"Z006","name":"赵六","identify":"讲解员","phone_number":13877745786,"language":"日文","session":16,"email":"zhaoliu@gmail.com","school":"材料学院","password_changed_times":0,"reputation":0,"shift_id":106,"status":"working"}]],
    [[{"id":"L004","name":"李四","identify":"讲解员","phone_number":13848888786,"language":"韩文","session":13,"email":"lisi@163.com","school":"人文","password_changed_times":0,"reputation":0,"shift_id":107,"status":"working"},{"id":"Z003","name":"张三","identify":"老师","phone_number":13849045786,"language":"中英","session":14,"email":"zhangsan@qq.com","school":"经管学院","password_changed_times":0,"reputation":0,"shift_id":111,"status":"working"}],[]],
    [[],[{"id":"Z006","name":"赵六","identify":"讲解员","phone_number":13877745786,"language":"日文","session":16,"email":"zhaoliu@gmail.com","school":"材料学院","password_changed_times":0,"reputation":0,"shift_id":108,"status":"working"}]]
]
```

**示例 2：**

`GET /v1/shift/Z003`

请求 Query:

```
year:2018
startMonth:9
startDay:2
endMonth:9
endDay:4
```

返回：200 OK

```json
[{"shift_id":111,"id":"Z003","name":"张三","year":"2018","month":9,"day":3,"morning":1,"afternoon":0,"status":"working"}]
```

?> 如果尝试查询其他用户一段时间的值班信息，将返回 403 Forbidden。

### POST

格式：`POST /v1/shift`

**示例：**

`POST /v1/shift`

请求 Body:

```json
{"id":"Z003","year":2018,"month":9,"day":8,"morning":false}
```

返回：200 OK

```json
{
    "id": "L004",
    "year": 2018,
    "month": 4,
    "day": 5,
    "morning": 1,
    "name": "李四",
    "afternoon": 0,
    "shift_id": 121,
    "status": "working"
}
```

?> 如果尝试为其他用户添加值班信息，将返回 403 Forbidden。

### DELETE

格式：`DELETE /v1/shift/:shift_id`

**示例：**

`DELETE /v1/shift/1`

返回： 200 OK

```json
{
    "shift_id": 1,
    "id": "L004",
    "name": "李四",
    "year": 2018,
    "month": 8,
    "day": 2,
    "morning": 0,
    "afternoon": 1,
    "status": "working"
}
```

## 视频

格式： `GET /videos/:shortcode`

因为 streamable.com 没有备案,使用此 API 代理 `https://api.streamable.com/videos/:shortcode` 来获取视频源文件链接，参见 [Streamable API](https://streamable.com/documentation)。

## 通知

### GET

格式：`GET /v1/notice`

返回所有通知，按时间从新到旧排序。

**示例：**

`GET /v1/shift`

返回：200 OK

```json
[
    {"notice_id":6,"created_by":"Z003","created_at":"2018-09-07T08:25:35.000Z", "subject": "通知", "content":"测试通知", "user": {...}},
    {"notice_id":5,"created_by":"Z003","created_at":"2018-09-07T08:20:03.000Z", "subject": "通知", "content":null, "user": {...}},
    {"notice_id":4,"created_by":"Z003","created_at":"2018-09-07T08:16:57.000Z", "subject": "通知", "content":null, "user": {...}},
    {"notice_id":3,"created_by":"Z003","created_at":"2018-09-07T08:14:21.000Z", "subject": "通知", "content":null, "user": {...}},
    {"notice_id":2,"created_by":"L003","created_at":"2018-09-06T16:00:00.000Z", "subject": "通知", "content":"这是第二条通知", "user": {...}},
    {"notice_id":1,"created_by":"Z003","created_at":"2018-09-06T16:00:00.000Z", "subject": "通知", "content":"这是第一条通知"}, "user": {...}]
```

### POST

格式：`POST /v1/notice`

**示例：**

`POST /v1/notice`

请求 Body:

```json
{subject: '通知', content: '测试通知'}
```

返回：200 OK

```json
{
    "notice_id": 7,
    "created_by": "Z003",
    "created_at": "2018-09-07T08:49:20.000Z",
    "subject": "通知",
    "content": "测试通知",
    "user": {
        "id": "Z003",
        "name": "张三",
        "identify": "老师",
        "phone_number": 13849045786,
        "language": "中英",
        "session": 14,
        "email": "zhangsan@qq.com",
        "school": "经管学院",
        "password_changed_times": 0,
        "reputation": 0
    }
}
```

### DELETE

格式：`DELETE /v1/notice/:notice_id`

**示例：**

`DELETE /v1/notice/7`

返回： 200 OK

```json
{
    "notice_id": 7,
    "created_by": "Z003",
    "created_at": "2018-09-07T08:49:20.000Z",
    "subject": "通知",
    "content": "测试通知",
    "user": {
        "id": "Z003",
        "name": "张三",
        "identify": "老师",
        "phone_number": 13849045786,
        "language": "中英",
        "session": 14,
        "email": "zhangsan@qq.com",
        "school": "经管学院",
        "password_changed_times": 0,
        "reputation": 0
    }
}
```