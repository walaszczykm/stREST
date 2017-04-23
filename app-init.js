var jsonfile = require('jsonfile');
var chalk = require('chalk');
var utils = require('./utils');

var config =
[
    {
        "repeat": 1,
        "collect":"all",
        "request":{
            "url":"https://jsonplaceholder.typicode.com/posts",
            "method":"GET",
            "headers":
            [
                {
                    "key":"Accept",
                    "value":"application/json"
                }
            ]
        },
        "response":{
            "statusCode": 200,
            "statusName": "OK",
            "maxTime":"number",
            "contentType":"json",
            "jsonObjects": 100
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