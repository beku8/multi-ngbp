module.exports = function(grunt) {
/**
 * The directories to delete when `grunt clean` is executed.
 */
  grunt.config('clean', ['<%= build_dir %>', '<%= compile_dir %>', '<%= lib_dir %>']);
  
  grunt.loadNpmTasks('grunt-contrib-clean');
};