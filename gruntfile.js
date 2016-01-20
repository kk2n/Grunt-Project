module.exports = function(grunt) {
  var sassStyle = 'expanded';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //预处理SCSS文件
    sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './css/main.css': './_scss/main.scss'
        }
      }
    },
    //合并js文件
    concat: {
      dist: {
        src: ['./_scripts/plugin.js', './_scripts/plugin2.js'],
        dest: './js/global.js'
      }
    },
    //压缩js
    uglify: {
      compressjs: {
        files: {
          './script/global.min.js': ['./js/global.js']
        }
      }
    },
    //检查js语法
    jshint: {
      all: ['./js/global.js']
    },
    //建立监听任务
    watch: {
      scripts: {
        files: ['./_scripts/plugin.js','./_scripts/plugin2.js'],
        tasks: ['concat','jshint','uglify']
      },
      sass: {
        files: ['./_scss/main.scss'],
        tasks: ['sass']
      },
      //监听服务器负载
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'index.html',
          'main.css',
          './js/global.min.js'
        ]
      }
    },
    //新建服务器监听文件变化
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('outputcss',['sass']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
  grunt.registerTask('default');

};