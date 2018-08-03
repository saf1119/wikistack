const express = require('express');
const route = express.Router();
const addPage = require('../views/addPage');
const model = require('../models/index.js');
const wikipage = require('../views/wikipage')


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
        console.log(page.slug)
        res.redirect('/wiki/' + page.slug);
      } catch (error) { next(error) }
      //console.log(page)      
});

route.get('/add', (req, res, next) => {
    res.send(addPage())
});

route.get('/:slug', async (req, res, next) => {
  const foundPage = await model.Pages.findOne({
    where: {slug: req.params.slug}
  });
  res.send(wikipage(foundPage))
});

module.exports = route;