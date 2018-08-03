const express = require('express');
const morgan = require('morgan');
const app = express();
const models = require('./models');

const wiki = require('./routes/wiki.js');
const user = require('./routes/user.js');

app.use('/wiki', wiki);
//app.use('/user', user);
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.redirect('/wiki');
})

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
	await models.db.sync({force: true})
	const PORT = 3000;
	app.listen(PORT, () => {
		console.log(`app listening on port ${PORT}`)
	})
}

init();

