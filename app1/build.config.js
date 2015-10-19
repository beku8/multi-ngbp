/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  
  lrPort:35729,

  server: {
    port: 3333,
    hostname: 'localhost'
  },

  deps: ['common1/**', 'common2/**'],

  cdn_files:{
    js: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/angular-ui-utils/modules/route/route.js'
    ],
    css: [
    ],
    assets: [
    ]
  }
};
