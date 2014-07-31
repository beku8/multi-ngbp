module.exports = function(grunt) {
/**
 * Minify the sources!
 */
  grunt.config('uglify', {
    compile: {
      options: {
        banner: '<%= meta.banner %>'
      },
      files: {
        '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

};