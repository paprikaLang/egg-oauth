'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  app.get('/users', controller.users.list);
  app.post('/users', controller.users.add);
  //password mode app.oauth.token() lifecycle
  //getClient --> getUser --> saveToken
  //authorization_code mode app.oauth.token() lifecycle
  //getClient --> getAuthorizationCode --> saveToken --> revokeAuthorizationCode
  app.get('/authorize', controller.users.authorize);
  app.all('/users/token', app.oAuth2Server.token(), 'users.token');   //客户端 异步请求 获取 token
  app.all('/users/authorize', app.oAuth2Server.authorize());          //客户端 重定向   获取 授权码code
  app.all('/users/authenticate', app.oAuth2Server.authenticate(), 'users.authenticate');    // 验证请求
  
};
