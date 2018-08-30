'use strict';

const Controller = require('egg').Controller;

const client_id = 'hyewfbgawd'
const client_secret = 'fskefgtarwdbawydrawpdpaiuiawdtg'
const redirect_uri = 'http://127.0.0.1:7002/auth/redirect'

class AuthController extends Controller {

  // oAuth:app.oAuth2Server.authorize()生成code后根据redirect_uri跳转回auth.js的redirect方法，以授权码验证获取令牌token
  async redirect(){
    // 返回的query中有code授权码, 是await result 等待 server:app.oAuth2Server.token() 生成token, 再通过users.js 的 async token 返回token
    console.log(this.ctx.query)
    const result = await this.ctx.curl('http://127.0.0.1:7001/users/token', {
      dataType: 'json',
      // contentType: 'application/x-www-form-urlencoded', // 默认格式
      method: 'POST',
      timeout: 3000,
      data: {
        grant_type: 'authorization_code',
        code: this.ctx.query.code,
        state: this.ctx.query.state,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
      }
    });
    //几种grant_type, 获取token查看 
    console.log(result.data);
    //this.ctx.query & this.ctx.body 就是 重定向和异步POST请求的区别
    this.ctx.body = result.data;
  }
}

module.exports = AuthController;
