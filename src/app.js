const express = require('express');
const http = require('http');
const routes = require("./routes/controllers/getdata");
var app = express();
const port = 3000;

app.use(routes);
app.set('port', port);

var server = http.createServer(app);

server.listen(port);