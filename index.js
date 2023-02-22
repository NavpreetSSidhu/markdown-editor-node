const express = require('express');
const app = express();
const sharejs = require('share');
require('redis');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('pad')
});

app.get('/:id', (req, res) => {
    res.render('pad');
});

let redisClient;
console.log(process.env.REDISTOGO_URL);
if(process.env.REDISTOGO_URL) {
    let rtg = require('url').parse(process.env.REDISTOGO_URL);
    redisClient = require('redis').createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
} else {
    redisClient = require('redis').createClient();
}

let options = {
    db: {type: 'redis'}
};

sharejs.server.attach(app, options);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}`)
});