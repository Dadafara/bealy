import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const level = process.env.LOG_LEVEL || "info";

const logger = winston.createLogger({ 
    level: level,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        })
    ]
 });

 export default logger;