var chalk = require('chalk');
var figlet = require('figlet');
var path = require('path');

module.exports = {
    configFileName: 'strest.config.json',
    configFilePath: path.join(process.cwd(), 'strest.config.json'),
    resultFileName: 'test.results.json',
    resultFilePath: path.join(process.cwd(), 'test.results.json'),
    greet() {
        console.log(
                '%s\n%s',
                chalk.blue(figlet.textSync('stREST')),
                chalk.blue('Node.js cli tool for stress testing REST APIs\n')
            );
    }
}