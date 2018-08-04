# GET 请求

发起请求：

wx.request({
  url: config.service.getMonthlyUrl,
  method: 'GET',
  data: {
    stu_id: 1160300628
  },
  header: {
    'content-type': 'application/json' // 默认值
  }
  success: ...,
  fail: ...
)


服务器得到的 `ctx`：

ctx.header = ctx.headers = ctx.request.header = ctx.request.headers = ctx.request.accept.headers = 
```
{
  "connection": "upgrade",
  "host": "pmdt8kru.qcloud.la",
  "x-real-ip": "121.42.355.92",
  "x-forwarded-for": "121.42.355.92",
  "charset": "utf-8",
  "accept-encoding": "gzip",
  "referer": "https://servicewechat.com/wxcb3ed1484b8c7147/0/page-frame.html",
  "content-type": "application/json",
  "user-agent": "Mozilla/5.0 (Linux; Android 8.1; Pixel XL Build/OPM4.171019.021.D1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.143 Crosswalk/24.53.595.0 XWEB/155 MMWEBSDK/21 Mobile Safari/537.36 MicroMessenger/6.6.7.1302(0x26060742) NetType/4G Language/en MicroMessenger/6.6.7.1302(0x26060742) NetType/WIFI Language/en"
}
```

ctx.query = ctx.request.query = 
```
stu_id: "1160300628"
```

ctx.querystring = ctx.request.querystring = 
```
"stu_id=1160300628"
```

ctx.path = ctx.request.path = 
```
"/weapp/monthly"
```

ctx.origin = ctx.request.origin = 
```
"http://pmdt8kru.qcloud.la"
```

ctx.originalUrl = ctx.request.originUrl = 
```
"/weapp/monthly?stu_id=1160300628"
```


# POST 请求

发起请求：

wx.request({
  url: https://pmdt8kru.qcloud.la//weapp/cinsert,
  data: {
    wx_name: 'upupming',
    stu_id: 1160300628,
    stu_name: '宋宏宇',
    check_in: true,
    morning: true,
    afternoon: false
  },
  method: 'POST',
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: ...,
  fail: ...
});

服务器得到的 `ctx`：

ctx.body = ctx.request.body = ctx.response.body = 

```
{
  "wx_name": "upupming",
  "stu_id": "1160300628",
  "stu_name": "宋宏宇",
  "check_in": true,
  "morning": true,
  "afternoon": false
}
```

ctx.header = ctx.headers = ctx.request.header = ctx.request.headers = ctx.request.accept.headers = 

```
{
  "connection": "upgrade",
  "host": "pmdt8kru.qcloud.la",
  "x-real-ip": "223.4.2.19",
  "x-forwarded-for": "223.4.2.19",
  "content-length": "116",
  "charset": "utf-8",
  "accept-encoding": "gzip",
  "referer": "https://servicewechat.com/wxcb3ed1484b8c7147/0/page-frame.html",
  "content-type": "application/json",
  "user-agent": "Mozilla/5.0 (Linux; Android 8.1; Pixel XL Build/OPM4.171019.021.D1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.143 Crosswalk/24.53.595.0 XWEB/155 MMWEBSDK/21 Mobile Safari/537.36 MicroMessenger/6.6.7.1302(0x26060742) NetType/4G Language/en MicroMessenger/6.6.7.1302(0x26060742) NetType/4G Language/en"
}
```

ctx.host = ctx.hostname = 
```
"pmdt8kru.qcloud.la"
```

ctx.href = "http://pmdt8kru.qcloud.la/weapp/cinsert"

ctx.origin = 
```
"http://pmdt8kru.qcloud.la"
```

ctx.originalUrl = 
```
"/weapp/cinsert"
```

ctx.query = empty object

ctx.querystring = ""