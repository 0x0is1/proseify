const express = require('express');
const cors = require('cors');
const { createLogger, transports, format } = require('winston');
const Constants = require("./lib/Constants.js");

const constants = new Constants();

const app = express();
const port = 3999;

app.use(cors());
app.use(express.json());

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.Console({ format: format.simple() })
    ]
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

function asyncHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

app.get(['/', '/api'], asyncHandler(async (req, res) => {
    res.json({ message: 'Invalid route /api' });
}));

app.get('/api/home', asyncHandler(async (req, res) => {
    const query = req.query;
    const url = constants.home_url(query.limit, query.lang);
    const data = await constants.make_request(url);
    res.json(data);
}));

app.get('/api/category', asyncHandler(async (req, res) => {
    const query = req.query;
    const url = constants.category_url(query.slug_id, query.offset, query.limit);
    const data = await constants.make_request(url);
    res.json(data);
}));

app.get('/api/series', asyncHandler(async (req, res) => {
    const query = req.query;
    const url = constants.series_url(query.slug_id);
    const data = await constants.make_request(url);
    res.json(data);
}));

app.get('/api/content', asyncHandler(async (req, res) => {
    const query = req.query;
    const url = constants.content_url(query.pid);
    const data = await constants.make_request(url);
    res.json(data);
}));

app.get('/api/image', asyncHandler(async (req, res) => {
    const query = req.query;
    const url = constants.image_url(query.pid, query.img_id);
    const data = await constants.make_request(url);
    res.json(data);
}));

app.get('/api/languages', asyncHandler(async (req, res) => {
    const langs = constants.languages;
    res.json(langs);
}));


app.listen(port, () => {
    console.log(`Server is running on : ${port}`);
});
