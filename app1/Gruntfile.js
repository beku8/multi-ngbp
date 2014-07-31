module.exports = function ( grunt ) {
    

  var globalConfig = require( '../global.build.config.js' );
  var buildConfig = require( './build.config.js' );
  
  grunt.initConfig( grunt.util._.extend( globalConfig, buildConfig ) );
  grunt.task.loadTasks('../grunt-tasks');

};
