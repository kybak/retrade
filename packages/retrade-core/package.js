Package.describe({
  name: 'retrade:core',
});

Package.onUse(function (api) {
  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:users',
    'vulcan:forms',
    'vulcan:accounts',

  ]);

  api.addAssets([
    './lib/static/LuloCleanOneBold.otf',
    './lib/static/avenir-light.otf',
    './lib/static/Electronics.png',
    './lib/static/login.svg',
    './lib/static/link.svg',
  ], ['client']);

  api.addAssets([
    'lib/server/email/templates/order-paid.handlebars',
    'lib/server/email/templates/wrapper.handlebars',
  ], ['server']);


  // api.addFiles('lib/stylesheets/bootstrap.min.css');
  api.use('fourseven:scss');
  api.addFiles('lib/stylesheets/global.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
