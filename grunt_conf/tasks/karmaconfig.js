module.exports = function(grunt) {
/**
 * This task compiles the karma template so that changes to its file array
 * don't have to be managed manually.
 */
  grunt.config('karmaconfig', {
    unit: {
      dir: '<%= build_dir %>',
      src: [ 
        '<%= vendor_files.js %>',
        '<%= html2js.app.dest %>',
        '<%= html2js.common.dest %>',
        '<%= html2js.lib_common.dest %>',
        '<%= test_files.js %>'
      ]
    }
  });

  /**
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma. Yay!
   */
  grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
    
    var jsFiles = grunt.filterForJS( this.filesSrc );
    
    grunt.file.copy( '../grunt_conf/karma/karma-unit.tpl.js', this.data.dir + '/karma-unit.js', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });

};