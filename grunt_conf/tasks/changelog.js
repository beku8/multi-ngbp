module.exports = function(grunt) {
/**
 * Creates a changelog on a new version.
 */
  grunt.config('changelog', {
      options: {
        dest: 'CHANGELOG.md',
        template: 'changelog.tpl'
      }
    });

  grunt.loadNpmTasks('grunt-conventional-changelog');

};


    