# API

For HITMers, the API domain is `https://api.hitmers.solotime.xyz/token`, the `token` is a random string used to prevent disclosure of privacy(I set `token` to `weapp` when developing), so only developers should know this token. The API domain will be denoted as `AD` below.

## Login

Used to verify if this user exists.

Format: `GET AD/login`

### Request query

|Parameter|Type|Description|
|---------|----|-----------|
|stu_id|string|Student ID|
|stu_name|string|Student name|
|stu_password|string|Student password|

### Response body

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

!> If your id+name+password query cannot match any record in the database, you will get `401` status code.

## Change password

Format: `PUT AD/change-password`

### Request body

|Parameter|Type|Description|
|---------|----|-----------|
|stu_id|string|Student ID|
|stu_new_password|string|Student's new password|

### Response body

```json
{
    "stu_id": "123",
    "stu_name": "Bob",
    "stu_password": "abcd",
    "stu_password_changed_times": 1,
    "workload": 1
}
```
!> If your `stu_id` cannot match any record in the database, you will get `204` No Content status code.

## Check in/out

Each check-in or check-out is counted in the database. If a check-out is successfully completed, the workload will be counted.

Format: `POST AD/cinsert`

### Request body

|Parameter|Type|Description|
|---------|----|-----------|
|wx_name|string|Student Wechat name|
|stu_id|string|Student ID|
|stu_name|string|Student name|
|checkin|boolean|`true` if you want to check in|
|morning|boolean|`true` if it's morning shift|

### Response body

You will get the same body as your request.

```json
{
    "wx_name": "upupming",
    "stu_id": "123",
    "stu_name": "Bob",
    "check_in": true,
    "morning": true
}
```

## Monthly

Format: `GET AD/monthly`

### Request query

|Parameter|Type|Description|
|---------|----|-----------|
|stu_id|string|Student ID|

### Response body

You will get an array of check-out details.

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

!> Please note the `date_time` is UTC time, see [this post](https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc) for more information. You can simply use `new Date(Date.parse("2018-08-05T09:59:37.000Z"))` get a `Date` object.

!> If your `stu_id` cannot match any record in the database, you will get `204` No Content status code.