module.exports = function ( grunt ) {

  /**
   * We read in our `package.json` file so we can access the package name and
   * version. It's already there, so we don't repeat ourselves here.
   */
  grunt.config('pkg', grunt.file.readJSON("package.json"));
  /**
   * The banner is the comment that is placed at the top of our compiled 
   * source files. It is first processed as a Grunt template, where the `<%=`
   * pairs are evaluated based on this very configuration object.
   */
  grunt.config('meta', {
    banner: 
      '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
      ' */\n'
  });

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build', 'compile' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'clean', 'html2js', 'jshint', 'coffeelint', 'coffee', 'less:build',
    'concat:build_css', 'copy:build_app_assets', 'copy:build_vendor_assets',
    'copy:build_appjs', 'copy:build_commonjs', 'copy:build_vendorjs', 'index:build',
    'karmaconfig', 'karma:continuous' 
  ]);

  /**
   * The `compile` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask( 'compile', [
    'less:compile', 'copy:compile_assets', 'ngmin', 'concat:compile_js', 'uglify', 'index:compile'
  ]);


  /**
   * A utility function to get all app JavaScript sources.
   */
  grunt.filterForJS = function( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  };

  /**
   * A utility function to get all app CSS sources.
   */
  grunt.filterForCSS = function( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  };

};
