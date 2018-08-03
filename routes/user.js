const express = require('express');
const route = express.Router();
const model = require('../models/index');
const userList = require('../views/userList');
const userPages = require('../views/userPages');

route.get('/',async (req, res, next) => {
    const users = await model.Users.findAll();
    res.send(userList(users));
});

route.get('/:id', async (req, res, next) => {
    const articles = await model.Pages.findAll({where: {authorId: req.params.id}});
    res.send(userPages)


})