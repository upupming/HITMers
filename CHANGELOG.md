# HITMers CHANGELOG

## v1.1.1(In progress)

### Fixed

1. 跨年份获取值班信息

### Improved

1. 首次打开时，对服务端进行预请求唤醒正在休眠的服务端

## v1.1.0

### Added

1. 添加值班表当前周数
2. 查看除当前周以外其他周的值班表、来宾表
3. 打开值班表自动定位到当天的值班信息
4. 分享视频

### Fixed

1. 值班表某上午（下午）恰好为 6 人时，剩余 1 px 未填满的问题

### Improved

1. 添加通知、视频时展示 Loading
2. 优化 PDF 格式，加入标题、天与天之间的间隔

## v1.0.0

### Added

1. 保存值班表为 pdf
2. 查看预约团

### Fixed

1. 跨越多个月的值班表查询

### Updated

1. Logo & tutorial video

### Improved

1. 优化值班表的展示，不必左右滑屏

## 0.0.8

### Added

1. 空闲教室查询

### Fixed

1. 修复 签到/签出 成功提示消息

### Improved

1. 『工作』页面 Tab 使用馆徽
2. 时间、人名之间加入 padding

## 0.0.7

### Added

1. 修改用户信息时，对非法输入进行验证

### Fixed

1. 使用 VPS 反向代理 Heroku 提升网络速度
2. logo 清晰度提升
3. 验证 Streamable 视频代码为 5 位字符串
4. 增大弹出输入框字体大小
5. 签到时先确认位置信息再发起请求

### Improved

1. 值班日历日记增大 textarea 空间
2. 填写值班表支持关闭/打开值班规则，并美化显示
3. 优化视频、通知添加页面 textarea 显示