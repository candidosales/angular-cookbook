module.exports = function(grunt) {

    // 1. Time how long tasks take
    require('time-grunt')(grunt);

    // 2. load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // 3. All configuration goes here
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.min.css': 'dev/scss/style.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    'dist/css/style.css': 'dev/scss/style.scss'
                }
            }
        },
        concat: {
          dev: {
            src: [
                  'bower_components/jquery/dist/jquery.js',
                  'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                  'bower_components/angular/angular.js',
                  'bower_components/angular-bootstrap/ui-bootstrap.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                  'bower_components/angular-ui-router/release/angular-ui-router.js',
                  'dev/js/app.js'],
            dest: 'dist/js/main.js',
          },
        },
        uglify: {
          dev: {
            files: {
              'dist/js/main.min.js': ['dist/js/main.js']
            }
          }
        },
        imagemin: {
          dynamic: {                         // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'dev/img/',                   // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'dist/img/'                  // Destination path prefix
            }]
          }
        },
        includereplace: {
          html: {
            src: '*.html',
            dest: 'dist/'
          }
        },
        copy: {
          main: {
            files: [
              {expand: true, flatten: true, src: ['bower_components/foundation/js/vendor/modernizr.js'], dest: 'dist/js/', filter: 'isFile'}
            ]
          },
        },
        watch: {
          options: {
            livereload: true,
          },
          css: {
            files: 'dev/scss/**/*.scss',
            tasks: ['sass:dev'],

          },
          img: {
            files: 'dev/img/**/*.{png,jpg,gif}',
            tasks: ['imagemin'],
          },
          js: {
            files: 'dev/js/**/*.js',
            tasks:['concat:dev']
          },
          html:{
            files: ['*.html', 'dev/includes/**/*.html'],
            tasks: ['includereplace:html']
          },
        },
        connect: {
          server: {
            options: {
              port: 8000,
              base: './'
            }
          }
        }
    });

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass:dev']);

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.registerTask('prod', ['sass:dev','sass:dist','concat:dist','uglify']);

};
