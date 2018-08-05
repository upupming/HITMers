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

`GET AD/login?stu_id=123&stu_name=Bob&stu_password=1234`

```json
{
    "stu_id": "123",
    "stu_name": "Bob",
    "stu_password": "1234",
    "stu_password_changed_times": 0,
    "workload": 1
}
```

!> 如果您查询的 学号+姓名+密码 在数据库中没有记录，您将接收到 `401` 状态码。

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
!> 如果您请求的 `stu_id` 在数据库中没有记录, 您将接收到 `204` No Content 状态码。

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

### Response body

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

