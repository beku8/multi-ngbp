module.exports = function(grunt) {
/**
 * static file server
 */
  grunt.config('connect', {
    server: {
      options: {
        port: '<%= server.port %>',
        hostname: '<%= server.hostname %>',
        base: './<%= build_dir %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};




