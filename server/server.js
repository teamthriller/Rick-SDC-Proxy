require('newrelic');
const redis = require('redis');
const express = require("express");
const app = express();
const port = process.env.PORT || 3200;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");
const db = require('../ian-header-component-new/database/Rick-db/mongoConnection')
const proxy = httpProxy.createProxyServer({});
const client = redis.createClient();


app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

let redisCache = (req, res, next) => {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        next();
      }
    }
  })
}

app.get('/data/artist/:id', redisCache, (req, res) => {
  const { id } = req.params;
  db.getArtist(id)
    .then(artist => {
      client.setex(id, 7200, JSON.stringify(artist)),
      res.json(artist)
    })
    .catch(console.log);
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));