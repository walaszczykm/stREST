var clear = require('clear');
var utils = require('./utils');
var program = require('commander');

clear();
utils.greet();

program.version('1.0.0')
.command('run', 'start tests specified in strest.config.json file', {isDefault: true})
.command('init', 'initialize config file');

program.parse(process.argv);
