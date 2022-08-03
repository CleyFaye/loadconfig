/* eslint-disable camelcase */
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
    run: {
      ts_build: {
        cmd: "npx",
        args: ["tsc"],
      },
    },
  });

  grunt.registerTask(
    "build",
    "Build the project into JavaScript files",
    ["run:ts_build"],
  );

  grunt.registerTask("default", "build");
};
