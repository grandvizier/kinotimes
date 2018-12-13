const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, uncolorize } = format;

// Create the log directory if it does not exist
var logDir = './logs';
var fs = require('fs');
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// level.toUpperCase()
const formatStr = printf(info => {
	if ((!info.meta)) {
		return `[${info.timestamp}] ${info.level}\t ${info.label} ${info.message}`;
	}
	return `[${info.timestamp}] ${info.level}\t ${info.label} ${info.message} ${JSON.stringify(info.meta)}`;
});

var fileFormat = combine(
	uncolorize({message: true, level: true})
)

var Logger = function(f, col){
	f = f.replace(/^.*[\\\/]/, '');
	var logger = createLogger({
		exitOnError: false,
		format: combine(
			colorize({message: true, level: true}),
			label({ label: f }),
			timestamp({format: 'MMM D, YYYY HH:mm'}),
			format.splat(),
			formatStr
		),
		transports: [
			new transports.Console({level: 'debug'}),
			new transports.File({
				level: 'debug',
				filename: logDir+'/results.log',
				format: fileFormat,
				maxsize: 5242880, //5MB
				maxFiles: 5
			})
		]
	});
	return logger;
}

module.exports = Logger;
module.exports.stream = {
	write: function(message, encoding){
		logger.info(message);
	}
};

