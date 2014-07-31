module.exports = function(grunt) {
/**
 * `coffeelint` does the same as `jshint`, but for CoffeeScript.
 * CoffeeScript is not the default in ngBoilerplate, so we're just using
 * the defaults here.
 */
  grunt.config('coffeelint', {
    src: {
      files: {
        src: [ '<%= app_files.coffee %>', '<%= common_files.coffee %>' ]
      }
    },
    test: {
      files: {
        src: [ '<%= app_files.coffeeunit %>', '<%= common_files.coffeeunit %>' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-coffeelint');
};