//Gruntfile
module.exports = function(grunt) {

	//Initializing the configuration object
	grunt.initConfig({

		// Task configuration
		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
					// './bower_components/jquery/jquery.js',
					// './bower_components/bootstrap/dist/js/bootstrap.js',
					'./app/assets/js/frontend.js'
				],
				dest: './public/assets/js/frontend.js'
			},
		},
		less: {
			development: {
				options: {
					compress: false	//minifying the result
				},
				files: {
					//compiling frontend.less into frontend.css
					"./public/assets/css/frontend.css":"./app/assets/css/frontend.less"
				}
			}
		},
		uglify: {
			options: {
				mangle: false	// Use if you want the names of your functions and variables unchanged
			},
			frontend: {
				files: {
					'./public/assets/js/frontend.js': './public/assets/js/frontend.js',
				}
			},
		},
		copy: {
			main: {
				files: [
					{
						src: ['./bower_components/normalize.css/normalize.css'], 
						dest: './public/assets/css/normalize.css', 
					},
				],
			},
		},
		watch: {
			frontend: {
				files: [
					//watched files
					// './bower_components/jquery/jquery.js',
					// './bower_components/bootstrap/dist/js/bootstrap.js',
					'./app/assets/js/frontend.js'
					],	 
				tasks: ['concat:js','uglify:js'], //tasks to run
			},
			less: {
				files: ['./app/assets/css/*.less'],	//watched files
				tasks: ['less', 'copy:main'], //tasks to run
			},
		}
	});

	// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Task definition
	grunt.registerTask('default', ['watch']);
};