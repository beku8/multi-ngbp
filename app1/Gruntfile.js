module.exports = function ( grunt ) {
    

  var globalConfig = require( '../grunt_conf/global.build.config.js' );
  var buildConfig = require( './build.config.js' );
  
  grunt.initConfig( grunt.util._.extend( globalConfig, buildConfig ) );
  grunt.task.loadTasks('../grunt_conf/tasks');

};
