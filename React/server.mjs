import dotenv from 'dotenv';
import express from 'express';
import expressWinston from 'express-winston';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import winston from 'winston';

dotenv.config();

const defineLoggerFilename = filename => new winston.transports.File({ filename: `./logs/${filename}.log` });
const loggerTemplate = () => winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
    ),
    exitOnError: false,
    silent: process.env.NODE_ENV === 'test',
    transports: [
        new winston.transports.Console(),
    ],
});

const debugLogger = loggerTemplate().add(defineLoggerFilename('debug'));
const errorLogger = loggerTemplate().add(defineLoggerFilename('error'));

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

debugLogger.info('Starting server');

// Enable Helmet security
app.use(helmet());

// Enable getting forwarded client IP from proxy
app.enable('trust proxy');

// Rate limit all requests
const limiter = rateLimiter({
    windowMs: process.env.RATE_WINDOW || 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_MAX || 100000, // limit each IP to 100000 requests per windowMs
    delayMs: process.env.RATE_DELAY || 0, // disable delaying - full speed until max limit reached
});
app.use(limiter);

app.use(cookieParser());
app.use(`/public`, express.static('build/public'));
app.use(`/assets`, express.static('build/assets'));

app.get('*', (req, res) => {
    const cookies = req.cookies;
    const subdomain = req.subdomains[0];
    return res.sendFile(path.join(`${__dirname}/build/demo.html`))
});

// Log global errors with Winston
app.use(expressWinston.errorLogger({
    winstonInstance: errorLogger,
}));

const port = process.env.PORT || 8082;
app.listen(port, () => {
    debugLogger.info(`Server started. Listening on port ${port}`);
});
