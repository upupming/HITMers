// 供测试使用
module.exports = async (ctx, next) => {
  return ctx.response.body = 'Hello world';
}