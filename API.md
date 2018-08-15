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

?> If your id+name+password query cannot match any record in the database, you will get `401` status code.

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
?> If your `stu_id` cannot match any record in the database, you will get `204` No Content status code.

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

?> Please note the `date_time` is UTC time, see [this post](https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc) for more information. You can simply use `new Date(Date.parse("2018-08-05T09:59:37.000Z"))` get a `Date` object.

?> If your `stu_id` cannot match any record in the database, you will get `204` No Content status code.

## Shift inquiry

Format: `GET AD/shifts`

### Request query

|Parameter|Type|Description|
|---------|----|-----------|
|startMonth|number|Month of start date|
|startDay|number|Day of start date|
|endMonth|number|Month of end date|
|endDay|number|Day of end date|

For example, if you want to query the shifts from July 1st to September 6th:

`GET AD/shifts?startMonth=7&startDay=1&endMonth=9&endDay=6`

### Response body

Returns a three-dimensional array that indexes *query dates*, *morning and evening shifts*, and *all persons on duty*. If the returned data is `data`, then `data[0][0][0]` represents the *first day* of the query dates, *in the morning* and *the first person*. Persons of each period are desending sorted according to their *reputation*.

`GET AD/shifts?startMonth=7&startDay=1&endMonth=9&endDay=6`

```json
[
    // First day
    [
        // Morning
        [
            // All persons
            {
                // Unique id for this shift
                "shift_id": 1,
                "name": "张三",
                "phoneNumber": 13849045786,
                "language": "中英",
                // Session entered HIT Museum
                "session": 14,
                // Status
                "status": "studying",
                // Reputation
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
        // Afternoon
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
    // Second day
    // ...
]
```

## Fill in shfts

Format: `POST AD/shifts`

### Request body

|Parameter|Type|Description|
|---------|----|-----------|
|stu_id|string|Student ID|
|month|number|Month|
|day|number|Day|
|morning|boolean|`true` if it's morning|
|status|string|Shift status, can be `working`, `waiting` and `studying` at present|

### Response body

You will get the same body as your request.

```json
{
    "stu_id": "123",
    "month": 8,
    "day": 15,
    "morning": true,
    "status": "working"
}
```

?> If filling in shifts is not allowed, you will get `403` status code.

## Delete shifts

Format: `DELETE AD/shifts`

### Request query

|Parameter|Type|Description|
|---------|----|-----------|
|shift_id|number|Unique id for this shift|

### Response body

You will get the same body as your request.

```json
{
    "shift_id": "123"
}
```

?> If deleting shifts is not allowed, you will get `403` status code. If the `shift_id` doesn't exist, you will get `401` status code.