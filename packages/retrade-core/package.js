Package.describe({
  name: 'retrade:core',
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:forms',
    'vulcan:accounts',
    'vulcan:users',

  ]);

  api.addAssets([
    'lib/static/LuloCleanOneBold.otf',
    'lib/static/avenir-light.otf',
    'lib/static/Electronics.png',
    'lib/static/login.svg',
    'lib/static/link.svg',
  ], ['client']);


  // api.addFiles('lib/stylesheets/bootstrap.min.css');
  api.use('fourseven:scss');
  api.addFiles('lib/stylesheets/global.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});