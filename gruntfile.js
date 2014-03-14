module.exports = function(grunt){

	grunt.initConfig({
		open: {
			test_widget: {
				path: "test\\WidgetSpec.html"
			},
			sandbox: {
				path: "sandbox\\index.html"
			}
		},

		copy: {
			test_widget: {
				files: [
					{expand: true, flatten: true, src: ['dev/Surge.CheckBoxList.js'], dest: 'dist/'}
				]
			},
			sandbox: {
				files: [
					{expand: true, src: ['dev/*'], dest: 'sandbox/'}
				]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-open');


	grunt.registerTask('test-widget', ['copy:test_widget', 'open:test_widget']);
	grunt.registerTask('sandbox', ['copy:sandbox', 'open:sandbox']);
};