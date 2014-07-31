module.exports = function(grunt) {
/**
 * `grunt concat` concatenates multiple source files into a single file.
 */
  grunt.config('concat', {
    /**
     * The `build_css` target concatenates compiled CSS and vendor CSS
     * together.
     */
    build_css: {
      src: [
        '<%= vendor_files.css %>',
        '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
      ],
      dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
    },
    /**
     * The `compile_js` target is the concatenation of our application source
     * code and all specified vendor source code into a single file.
     */
    compile_js: {
      options: {
        banner: '<%= meta.banner %>'
      },
      src: [ 
        '<%= vendor_files.js %>', 
        '../grunt_conf/module.prefix', 
        '<%= build_dir %>/src/**/*.js',
        '<%= build_dir %>/common/**/*.js', 
        '<%= html2js.app.dest %>', 
        '<%= html2js.common.dest %>', 
        '<%= html2js.lib_common.dest %>',
        '../grunt_conf/module.suffix' 
      ],
      dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};