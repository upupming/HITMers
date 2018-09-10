# RESTful API

|Environment|API Address|
|---|--------|
|Development Environment|http://localhost:5757/v1|
|Production Environment|https://hitmers-api.solotime.xyz/v1|

Use the [Json Web Token](https://github.com/auth0/node-jsonwebtoken) authorization mechanism.

The initialization data for all of the following examples can be found in [seed files](https://github.com/upupming/HITMers-node-js-server/tree/dev/src/db/seeds) on GitHub.

## Register

HITMers is only designed for a small group of people, so register by providing register code is a good idea.

Format: `POST /v1/register`

**Example 1：**

Request Body:

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

Returns: 200 OK

```json
The user has been added successfully.
```

?> If the user id already exists in the database, 409 Conflict will be returned.


## Login

Verify user information and generate tokens for subsequent verification in all requests.

Format: `POST /v1/login`

You can also use other information as a filter instead of `id`. As long as the parameters are unambiguous for one user, the server will find that user. 

|Parameter|Type|Required|Description|
|---------|----|-------|----|
|user_id|string|No|User unique identifier|
|id|string|Yes|Student ID/Staff ID|
|name|string|No|Name|
|phone_number|string|No|Phone number|
|language|string|No|Language|
|session|number|No|Session|
|password|string|Yes|Password|

**Example 1:**

Request Body:

```json
{id: 'no_such_id'}
```

Returns: 404 NOT FOUND

```json
{"auth":false,"token":null}
```

**Example 2:**

Request Body:

```json
{id: 'Z003', password: 'worng-password'}
```

Returns: 401 Unauthorized

```json
{"auth":false,"token":null}
```

**Example 3:**

Request Body:

```json
{id: 'Z003', password: '13849045786'}
```

Returns: 200 OK

```json
{
    "auth":true,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM1OTYyNDI5fQ.PN0WiiWeNGhd-FzJZErxh-RjAmp-2r9jTOoL7_g6Nho",
    "user":
        {"user_id":1,"id":"Z003","name":"张三","identify":"老师","phone_number":13849045786,"language":"中英","session":14,"email":"zhangsan@qq.com","school":"经管学院","password_changed_times":0,"reputation":0}
}
```

?> User passwords are stored after hashing by [bcrypt](https://github.com/dcodeIO/bcrypt.js). So even in extreme cases which the database is leaked, users don't have to worry about password leaks. The encryption algorithm can be found in [Wikipedia](https://en.wikipedia.org/wiki/Bcrypt).

?> All subsequent requests, if there is no exception mentioned, need to set the `x-access-token` field in the header to the `token` obtained here, otherwise the server will return 401 Unauthorized.

## User information

### GET

Get user information.

Format:

`GET /v1/user/all`

`GET /v1/user/:id`

**Example 1:**

`GET /v1/user/all`

Returns: 200 OK

```json
[
    {"id":"Z003","name":"张三","identify":"老师","phone_number":13849045786,"language":"中英","session":14,"email" : "zhangsan@qq.com", "school": "administration school", "password_changed_times": 0, "reputation": 0},
    {"id":"L004","name":"李四","identify":"instructor","phone_number":13848888786,"language":"Korean","session":13,"email" :"lisi@163.com","school":"Humanities", "password_changed_times":0,"reputation":0},
    {"id": "W005", "name": "Wangwu", "identify": "Librarian", "phone_number": 10009045786, "language": "Russian", "session": 15, "email ":"wangwu@qq.com","school":"Computer Academy", "password_changed_times":0,"reputation":0},
    {"id":"Z006","name":"Zhao Liu", "identify": "Instructor", "phone_number":13877745786,"language":"Japanese", "session":16,"email" : "zhaoliu@gmail.com", "school": "Materials Institute", "password_changed_times": 0, "reputation": 0}
]
```

`GET /v1/user/L004`

Returns: 200 OK

```json
{"id":"L004","name":"李四","identify":"instructor","phone_number":13848888786,"language":"Korean","session":13,"email" :"lisi@163.com","school":"Humanities", "password_changed_times":0,"reputation":0}
```

**Example 2:**

`GET /v1/user/L004`

Returns: 200 OK

```json
{"id":"L004","name":"李四","identify":"instructor","phone_number":13848888786,"language":"Korean","session":13,"email" :"lisi@163.com","school":"Humanities", "password_changed_times":0,"reputation":0}
```

?> Only users whose `identify` is `老师` and `队长` have permission to obtain all users' information. Only these users can use their own `token` to get information about other users. Otherwise 403 Forbidden will be returned.

### POST

Add new users.

Format: `POST /v1/user`

**Example: **

Request Body:

```json
[
    {"id":"moon5","name":"Moon Star","identify":"Instructor", "phone_number":17766458988,"language":"中文","session":14,"email" :"cs65@may.xyz","school":"Humanities College"},
    {"id":"newton2","name":"Newton","identify":"Collection staff", "phone_number":18866458988,"language":"中英","session":16,"email" :"cs6521@may.xyz","school":"Foreign Language Institute"}
]
```

Returns: 200 OK

```
Users have been added successfully.
```

?> If any of the users you want to add already exist in the database, the entire request will be rejected and 409 Conflict will be returned. For existing users, use `PUT` instead if you need to modify user information.

### DELETE

Delete users.

Format: `DELETE /v1/user`

It is also possible to provide a minimum filter that uniquely distinguishes the user for each user who needs to be deleted.

**Example: **

Request Body:

```json
[
   {"id": "moon5"},
   {"id": "newton2"}
]
```

Returns: 200 OK

```
Users have been deleted successfully.
```

### PUT

Update user information and return updated user information.

Format:

`PUT /v1/user`
`PUT /v1/user/:id`

**Example 1:**

`PUT /v1/user`

Request Body:

```json
[{"id":"W00995", "school": "Art Academy", "password": "so-easy-to-crack"}, {"id": "Z006", "reputation": "90" ,"password":"easy-to-crack-too"}]
// or
[{"id": "W005", "school": "Art Academy", "password": "so-easy-to-crack"}, {"id": "Z006", "reputation": "90" ,"password":"easy-to-crack-too"}]
```

Returns: 200 OK

```json
[
    {"id":"Z006","name":"Zhao Liu", "identify": "Instructor", "phone_number":13877745786,"language":"Japanese", "session":16,"email" : "zhaoliu@gmail.com", "school": "Materials Institute", "password_changed_times": 0, "reputation": 90}
]
// or
[
    {"id": "W005", "name": "Wangwu", "identify": "Librarian", "phone_number": 10009045786, "language": "Russian", "session": 15, "email ":"wangwu@qq.com","school":"Graduate School", "password_changed_times":0,"reputation":0},
    {"id":"Z006","name":"Zhao Liu", "identify": "Instructor", "phone_number":13877745786,"language":"Japanese", "session":16,"email" : "zhaoliu@gmail.com", "school": "Materials Institute", "password_changed_times": 0, "reputation": 90}
]
```

**Example 2:**

`PUT /v1/user/W005`

Request Body:

```json
{"id":"WangWuNewID","reputation":"19000","password":"easy-to-crack-too"}
```

Returns: 200 OK

```json
{"id": "WangWuNewID", "name": "Wang Wu", "identify": "Librarian", "phone_number": 10009045786, "language": "Russian", "session": 15, "email ":"wangwu@qq.com","school":"Computer Academy", "password_changed_times":0,"reputation":19000}
```

?> User `W00995` of the array in first request in Example 1 cannot be found, it will be ignored directly and no error messages will be returned. Please use `POST` if you want to add users.

?> In Example 2, the user id is modified, and the corresponding user needs to acquire the token again because the server determines whether the user is permitted to request by verifying the `id` payload decrypted from the token.

?> If the updated user id already exists in the database, 409 Conflict will be returned.

## Checks

### GET

Format: `GET /v1/check/:id`

**Example 1:**

`POST /v1/check/Z003`

Request Query: Empty

Returns: 200 OK

```json
[
    {"check_id":1,"id":"Z003","name":"张三","date_time":"2018-09-03T06:21:59.000Z","check_in":0,"check_out" :1,"morning":1,"afternoon":0},
    {"check_id":2,"id":"Z003","name":"张三","date_time":"2018-07-02T16:00:00.000Z","check_in":0,"check_out" :1,"morning":0,"afternoon":1},
    {"check_id":3,"id":"Z003","name":"张三","date_time":"2018-08-02T16:00:00.000Z","check_in":0,"check_out" :1,"morning":0,"afternoon":1},
    {"check_id":4,"id":"Z003","name":"张三","date_time":"2018-07-05T16:00:00.000Z","check_in":0,"check_out" :1,"morning":0,"afternoon":1}
]
```

**Example 2:**

`POST /v1/check/Z003`

Request Query:

```
Year: 2018
Month: 7
```

Returns: 200 OK

```json
[
    {"check_id":2,"id":"Z003","name":"张三","date_time":"2018-07-02T16:00:00.000Z","check_in":0,"check_out" :1,"morning":0,"afternoon":1},
    {"check_id":4,"id":"Z003","name":"张三","date_time":"2018-07-05T16:00:00.000Z","check_in":0,"check_out" :1,"morning":0,"afternoon":1}
]
```

?> If you try to get the check-in information of other users, 403 Forbidden will be returned.

### POST

Format: `POST /v1/check`

**Example: **

`POST /v1/check`

Request Body:

```json
{"id":"L004","in":true,"morning":true}
```

Returns: 200 OK

```json
{
     "id": "L004",
     "name": "Li Si",
     "date_time": "2018-09-02T02:53:01.392Z",
     "check_in": true,
     "check_out": false,
     "morning": true,
     "afternoon": false
}
```

?> Please note that `date_time` is UTC time, see [this post] (https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc). You can construct a `Date` object using `new Date(Date.parse("2018-08-05T09:59:37.000Z"))`.

?> If you try to check in for another user, 403 Forbidden will be returned.

## Shifts

### GET

Format: 

`GET /v1/shift`

Return a three-dimensional array, whose indices are used for indexing **days index**, **morning/evening shift**, and **all shifts**. If the returned body is `data`, then `data[0][0][0]` represents in **the first day of the query days**, and **in the morning**, **the first person**'s shift information. Persons of each period are sorted according to their **reputation**.

`GET /v1/shift/:id`

Get the user's shifts during a period of time.

**Example 1:**

`GET /v1/shift`

Request Query:

```
Year:2018
startMonth: 9
startDay: 2
endMonth:9
endDay: 4
```

Returns: 200 OK

```json
[
    [[],[{"id":"Z006","name":"Zhao Liu", "identify": "Instructor", "phone_number":13877745786,"language":"Japanese", "session": 16, "email": "zhaoliu@gmail.com", "school": "Materials", "password_changed_times": 0, "reputation": 0, "shift_id": 106, "status": "working"}] ],
    [[{"id":"L004","name":"李四","identify":"Instructor", "phone_number":13848888786,"language":"Korean", "session":13," Email":"lisi@163.com","school":"Humanities", "password_changed_times":0,"reputation":0,"shift_id":107,"status":"working"},{"id" : "Z003", "name": "Zhang San", "identify": "Teacher", "phone_number": 13840945786, "language": "中英", "session": 14, "email": "zhangsan@ Qq.com","school":"Economics Institute", "password_changed_times":0,"reputation":0,"shift_id":111,"status":"working"},,[]],
    [[],[{"id":"Z006","name":"Zhao Liu", "identify": "Instructor", "phone_number":13877745786,"language":"Japanese", "session": 16, "email": "zhaoliu@gmail.com", "school": "Materials", "password_changed_times": 0, "reputation": 0, "shift_id": 108, "status": "working"}] ]
]
```

**Example 2:**

`GET /v1/shift/Z003`

Request Query:

```
Year:2018
startMonth: 9
startDay: 2
endMonth:9
endDay: 4
```

Returns: 200 OK

```json
[{"shift_id":111,"id":"Z003","name":"张三","year":"2018","month":9,"day":3,"morning":1 , "afternoon": 0, "status": "working"}]
```

?> If you try to query other users' shifts during a period of time, 403 Forbidden will be returned.

### POST

Format: `POST /v1/shift`

**Example: **

`POST /v1/shift`

Request Body:

```json
{"id":"Z003","year":2018,"month":9,"day":8,"morning":false}
```

Returns: 200 OK

```json
{
     "id": "L004",
     "year": 2018,
     "month": 4,
     "day": 5,
     "morning": 1,
     "name": "Li Si",
     "afternoon": 0,
     "shift_id": 121,
     "status": "working"
}
```

?> If you try to add shifts for other users, 403 Forbidden will be returned.

### DELETE

Format: `DELETE /v1/shift/:shift_id`

**Example: **

`DELETE /v1/shift/1`

Returns: 200 OK

```json
{
     "shift_id": 1,
     "id": "L004",
     "name": "Li Si",
     "year": 2018,
     "month": 8,
     "day": 2,
     "morning": 0,
     "afternoon": 1,
     "status": "working"
}
```

## Videos

Format: `GET /videos/:shortcode`

This API is a proxy of `https://api.streamable.com/videos/:shortcode`, see [Streamable API](https://streamable.com/documentation).

## Notices

### GET

Format: `GET /v1/notice`

Get all notices from newer to older.

**Example: **

`GET /v1/notice`

Returns: 200 OK

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

Format: `POST /v1/notice`

**Example: **

`POST /v1/notice`

Request Body:

```json
{"subject": "通知", "content": "测试通知"}
```

Returns: 200 OK

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

Format: `DELETE /v1/notice/:notice_id`

**Example: **

`DELETE /v1/notice/7`

Returns: 200 OK

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

## Streamable videos

### GET

Format: `GET /v1/video`

Get all videos from newer to older.

**Example: **

`GET /v1/video`

Returns: 200 OK

```json
[
    {"video_id":1,"created_by":"Z003","created_at":"2018-09-06T16:00:00.000Z","video_code":"c9zrn","subject":"视频标题","desc":"视频描述","user":{...}}
]
```

### POST

Format: `POST /v1/video`

**Example: **

`POST /v1/video`

Request Body:

```json
{
    "subject": "video subject"
    "desc": "video desc"
    "video_code": "c9zrn"
}
```

Returns: 200 OK

```json
{
    "video_id": 2,
    "created_by": "Z003",
    "created_at": "2018-09-09T11:12:51.000Z",
    "video_code": null,
    "subject": null,
    "desc": null,
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

Format: `DELETE /v1/video/:video_id`

**Example: **

`DELETE /v1/video/2`

Returns: 200 OK

```json
{
    "video_id": 2,
    "created_by": "Z003",
    "created_at": "2018-09-09T11:12:51.000Z",
    "video_code": null,
    "subject": null,
    "desc": null,
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