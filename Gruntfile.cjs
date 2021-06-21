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
    shell: {
      ts_build: {
        command: "npm exec tsc",
        stdout: true,
        stderr: true,
      },
    },
  });

  grunt.registerTask(
    "build",
    "Build the project into JavaScript files",
    ["shell:ts_build"],
  );

  grunt.registerTask("default", "build");
};
