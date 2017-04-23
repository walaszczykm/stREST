var fs = require('fs');
var jsonfile = require('jsonfile');
var utils = require('./utils');
var chalk = require('chalk');
var runner = require('./runner');

fs.exists(utils.configFilePath, (exists) => {
    if(!exists){
        console.log(chalk.red(utils.configFilePath, 'not exists'));    
        process.exit();
    }
});

jsonfile.readFile(utils.configFilePath, (err, config) => {
    if(err){
        console.log(chalk.red('faild to load ', utils.configFileName));
    }
    else{
        runner(config).run();
    }
})
