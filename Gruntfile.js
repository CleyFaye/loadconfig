const loadGruntTasks = require("load-grunt-tasks");

module.exports = grunt => {
  loadGruntTasks(grunt);
  grunt.initConfig({
    clean: {
      cache: [
        ".tscache",
        ".tsbuildinfo",
        "**/.cache",
      ],
      build: [
        "lib",
      ],
    },
    ts: {build: {tsconfig: "./tsconfig.json"}},
  });

  grunt.registerTask(
    "build",
    "Build the project into JavaScript files",
    ["ts:build"],
  );

  grunt.registerTask("default", "build");
};
