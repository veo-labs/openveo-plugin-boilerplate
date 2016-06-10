'use strict';

var fs = require('fs');
var path = require('path');

var config = require('../config/files');

module.exports = function() {

  var pluginName = this.properties.templated.Plugin;
  var self = this;

  config.folders.forEach(function(folder) {
    var basename = path.basename(folder);
    var renamed = folder.replace(basename, basename + pluginName);

    fs.renameSync(self.properties.url + '/' + folder, self.properties.url + '/' + renamed);
  });

  // create folders
  fs.mkdirSync(this.properties.url + 'app/server/controllers');
  fs.mkdirSync(this.properties.url + 'app/server/models');
  fs.mkdirSync(this.properties.url + 'app/server/providers');

  // Call sub-generator
  if (this.properties.answers.entityGenerator) {
    this.composeWith('openveo-plugin:entity', {
      options: {
        plugin: this.properties.templated.plugin
      }
    });
  }

  // Change folder to install dependencies
  process.chdir(this.properties.url);

  this.installDependencies({
    skipInstall: this.options['skip-install']
  });
};
