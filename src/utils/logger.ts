import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

const syslogColors = {
  debug: 'rainbow',
  info: 'cyan',
  notice: 'white',
  warning: 'yellow',
  error: 'bold red',
  crit: 'inverse yellow',
  alert: 'bold inverse red',
  emerg: 'bold inverse magenta',
};

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `${[info.timestamp]}: ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      level: 'error',
    }),
    isDevelopment
      ? new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true, colors: syslogColors })
          ),
        })
      : null,
  ].filter(Boolean),
});

export default logger;
