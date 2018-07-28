const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wxcb3ed1484b8c7147',

  // 微信小程序 App Secret
  appSecret: '',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: {},
    pass: 'wxcb3ed1484b8c7147',
    char: 'utf8mb4'
  },

  db: {
    client: 'mysql', //指明数据库类型是mysql
    connection: { //指明连接参数
      host: 'localhost',
      user: 'root',
      port: 3306,// 数据库的端口
      password: 'wxcb3ed1484b8c7147',
      database: 'HITMers'
    }
  },
  
  cdbName: 'checkModel',
  infodbName: 'infoModel',

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-beijing-1',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: '',
    // 上传最大大小
    maxSize: 10,
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh'
}

module.exports = CONF
