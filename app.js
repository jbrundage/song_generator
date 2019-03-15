const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.static(__dirname));
app.all('/', function (request, response) {
    response.send(fs.readFileSync('index.html').toString());
});
app.listen(8080);