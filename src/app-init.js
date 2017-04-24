var jsonfile = require('jsonfile');
var chalk = require('chalk');
var utils = require('./utils');

var config =
[
    {
        "name": "jsonplaceholder-posts",
        "repeat": 1,
        "collect": "all",
        "request": {
        "url": "https://jsonplaceholder.typicode.com/posts",
        "method": "GET",
        "headers":{
                "accept": "application/json"
            },
        },
        "response": {
        "status": 200,
        "statusText": "OK",
        "headers":{
            "content-type": "application/json; charset=utf-8"
            }
        }
    }
]

var filePath = utils.configFilePath

jsonfile.writeFile(filePath, config, {spaces: 2}, (err) => {
    if(err){
        console.log(chalk.red('Failed to create %s:\n%s', utils.configFileName, err));
    }
    else{
        console.log(chalk.green('strest.config.josn created, happy testing!'));
    }
});