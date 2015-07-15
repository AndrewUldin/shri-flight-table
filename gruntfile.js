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
					// './bower_components/jquery/dist/jquery.min.js',
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
			normalize: {
				files: [
					{
						src: ['./bower_components/normalize.css/normalize.css'], 
						dest: './public/assets/css/normalize.css', 
					},
				],
			},
			jquery: {
				files: [
					{
						src: ['./bower_components/jquery/dist/jquery.min.map'], 
						dest: './public/assets/js/jquery.min.map', 
					},
					{
						src: ['./bower_components/jquery/dist/jquery.min.js'], 
						dest: './public/assets/js/jquery.min.js', 
					},
				],
			},
			fontawesome: {
				files: [
					{
						expand: true,
						cwd: './bower_components/fontawesome/css/',
						src: '**', 
						dest: './public/assets/css/', 
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: './bower_components/fontawesome/fonts/',
						src: '**', 
						dest: './public/assets/fonts/', 
						filter: 'isFile'
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
				tasks: ['concat:js'], //tasks to run
			},
			less: {
				files: ['./app/assets/css/*.less'],	//watched files
				tasks: ['less', 'copy:normalize'], //tasks to run
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