var request = require('request');
var chalk = require('chalk');

class Runner {
    constructor(config){
        this.config = config;
        this.result = [];

        console.log(chalk.yellow('runner start'));
        this.loopOverTasks(config);
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

    testResponse(responseComparer, response) {
        this.result.push({
            statusCode: responseComparer.statucCode == response.statucCode
        });

        if(this.result.length == this.config.length){
            this.saveResult();
        }
    }

    saveResult() {
        console.log(JSON.stringify(this.result, null, 2));
    }
}

module.exports = (config) => {
    new Runner(config);
}