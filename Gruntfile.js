/**
 * Filename: Gruntfile.js
 * Description: Build tool.
 * Author: Den Isahac
 * Author URI: https://github.com/denisahac
 */
module.exports = function(grunt) {
  // Initialize configuration
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // Syntactically Awesome Stylesheets
      // https://github.com/gruntjs/grunt-contrib-sass
      sass: {
          options: {
              loadPath: [
                'library/components/foundation-sites/scss',
                'library/components/motion-ui'
              ],
              noCache: true
          },
          dist: {
              options: {
                  style: 'compressed'
              },

              files: [{
                expand: true,
                cwd: 'library/scss',
                src: ['*.scss'],
                dest: 'library/css',
                ext: '.css'
              }]
          }
      },

      // CSS3 autoprefixer
      // https://www.npmjs.com/package/grunt-autoprefixer
      autoprefixer: {
          css: {
              src: 'library/css/*.css'
          }
      },

      // CSS minifier
      cssmin: {
        options: {
          sourceMap: false,
        },

        css: {
          files: {
            'library/css/app.min.css':
            [
              // Lightbox2
              'library/components/lightbox2/dist/css/lightbox.min.css',
              // Animate
              'library/components/animate.css/animate.min.css',
              // App
              'library/css/app.css',
            ]
          }
        }
      },

      // Javascript linter
      // https://www.npmjs.com/package/grunt-contrib-jshint
      jshint: {
          // Grunt
          grunt: {
              files: {
                  src: ['Gruntfile.js']
              }
          },
          // Library scripts
          scripts: {
              options: {
                ignores: ['library/js/*.min.js', 'library/js/lib/*.js']
              },
              files: {
                  src: ['library/js/*.js']
              }
          }
      },

      // Javascript merger
      // https://github.com/gruntjs/grunt-contrib-concat
      concat: {
        options: {
          sourceMap: false
        },
        scripts: {
          src:
          [
            // Console message
            'library/components/console.message/console.message.min.js',
            // jQuery
            'library/components/jquery/dist/jquery.min.js',
            // What input?
            'library/components/what-input/what-input.min.js',
            // Smooth scroll
            'library/js/lib/smoothscroll.min.js',
            // Font face observer
            'library/components/fontfaceobserver/fontfaceobserver.js',
            // Particle
            'library/components/particles.js/particles.min.js',
            // Stellar
            'library/components/jquery.stellar/jquery.stellar.min.js',
            // Images loaded
            'library/components/imagesloaded/imagesloaded.pkgd.min.js',
            // Lightbox2
            'library/components/lightbox2/dist/js/lightbox.min.js',
            // WOW
            'library/components/wow/dist/wow.min.js',
            // Foundation v6.*
            'library/components/foundation-sites/dist/plugins/foundation.core.js', // core
            'library/components/foundation-sites/dist/plugins/foundation.util.mediaQuery.js', // media query
            'library/components/foundation-sites/dist/plugins/foundation.util.timerAndImageLoader.js', // timer and image loader
            'library/components/foundation-sites/dist/plugins/foundation.equalizer.js', // equalizer
            'library/components/foundation-sites/dist/plugins/foundation.abide.js', // abide
            // APP
            'library/js/app.js'
          ],
          dest: 'library/js/app.min.js'
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
            'library/js/app.min.js': ['library/js/app.min.js'],
          }
        }
      },

      // File watcher
      // https://www.npmjs.com/package/grunt-contrib-watch
      watch: {
          // Grunt
          grunt: {
              options: {
                  reload: true
              },
              files: ['Gruntfile.js'],
              tasks: ['jshint:grunt']
          },
          // Syntactically Awesome Stylesheets
          sass: {
              files: 'library/scss/**/*.scss',
              tasks: ['sass', 'autoprefixer']
          },
          // Library scripts
          scripts: {
              files: ['library/js/app.js'],
              tasks: ['jshint:scripts']
          }
      },

      // Image minifier
      // https://www.npmjs.com/package/grunt-contrib-imagemin
      imagemin: {
        options: {
          optimizationLevel: 7
        },

        images: {                          // Another target
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'library/images',         // src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'library/images'         // Destination path prefix
          }]
        }
      },

      // Browser Sync
      // https://www.browsersync.io/docs/grunt/
      browserSync: {
          dev: {
              options: {
                  watchTask: true,
                  proxy: 'http://localhost/denisahac.github.io',
                  port: 9000,
                  ui: {
                    port: 9001
                  }
              },
              bsFiles: {
                  src: [
                      // CSS
                      'library/css/*.css',

                      // Javascript
                      'library/js/*.js',

                      // HTML
                      '*.html',
                      '**/*.html'
                  ]
              }
          }
      }
  });

  // Load plugin(s)
  grunt.loadNpmTasks('grunt-contrib-sass');             // SASS to CSS converter
  grunt.loadNpmTasks('grunt-autoprefixer');             // CSS3 autoprefixer
  grunt.loadNpmTasks('grunt-contrib-cssmin');           // CSS minifier
  grunt.loadNpmTasks('grunt-contrib-jshint');           // Javascript linter
  grunt.loadNpmTasks('grunt-contrib-concat');           // Javascript merger
  grunt.loadNpmTasks('grunt-contrib-uglify');           // Javascript minifier
  grunt.loadNpmTasks('grunt-contrib-watch');            // File watcher
  grunt.loadNpmTasks('grunt-contrib-imagemin');         // Image minifier
  grunt.loadNpmTasks('grunt-browser-sync');             // Browsing testing synchronization

  // Register task(s)
  grunt.registerTask('build', [
      'sass',
      'autoprefixer',
      'jshint',
      'browserSync',
      'watch'
  ]);                                                   // Run this task with 'grunt build' command

  grunt.registerTask('deploy', [
      'sass',
      'autoprefixer',
      'cssmin',
      'jshint',
      // 'concat',
      // 'uglify',
      'imagemin'
  ]);                                                   // Run this task on deployment with 'grunt deploy' command

  grunt.registerTask('default', 'build');               // Default task
};
