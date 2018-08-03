const express = require('express');
const route = express.Router();
const addPage = require('../views/addPage');
const model = require('../models/index.js');
const wikipage = require('../views/wikipage');
const main = require('../views/main');


route.get('/', async (req, res, next) => {
    const pagesArr = await model.Pages.findAll();
    res.send(main(pagesArr));
});

route.post('/', async (req, res, next) => {
    try {
        const page = new model.Pages({
            title: req.body.title,
            content: req.body.content
        });

        const [author, wasCreated] = await model.Users.findOrCreate({where: {name: req.params.name, email: req.params.email}});
        page.setAuthor(author);
        
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