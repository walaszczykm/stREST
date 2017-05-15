const axios = require('axios');
const chalk = require('chalk');
const sleep = require('system-sleep');
const respComp = require('./response-comparer');
const jsonfile = require('jsonfile');
const utils = require('./utils');

module.exports = {
    run(tasks){
        console.log(chalk.green('tests run'));

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
            console.log(chalk.yellow(`task: ${task.name}, test number: ${index}`));
            this.test(task, (result) => {
                subResult.push(result);
                if(subResult.length == task.repeat){
                    callback(subResult);
                }
            });
            sleep(task.delay);
        }
    },

    test(task, callback){
        var result = {
            time: 0,
            values: {},
        }
        var startTime = process.hrtime();
        // @ts-ignore
        axios(task.request)
        .then((response) => {
            result.values = respComp.getResult(task.response, response)
        })
        .catch(err => {
            result.values = respComp.getResult(task.response, err.response)
        })
        .then(() => {
            result.time = process.hrtime(startTime)[1]/1000000; //[1] is nanosec so /1000000 is milisec
            callback(result);
        });
    },

    saveResult(results) {
        var prettyResults = JSON.stringify(results, null, 2);
        console.log(chalk.cyan(prettyResults));

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