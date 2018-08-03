const express = require('express');
const route = express.Router();
const addPage = require('../views/addPage');
const model = require('../models/index.js');


route.get('/', (req, res, next) => {
    res.send('Hello from route')
});

route.post('/', async (req, res, next) => {
    const page = new model.Pages({
        title: req.body.title,
        content: req.body.content
      });
    
      // make sure we only redirect *after* our save is complete!
      // note: `.save` returns a promise.
      try {
        await page.save();
        res.redirect('/');
      } catch (error) { next(error) }
      
});

route.get('/add', (req, res, next) => {
    res.send(addPage())
});

module.exports = route;