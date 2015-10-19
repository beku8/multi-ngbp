module.exports = function(grunt) {
/**
 * HTML2JS is a Grunt plugin that takes all of your template files and
 * places them into JavaScript files as strings that are added to
 * AngularJS's template cache. This means that the templates too become
 * part of the initial payload as one JavaScript file. Neat!
 */
  grunt.config('html2js', {
	  /**
	   * These are the templates from `src/app`.
	   */
	  app: {
	    options: {
	      base: 'src/app'
	    },
	    src: '<%= app_files.atpl %>',
	    dest: '<%= build_dir %>/templates-app.js'
	  },

	  /**
	   * These are the templates from `src/common`.
	   */
	  common: {
	    options: {
	      base: 'src/common'
	    },
	    src: [ '<%= app_files.ctpl %>'],
	    dest: '<%= build_dir %>/templates-common.js'
	  },
	  lib_common: {
	    options: {
	      base: 'lib'
	    },
	    src: [ '<%= common_files.tpl %>'],
	    dest: '<%= build_dir %>/templates-lib-common.js'
	  }
	}
  );

  grunt.loadNpmTasks('grunt-html2js');
};