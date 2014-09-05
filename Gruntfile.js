
var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt){ 

    grunt.initConfig({

        uglify: {
            my_target: {
                files: {
                    'js/scripts.min.js': ['js/plugins/tableCheckable/*.js'
                                         ,'js/plugins/select2/*.js'
                                         ,'js/*.js'
                                         ,'js/demos/charts/morris/*.js'
                                         ,'js/demos/*.js']
                }
            } //my_target
        }, //uglify



        watch: {
            scripts: {
                files: ['js/plugins/tableCheckable/*.js',
                        'js/plugins/select2/*.js',
                        'js/*.js',
                        'js/demos/charts/morris/*.js',
                        'js/demos/*.js'],
                tasks: ['uglify'],
                options: { spawn: false, }
             
                }, //scripts

            images: { 
                files: ['img/*/*.{PNG,jpg,gif}'],
                tasks: ['imagemin'],
                options: { spawn: false, }
                 
                }//images


    
              
            }, //watch



        imagemin: {                        // Task
            
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    use: [mozjpeg()]
                    },

                files: {                         // Dictionary of files
                    'images/img.png': 'img/img.png', // 'destination': 'source'
                    'images/img.jpg': 'img/img.jpg',
                    'images/img.gif': 'img/img.gif'
                    }
                },


            dynamic: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'img/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'images/'                  // Destination path prefix
                }]
            }
        }

    


    }); 


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['imagemin']);


};
