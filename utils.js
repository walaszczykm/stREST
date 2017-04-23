var chalk = require('chalk');
var figlet = require('figlet');
var path = require('path');

module.exports = {
    configFileName: 'strest.config.json',
    configFilePath: path.join(process.cwd(), configFileName),
    greet() {
        console.log(
                '%s\n%s',
                chalk.blue(figlet.textSync('stREST')),
                chalk.blue('Node.js cli tool for stress testing REST APIs\n')
            );
    }
}