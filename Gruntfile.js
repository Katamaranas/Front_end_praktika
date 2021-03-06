module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    compass: {
      options: {
        sassDir: 'src/assets/sass',
        imagesDir: 'src/img',
        cssDir: 'web/assets/css',
        force: true
      },
      dist: {
        options: {
          environment: 'production',
          noLineComments: true
        }
      },
      dev: {
        options: {
          noLineComments: true
        }
      },
      watch: {
        options: {
          noLineComments: true,
          watch: true
        }
      }
    },
    assemble: {
      options: {
        layoutdir: 'src/templates/layouts',
        layout: ['default.hbs'],
        partials: ['src/templates/partials/{,*/}*.*', 'src/sprites/svg/*'],
        helpers: ['partial'],
        flatten: true
      },
      en: {
        options: {
          data: ['src/templates/data/en/*.yml']
        },
        src: ['src/templates/pages/en/*.hbs'],
        dest: './web'
      }
    },
    watch: {
      options: {
      },
      dev: {
        files: ['src/assets/sass/**/*.scss', 'src/templates/**/*.hbs'],
        tasks: ['compass:dev', 'assemble:site']
      },
      handlebars: {
        files: ['src/templates/*/*.hbs', 'src/templates/layouts/*.hbs' ],
        tasks: ['assemble:site']
      }
    },
    svg_sprite: {
      generate: {
        cwd: 'web/assets/vendor/material-design-icons',
        src: [
          '../../../../web/assets/images/ic_menu_24px.svg',
          '../../../../web/assets/images/ic_halfmoon_24px.svg',
          '../../../../web/assets/images/ic_search_24px.svg',
          '../../../../web/assets/images/ic_hot_24px.svg',
          '../../../../web/assets/images/ic_trending_24px.svg',
          '../../../../web/assets/images/ic_fresh_24px.svg',
          '../../../../web/assets/images/ic_star_24px.svg',
          '../../../../web/assets/images/ic_more_24px.svg',
          '../../../../web/assets/images/ic_comment_24px.svg',
          '../../../../web/assets/images/ic_up_24px.svg',
          '../../../../web/assets/images/ic_down_24px.svg',
          '../../../../web/assets/images/ic_facebook_24px.svg',
          '../../../../web/assets/images/ic_pinterest_24px.svg',
          '../../../../web/assets/images/ic_loading_24px.svg',
          '../../../../web/assets/images/ic_facebookfilled_24px.svg',
          '../../../../web/assets/images/ic_google_24px.svg',
          '../../../../web/assets/images/ic_uparrow_24px.svg',          
                      ],
        dest: 'src/sprites',
        options: {
          shape: {
            id: {
              generator: function(filename) {
                var id = filename.match(/ic_(\w+)_\d+/);
                return id[1];
              }
            },
          },
          mode: {
            symbol: {
              dest: ''
            }
          }
        }
      }
    },
  });

  [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-assemble',
    'grunt-svg-sprite'
  ].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('assemble:site', [
    'assemble:en',
  ]);
  // Default task(s).
  grunt.registerTask('default', [
    'compass:dist',
    'assemble:en',
  ]);

};
