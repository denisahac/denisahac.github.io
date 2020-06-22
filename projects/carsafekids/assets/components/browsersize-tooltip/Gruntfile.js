/**
 * File name: Gruntfile.js
 * Description: Build tool
 * Author: den.isahac
 * Author URI: https://github.com/denisahac
 *
 */

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Initialize configuration
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // ES6 transpilier
      // https://github.com/babel/grunt-babel
      babel: {
        options: {
          presets: ['es2015']
        },

        dist: {
          files: {
            'dist/browsersize-tooltip.js': 'browsersize-tooltip.js'
          }
        }
      },

      // Javascript minifier
      // https://www.npmjs.com/package/grunt-contrib-uglify
      uglify: {
        scripts: {
          options: {
            sourceMap: false
          },
          files: {
            'dist/browsersize-tooltip.min.js': ['dist/browsersize-tooltip.js']
          }
        }
      }

  });

  // Load plugin(s)
  grunt.loadNpmTasks('grunt-contrib-uglify');           // Javascript minifier

  grunt.registerTask('build', [
      'babel',
      'uglify'
  ]);                                                   // Run this task on deployment with 'grunt deploy' command


  grunt.registerTask('default', 'build');               // Default task
};
