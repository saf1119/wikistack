const express = require('express');
const route = express.Router();
const addPage = require('../views/addPage');


route.get('/', (req, res, next) => {
    res.send('Hello from route')
});

route.post('/', (req, res, next) => {
    res.json(req.body)
});

route.get('/add', (req, res, next) => {
    res.send(addPage())
});

module.exports = route;