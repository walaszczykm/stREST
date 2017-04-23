var request = require('request');
var chalk = require('chalk');

var result = [];
var tasksNumber = 0;

module.exports = (config) => {
    console.log(chalk.yellow('runner start'));
    tasksNumber = config.length;
    loopOverTasks(config);
}

var loopOverTasks = (tasks) => {
    
    tasks.forEach((task) => {
        startTest(task);
    });
}

var startTest = (task) => {
    request(task.request, (error, response) => {
        if(!error){
            testResponse(task.response, response);
        }
    });
}

var testResponse = (responseComparer, response) => {
     result.push({
        statusCode: responseComparer.statucCode == response.statucCode
     });

     if(result.length == tasksNumber){
         saveResult();
     }
}

var saveResult = () => {
    console.log(JSON.stringify(result, null, 2));
}