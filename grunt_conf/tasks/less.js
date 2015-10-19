module.exports = function(grunt) {
/**
 * `grunt-contrib-less` handles our LESS compilation and uglification automatically.
 * Only our `main.less` file is included in compilation; all other files
 * must be imported from this file.
 */
  grunt.config('less', {
    build: {
      files: [{
        src:['<%= app_files.less %>', '<%= common_files.less %>'],
        dest:'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
        ext:'css'
      }]
    },
    compile: {
      files:[{
        src:['<%= app_files.less %>', '<%= common_files.less %>'],
        dest:'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
        ext:'css'
      }],
      options: {
        cleancss: true,
        compress: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
};