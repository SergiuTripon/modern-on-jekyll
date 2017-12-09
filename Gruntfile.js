module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // css processors
        sass: {
            options: {
                compress: false,
                sourcemap: 'none'
            },
            scss: {
                files: [{
                    expand: true,
                    cwd: '_assets/sass/',
                    src: ['*.scss'],
                    dest: 'assets/css/',
                    ext: '.min.css'
                }]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core'),
                    require('csswring')
                ]
            },
            mincss: {
                files: [{
                    expand: true,
                    cwd: 'assets/css/',
                    src: ['*.min.css'],
                    dest: 'assets/css/'
                }]
            }
        },
        // js processors
        import: {
            js: {
                expand: true,
                cwd: '_assets/js/',
                src: ['*.js'],
                dest: 'assets/js/',
                ext: '.min.js'
            }
        },
        uglify: {
            minjs: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: ['*.min.js'],
                    dest: 'assets/js/',
                    ext: '.min.js'
                }]
            }
        },
        // favicon generator
        realFavicon: {
            favicons: {
                src: '_assets/icons/favicon.png',
                dest: 'assets/icons',
                options: {
                    iconsPath: "{{ '/assets/icons' | prepend: site.baseurl | prepend: site.url }}",
                    html: ['_includes/head/styles.html'],
                    design: {
                        ios: {
                            pictureAspect: 'noChange',
                            assets: {
                                ios6AndPriorIcons: false,
                                ios7AndLaterIcons: false,
                                precomposedIcons: false,
                                declareOnlyDefaultIcon: true
                            }
                        },
                        desktopBrowser: {},
                        windows: {
                            pictureAspect: 'noChange',
                            backgroundColor: '#2b5797',
                            onConflict: 'override',
                            assets: {
                                windows80Ie10Tile: false,
                                windows10Ie11EdgeTiles: {
                                    small: false,
                                    medium: true,
                                    big: false,
                                    rectangle: false
                                }
                            }
                        },
                        androidChrome: {
                            pictureAspect: 'shadow',
                            themeColor: '#f0f5f5',
                            manifest: {
                                name: 'Modern',
                                display: 'standalone',
                                orientation: 'notSet',
                                onConflict: 'override',
                                declared: true
                            },
                            assets: {
                                legacyIcon: false,
                                lowResolutionIcons: false
                            }
                        },
                        safariPinnedTab: {
                            pictureAspect: 'silhouette',
                            themeColor: '#3b9df3'
                        }
                    },
                    settings: {
                        compression: 2,
                        scalingAlgorithm: 'Mitchell',
                        errorOnImageTooSmall: false
                    }
                }
            }
        },
        // copy css and js
        copy: {
          mincss: {
              expand: true,
              cwd: 'assets/css/',
              src: ['*.min.css'],
              dest: '_site/assets/css/'
          },
          minjs: {
              expand: true,
              cwd: 'assets/js/',
              src: ['*.min.js'],
              dest: '_site/assets/js/'
          }
        },
        // jekyll build and run ruby scripts
        shell: {
            jekyll_drafts: {
                command: 'jekyll build --drafts'
            },
            jekyll: {
                command: 'jekyll build --config _config.yml,_config-dev.yml'
            },
            archive: {
                command: 'ruby archive/_archive.rb'
            }
        },
        // watch
        watch: {
            css: {
                files: ['_assets/sass/*.scss'],
                tasks: ['sass', 'postcss', 'copy:mincss']
            },
            js: {
                files: ['_assets/js/*.js'],
                tasks: ['import', 'uglify', 'copy:minjs']
            },
            jekyll: {
                files: ['*.html', '*.md', '*.yml', '*.png', '*.ico', '*.xml', '_assets/**', '_drafts/*', '_includes/**', '_layouts/*', '_posts/*', 'archive/**'],
                tasks: ['shell:jekyll', 'shell:archive']
            }
        },
        // serve
        connect: {
            server: {
                options: {
                    livereload: true,
                    base: '_site/',
                    port: 4000
                }
            }
        }
    });

    // register tasks
        grunt.registerTask('gen-favicon', [
            'realFavicon'
        ]);

    grunt.registerTask('build', [
        'sass',
        'postcss',
        'import',
        'uglify',
        'shell:jekyll',
        'shell:archive',
        'shell:jekyll'
    ]);

    grunt.registerTask('serve', [
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('build-serve', [
        'sass',
        'postcss',
        'import',
        'uglify',
        'shell:jekyll',
        'shell:archive',
        'shell:jekyll',
        'connect:server',
        'watch'
    ]);
};
