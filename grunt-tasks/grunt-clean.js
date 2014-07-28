module.exports = function(grunt) {
/**
 * The directories to delete when `grunt clean` is executed.
 */
  grunt.config('clean', [ 
    '<%= head_dir %>/<%= build_dir %>', 
    '<%= head_dir %>/<%= compile_dir %>'
  ]);

  grunt.loadNpmTasks('grunt-contrib-clean');
};