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
        const [author, wasCreated] = await model.Users.findOrCreate({where: {name: req.body.name, email: req.body.email}});
        console.log("HEEEEEEREEE",author)
        page.setAuthor(author);       
        await page.save();
        await author.save();
        console.log(page.slug)
        res.redirect('/wiki/' + page.slug);
      } catch (error) { next(error) }
});

route.get('/add', (req, res, next) => {
    res.send(addPage())
});

route.get('/:slug', async (req, res, next) => {
  try{
  const foundPage = await model.Pages.findOne({
    where: {slug: req.params.slug}
  });
  let author = await foundPage.getAuthor()
  res.send(wikipage(foundPage, author))
} catch(error) {
  next(error)
}
});

module.exports = route;