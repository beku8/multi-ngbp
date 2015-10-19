module.exports = function(grunt) {
/**
 * The `index` task compiles the `index.html` file as a Grunt template. CSS
 * and JS files co-exist here but they get split apart later.
 */
  grunt.config('index', {
      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= app_files.js %>',
          '<%= common_files.js %>',
          '<%= html2js.lib_common.dest %>',
          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ],
        env: 'dev'
      },

      /**
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ],
        env: 'prod'
      }
    });


  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var build_dir = grunt.config('build_dir');
    var compile_dir = grunt.config('compile_dir');
    var cdnScripts = grunt.config('cdn_files.js');
    var common_dir = "..";
    var dirRE = new RegExp( '^('+build_dir+'|'+compile_dir+'|'+common_dir+')\/', 'g' );
    var jsFiles = grunt.filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var cssFiles = grunt.filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    var env = this.data.env;
    if(env === 'dev'){
      jsFiles.push('http://127.0.0.1:'+grunt.config('lrPort')+'/livereload.js');
    }

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            cdnScripts: cdnScripts,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' ),
            env:env 
          }
        });
      }
    });
  });

};