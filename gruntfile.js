module.exports = function(grunt){

	grunt.initConfig({
		open: {
			sandbox: {
				path: "sandbox\\index.html"
			}
		},

		copy: {
			sandbox: {
				files: [
					{expand: true, src: ['dev/'], dest: 'sandbox/'}
				]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('sandbox', ['copy:sandbox', 'open:sandbox']);
};