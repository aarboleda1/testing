// server/index.js
'use strict';
const express = require('express');
const data = require('./conversations.json');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
console.log(data,' is the data?')
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
	res.send(data)
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});