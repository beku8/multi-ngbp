module.exports = function(grunt) {
/**
 * `ng-min` annotates the sources before minifying. That is, it allows us
 * to code without the array syntax.
 */
  grunt.config('ngmin', {
    compile_appjs: {
      files: [
        {
          src: [ '<%= app_files.js %>'],
          cwd: '<%= build_dir %>',
          dest: '<%= build_dir %>',
          expand: true
        }
      ]
    },
    compile_commonjs:{
      files: [
        {
          src: [ '<%= common_files.js %>'],
          //add /common to work as relative path
          cwd: '<%= build_dir %>/common',
          dest: '<%= build_dir %>/common',
          expand: true
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-ngmin');

};