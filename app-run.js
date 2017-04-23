var fs = require('fs');
var jsonfile = require('jsonfile');
var utils = require('./utils');
var chalk = require('chalk');
var runner = require('./runner');

if(!fs.exists(utils.configFilePath)){
    console.log(chalk.red('% ', utils.configFileName));    
    process.exit();
}

jsonfile.readFile(utils.configFilePath, (err, config) => {
    if(err){
        console.log(chalk.red('faild to load %s:\n%s'. utils.configFileName, err));
    }
    else{
        runner(config);
    }
})
