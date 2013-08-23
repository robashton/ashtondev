module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'public/javascripts/app.js': [ 'client.js' ]
    },
    watch: {
      scripts: {
        files: [ "client.js"],
        tasks: [ 'browserify' ]
      },
    },
    nodemon: {
      app: {
        options: {
          file: "app.js",
          ignoredFiles: ['client.js', 'node_modules/**/**', 'public/**/**']
        }
      }
    },
    concurrent: {
      target: {
        tasks: [ 'watch:scripts', 'nodemon:app' ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  })

  grunt.registerTask('develop', ['concurrent'])
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-nodemon')
}
