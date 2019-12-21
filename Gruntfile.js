const loadGruntTasks = require("load-grunt-tasks");

module.exports = grunt => {
  loadGruntTasks(grunt);
  grunt.initConfig({
    "clean": {
      build: [
        "lib",
        ".tscache"
      ],
    },
    "ts": {
      build: {
        tsconfig: "./tsconfig.json",
        passThrough: true,
      },
    },
  });
  
  grunt.registerTask(
    "build",
    "Build the project into JavaScript files",
    [
      "ts:build",
    ]
  );

  grunt.registerTask(
    "default",
    "build"
  );
};
