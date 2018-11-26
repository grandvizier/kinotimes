var winston = require('winston'),
moment = require('moment'),
_ = require('lodash'),
stackTrace = require('stack-trace');
winston.emitErrs = true;

// var env = process.env.NODE_ENV || 'development';
var codePath = '';
var logDir = './logs';

// Create the log directory if it does not exist
var fs = require('fs');
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

var tsFormat = () => moment().format('lll');
var formatterFunc = (options) =>
	winston.config.colorize(options.level,"["+options.timestamp()+"] ") +
	winston.config.colorize(options.level,options.level.toUpperCase()) + '\t' +
	codePath + '\t' +
	winston.config.colorize(options.level, (undefined !== options.message ? options.message : '')) +
	" " + (!_.isEmpty(options.meta) ? JSON.stringify(options.meta) : '');


var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'debug',
			filename: logDir+'/results.log',
			handleExceptions: true,
			timestamp: tsFormat,
			maxsize: 5242880, //5MB
			maxFiles: 5,
			json: false,
			colorize: false
		}),
		new winston.transports.Console({
			level: 'debug',
			timestamp: tsFormat,
			handleExceptions: true,
			json: false,
			formatter: formatterFunc,
			colorize: true
		})
	],
	exitOnError: false
});

var Logger = function(){
	var pathToFile = stackTrace.get()[1].getFileName();
	codePath = pathToFile.replace(/^.*[\\\/]/, '');
	return logger;
}

module.exports = Logger;
module.exports.stream = {
	write: function(message, encoding){
		logger.info(message);
	}
};

