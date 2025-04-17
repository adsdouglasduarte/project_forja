const fs = require('fs')

module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-cssmin")
  grunt.loadNpmTasks("grunt-contrib-uglify")
  grunt.loadNpmTasks("grunt-contrib-imagemin")
  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.loadNpmTasks("grunt-contrib-less")
  grunt.loadNpmTasks("grunt-contrib-htmlmin")
  grunt.loadNpmTasks("grunt-include-replace")
  grunt.loadNpmTasks("grunt-contrib-copy")
  grunt.loadNpmTasks("grunt-contrib-clean")

  grunt.initConfig({
    less: {
      development: {
        files: {
          "dist/css/main.css": "src/less/main.less",
        },
      },
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: "dist/css/",
          src: ["*.css", "!*.min.css"],
          dest: "dist/css/",
          ext: ".min.css",
        }],
      },
    },

    uglify: {
      my_target: {
        files: {
          "dist/js/app.min.js": ["src/js/*.js"],
        },
      },
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: "src/img/",
          src: ["**/*.{png,jpeg,jpg,gif}"],
          dest: "dist/img/",
        }],
      },
    },

    includereplace: {
      dist: {
        options: {
          includesDir: "src/partials",
        },
        files: [{
          src: "src/index.html",
          dest: "dist/index.html",
        }],
      },
    },

    copy: {
      fonts: {
        expand: true,
        cwd: 'src/assets/fonts/',
        src: '**/*',
        dest: 'dist/fonts/'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        },
        files: {
          "dist/index.html": "dist/index.html",
        },
      },
    },

    watch: {
      css: {
        files: ["src/css/**/*.css"],
        tasks: ["cssmin"],
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify"],
      },
      images: {
        files: ["src/img/**/*.{png,jpeg,jpg,gif}"],
        tasks: ["imagemin"],
      },
      less: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "cssmin", "clean:css"],
      },
      html: {
        files: ["src/**/*.html", "src/partials/**/*.html"],
        tasks: ["includereplace", "htmlmin"],
      },
      fonts: {
        files: ["src/assets/fonts/**/*"],
        tasks: ["copy"],
      },
    },

    clean: {
      css: ["dist/css/*.css", "!dist/css/*.min.css"],
    },
  })

  grunt.registerTask("default", [
    "less",
    "cssmin",
    "clean:css",
    "uglify",
    "imagemin",
    "copy",
    "includereplace",
    "htmlmin"
  ])

  grunt.registerTask("build", ["default"])
}
