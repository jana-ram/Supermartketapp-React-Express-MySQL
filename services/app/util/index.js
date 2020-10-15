const {
    createLogger,
    format,
    transports
} = require('winston');
module.exports = createLogger({
    format: format.json(),
    transports : [
        new transports.Console({
            level : 'debug'
        }),
        new transports.File({
            filename:`${__dirname}/../log/index.log`
        })
    ]
});