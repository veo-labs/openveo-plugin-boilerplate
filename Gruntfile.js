'use strict';

/* eslint no-sync: 0 */
var path = require('path');
var fs = require('fs');
var openVeoApi = require('@openveo/api');

process.rootBoiler = __dirname;
process.requireBoiler = function(filePath) {
  return require(path.normalize(process.rootBoiler + '/' + filePath));
};

/**
 * Loads a bunch of grunt configuration files from the given directory.
 *
 * Loaded configurations can be referenced using the configuration file name.
 * For example, if myConf.js returns an object with a property "test", it will be accessible using myConf.test.
 *
 * @param {String} path Path of the directory containing configuration files
 * @return {Object} The list of configurations indexed by filename without the extension
 */
function loadConfig(path) {
  var configuration = {};
  var configurationFiles = fs.readdirSync(path);

  configurationFiles.forEach(function(configurationFile) {
    configuration[configurationFile.replace(/\.js$/, '')] = require(path + '/' + configurationFile);
  });

  return configuration;
}

module.exports = function(grunt) {

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  grunt.initConfig(config);
  grunt.config.merge(loadConfig('./tasks'));

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mkdocs');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerMultiTask('rename', openVeoApi.grunt.renameTask(grunt));
  grunt.registerMultiTask('remove', openVeoApi.grunt.removeTask(grunt));

  // Generate documentation
  grunt.registerTask('doc', ['remove:doc', 'mkdocs', 'rename:doc']);

  // Deploy documentation to github pages
  grunt.registerTask('deploy-doc', ['doc', 'gh-pages:doc']);

};
