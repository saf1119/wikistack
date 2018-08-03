const express = require('express');
const morgan = require('morgan');
const app = express();
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Hello!!");
})

db.authenticate().
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

