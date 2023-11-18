// config.js

module.exports = {
  google: {
    clientID: '1011102772716-s90oh24rbq288gbm6kmhkj9vmgjeaa77.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  session: {
    secret: 'secret'
  },
  mongodb: {
    uri: 'mongodb://localhost/image_gallery'
  }
};
