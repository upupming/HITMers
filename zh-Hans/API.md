# API

HITMers 的 API 域名为 `https://api.hitmers.solotime.xyz/token`，其中的 `token` 是随机字符串（我在开发时将其设置为 `weapp`），防止暴露 API 接口导致隐私泄露，只有开发者才应该持有这个 `token`。API 域名下文将简写为 `AD`。

## 登录

用于验证是否存在此用户。

格式： `GET AD/login`

### 请求 query

|参数|类型|描述|
|---------|----|-----------|
|stu_id|string|学号|
|stu_name|string|姓名|
|stu_password|string|密码|

### 返回 body

`GET AD/login?stu_id=Z003&stu_name=张三&stu_password=test123`

```json
{
    "stu_id": "Z003",
    "stu_name": "张三",
    "phone_number": 13849045786,
    "language": "中英",
    "session": 14,
    "stu_password": "test123",
    "stu_password_changed_times": 1,
    "stu_reputation": 0,
    "workload": 0
}
```

?> 如果您查询的 学号+姓名+密码 在数据库中没有记录，您将接收到 `401` 状态码。

## 修改密码

格式： `PUT AD/change-password`

### 请求 body

|参数|类型|描述|
|---------|----|-----------|
|stu_id|string|学号|
|stu_new_password|string|新密码|

### 返回 body

```json
{
    "stu_id": "123",
    "stu_name": "Bob",
    "stu_password": "abcd",
    "stu_password_changed_times": 1,
    "workload": 1
}
```
?> 如果您请求的 `stu_id` 在数据库中没有记录, 您将接收到 `204` No Content 状态码。

## 签入/签出

每次签入或签出均会计入数据库，如果成功完成一次签出，将会计入一次工作量。

格式： `POST AD/cinsert`

### 请求 body

|参数|类型|描述|
|---------|----|-----------|
|wx_name|string|微信昵称|
|stu_id|string|学号|
|stu_new_password|string|新密码|
|checkin|boolean|签入时为 `true`|
|morning|boolean|早班时为 `true`|

### 返回 body

您将得到与请求 body 完全相同的 body。

```json
{
    "wx_name": "upupming",
    "stu_id": "123",
    "stu_name": "Bob",
    "check_in": true,
    "morning": true
}
```

## 本月

格式: `GET AD/monthly`

### 请求 query

|参数|类型|描述|
|---------|----|-----------|
|stu_id|string|学号|

### 返回 body

您将得到两个数组，第一个数组的每项元素记录了一次签入和签出的时间，第二个数组的每项元素记录了该学生即将到来的值班信息。

`GET AD/monthly?stu_id=123`

```json
[
    {
        "wx_name": "upupming",
        "stu_id": "123",
        "stu_name": "Bob",
        "date_time": "2018-08-05T09:43:13.000Z",
        "check_in": 0,
        "check_out": 1,
        "morning": 0,
        "afternoon": 1
    },
    {
        "wx_name": "upupming",
        "stu_id": "123",
        "stu_name": "Bob",
        "date_time": "2018-08-05T09:59:37.000Z",
        "check_in": 0,
        "check_out": 1,
        "morning": 0,
        "afternoon": 1
    }
]
```

?> 请注意 `date_time` 是 UTC 时间, 详见[这篇帖子](https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc)。 您可以使用 `new Date(Date.parse("2018-08-05T09:59:37.000Z"))` 得到一个 `Date` 对象。

?> 如果您请求的 `stu_id` 在数据库中没有记录, 您将接收到 `204` No Content 状态码。

## 班次查询

格式: `GET AD/shifts`

### 请求 query

|参数|类型|描述|
|---------|----|-----------|
|startMonth|number|起始月|
|startDay|number|起始日|
|endMonth|number|终止月|
|endDay|number|终止日|

例如，想要查询 7 月 1 日到 9 月 6 日的班次信息：

`GET AD/shifts?startMonth=7&startDay=1&endMonth=9&endDay=6`

### 返回 body

返回一个三维数组，分别索引**第几日**、**早晚班**、**全部值班人员**。如果返回的数据为 `data`，则 `data[0][0][0]` 表示查询日期中**第一天**的**上午**值班的**第一个人**，其中每个班次的人员是按照他们的**声誉**递减排序的。

`GET AD/shifts?startMonth=7&startDay=1&endMonth=9&endDay=6`

```json
[
    // 第一天
    [
        // 上午
        [
            // 所有值班人员
            {
                // 班次唯一标识
                "shift_id": 1,
                "name": "张三",
                "phoneNumber": 13849045786,
                "language": "中英",
                // 届数
                "session": 14,
                // 值班状态
                "status": "studying",
                // 声誉
                "reputation": 0
            },
            {
                "shift_id": 7,
                "name": "李四",
                "phoneNumber": 13848888786,
                "language": "韩文",
                "session": 13,
                "status": "working",
                "reputation": 0
            },
            {
                "shift_id": 45,
                "name": "王五",
                "phoneNumber": 10009045786,
                "language": "俄语",
                "session": 15,
                "status": "working",
                "reputation": 0
            },
            {
                "shift_id": 23,
                "name": "赵六",
                "phoneNumber": 13877745786,
                "language": "日语",
                "session": 16,
                "status": "waiting",
                "reputation": 0
            }
        ],
        // 下午
        [
            {
                "shift_id": 324,
                "name": "张三",
                "phoneNumber": 13849045786,
                "language": "中英",
                "session": 14,
                "status": "working",
                "reputation": 0
            },
            // ...
        ]
    ],
    // 第二天
    // ...
]
```

## 班次填写

格式： `POST AD/shifts`

### 请求 body

|参数|类型|描述|
|---------|----|-----------|
|stu_id|string|学号|
|month|number|月份|
|day|number|日期|
|morning|boolean|早班时为 `true`|
|status|string|值班状态，目前有 `working`, `waiting` 和 `studying`|

### 返回 body

您将得到与请求 body 完全相同的 body。

```json
{
    "stu_id": "123",
    "month": 8,
    "day": 15,
    "morning": true,
    "status": "working"
}
```

?> 如果当前不允许填写值班表，您将接收到 `403` 状态码。

## 班次删除

格式： `DELETE AD/shifts`

### 请求 query

|参数|类型|描述|
|---------|----|-----------|
|shift_id|number|班次唯一 id|

### 返回 body

您将得到与请求 body 完全相同的 body。

```json
{
    "shift_id": "123"
}
```

?> 如果当前不允许删除值班信息，您将接收到 `403` 状态码。如果没有此 id，您将接收到 `401` 状态码。