'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}
