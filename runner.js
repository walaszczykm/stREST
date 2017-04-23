var request = require('request');
var chalk = require('chalk');
var jsonfile = require('jsonfile');
var comp = require('./comparer');

class Runner {
    constructor(config){
        this.config = config;
        this.result = [];
    }

    run(){
        console.log(chalk.yellow('tests start'));
        this.loopOverTasks(this.config);
    }

    loopOverTasks(tasks){
        tasks.forEach((task) => {
            this.startTest(task);
        });
    }

    startTest(task) {
        request(task.request, (error, response) => {
            if(!error){
                this.testResponse(task.response, response);
            }
        });
    }

    testResponse(expectedResponse, response) {

        this.result.push(
                comp(expectedResponse, response).getResult()
            );

        if(this.result.length == this.config.length){
            this.saveResult();
        }
    }

    saveResult() {
        var prettyResult = JSON.stringify(this.result, null, 2);
        console.log('%s\n%s', 
            chalk.green('tests finished with result:'),
            chalk.cyan(prettyResult));
    }
}

module.exports = (config) => {
    return new Runner(config);
}