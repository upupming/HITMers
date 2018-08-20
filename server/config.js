const CONF = {
  env: 'dev',
  port: 5757,
  db: {
    client: 'mysql', //指明数据库类型是mysql
    connection: { //指明连接参数
      host: 'localhost',
      user: 'root',
      port: 3306,// 数据库的端口
      password: 'data4upupming!',
      database: 'hitmers'
    },
    debug: this.env === 'dev' ? true : false
  },
  
  cdbName: 'checkModel',
  logindbName: 'loginModel',
  infodbName: 'infoModel',
  shiftsModel: 'shiftsModel'
};

module.exports = CONF;
