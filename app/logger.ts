import chalk from 'chalk';
import {Logger as WLogger, createLogger, format, transports} from 'winston';

export interface LoggerConfig {
  level: string;
  filename?: string;
}

export class Logger {
  private static _instance: WLogger;

  constructor(config?: LoggerConfig) {
    const defaultConfig: LoggerConfig = {
      level: 'info',
    };
    config = Object.assign(defaultConfig, config);

    const {level, filename} = config;
    if (!Logger._instance) {
      const transportsList = [];
      if (filename) {
        transportsList.push(new transports.File({filename, level}));
      }
      transportsList.push(
        new transports.File({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.simple()
          ),
          level: 'info',
          filename: 'output.log',
        })
      );
      Logger._instance = createLogger({
        level,
        format: format.combine(format.timestamp(), format.json()),
        transports: transportsList,
      });
    }
  }

  public log(message: string): void {
    console.log(chalk.white(message));
    Logger._instance.info(message);
  }

  public error(message: string): void {
    console.log(chalk.red(message));
    Logger._instance.error(message);
  }
  public warn(message: string): void {
    console.log(chalk.yellow(message));
    Logger._instance.warn(message);
  }
  public debug(message: string): void {
    console.log(chalk.gray(message));
    Logger._instance.debug(message);
  }
  public info(message: string): void {
    console.log(chalk.blue(message));
    Logger._instance.info(message);
  }
}
