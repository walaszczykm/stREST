const axios = require('axios');
const chalk = require('chalk');
const respComp = require('./response-comparer');
const jsonfile = require('jsonfile');
const utils = require('./utils');

module.exports = {
    run(tasks){
        console.log(chalk.yellow('tests run'));

        var allResults = [];
        tasks.forEach((task) => {
            this.testRepeatLoop(task, (result) => {
                allResults.push({
                    name: task.name,
                    results: result
                });
                if(allResults.length == tasks.length){
                    this.saveResult(allResults);
                }
            } );
        });
    },

    testRepeatLoop(task, callback){
        var subResult = [];
        for (var index = 1; index <= task.repeat; index++) {
            var startTime = process.hrtime();
            this.test(task, (result) => {
                subResult.push({
                    time: process.hrtime(startTime)[1]/1000000, //[1] is nanosec so /1000000 is milisec
                    values: result
                });
                if(subResult.length == task.repeat){
                    callback(subResult);
                }
            });
        }
    },

    test(task, callback) {
        axios(task.request)
        .then((response) => {
            callback(respComp.getResult(task.response, response));
        })
        .catch(err => {
            callback(respComp.getResult(task.response, err.response));
        });
    },

    saveResult(results) {
        var prettyResults = JSON.stringify(results, null, 2);
        console.log('%s\n%s', 
            chalk.green('tests finished with result:'),
            chalk.cyan(prettyResults));

        jsonfile.writeFile(utils.resultFilePath, results, {spaces: 2}, err => {
            if(err){
                console.log(chalk.red('failed to save results json file: ', err));
            }
            else{
                console.log(chalk.green('results saved in ', utils.resultFileName));
            }
        });
    }
}