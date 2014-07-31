module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-ngmin');
  
  /**
   * Load in our build configuration file.
   */
  var userConfig = require( '../build.config.js' );

  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {
    head_dir : 'app1',
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * The banner is the comment that is placed at the top of our compiled 
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },

    /**
     * Creates a changelog on a new version.
     */
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        template: 'changelog.tpl'
      }
    },

    /**
     * Increments the version number, etc.
     */
    bump: {
      options: {
        files: [
          "package.json", 
          "bower.json"
        ],
        commit: false,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: [
          "package.json", 
          "client/bower.json"
        ],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },    

    /**
     * `ng-min` annotates the sources before minifying. That is, it allows us
     * to code without the array syntax.
     */
    ngmin: {
      compile: {
        files: [
          {
            src: [ '<%= app_files.js %>', '<%= common_files.js %>' ],
            cwd: '<%= pfx.build_dir %>',
            dest: '<%= pfx.build_dir %>',
            expand: true
          }
        ]
      }
    },

    /**
     * Minify the sources!
     */
    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    }

  };

  // var pfx = {app_files:{}};
  // pfx.app_files.atpl = prefixFiles(app_files.atpl);
  
  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );
  grunt.config('pfx.app_files', prefixFiles('app_files'));
  grunt.config('pfx.vendor_files', prefixFiles('vendor_files'));
  grunt.config('pfx.test_files', prefixFiles('test_files'));
  grunt.config('pfx.compile_dir', '<%= head_dir %>/<%= compile_dir %>');
  grunt.config('pfx.build_dir', '<%= head_dir %>/<%= build_dir %>');
  grunt.task.loadTasks('../grunt-tasks');

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build', 'compile' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'clean', 'html2js', 'jshint', 'coffeelint', 'coffee', 'less:build',
    'concat:build_css', 'copy:build_app_assets', 'copy:build_vendor_assets',
    'copy:build_appjs', 'copy:build_commonjs', 'copy:build_vendorjs', 'index:build',
    'karmaconfig', 'karma:continuous' 
  ]);

  /**
   * The `compile` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask( 'compile', [
    'less:compile', 'copy:compile_assets', 'ngmin', 'concat:compile_js', 'uglify', 'index:compile'
  ]);

  function prefixFiles(path){
    var obj = grunt.config(path);
    var prefix = grunt.config('head_dir');
    var result = {};

    var _decorate = function(file){
      if((/^!/).test(file)){
        file = file.slice(0, 1) + prefix + "/" + file.slice(1);
      }
      else{
        file = prefix + "/" + file;
      }
      return file;
    };

    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        var files = obj[property];
        if(grunt.util.kindOf(files) === 'array'){
          for (var i = files.length - 1; i >= 0; i--) {
            files[i] = _decorate(files[i]);
          }
        }
        else{
          files = _decorate(files);
        }
        result[property] = files;
      }
    }
    console.log(result);
    return result;
  }


  /**
   * A utility function to get all app JavaScript sources.
   */
  grunt.filterForJS = function( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  };

  /**
   * A utility function to get all app CSS sources.
   */
  grunt.filterForCSS = function( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  };

};
