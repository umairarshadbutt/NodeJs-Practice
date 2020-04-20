const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();
const morgan = require('morgan');
const bodyParser = require ('body-parser');
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.all('/dishes',(req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/dishes',(req, res, next) => {
  res.end('Will send all the dishes to you!');
});

app.post('/dishes',(req, res, next) => {
  res.end('Will add the dishes : '+ req.body.name +
      ' with details: '+ req.body.description);
});
app.put('/dishes',(req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes')
});
app.delete('/dishes',(req, res, next) => {
  res.end('Deleting all the dishes');
});

app.get('/dishes/:dishId',(req, res, next) => {
  res.end('Will send details of  the dishe: ' +
      req.params.dishId+ 'to you!');
});

app.post('/dishes/:dishId',(req, res, next) => {
  res.end('POST operation not supported on /dishes/'+
  req.params.dishId);
});
app.put('/dishes/:dishId',(req, res, next) => {
  res.write('Updating the dish: '+ req.params.dishId +'\n');
  res.end('Will update the dish: '+ req.body.name+
  ' with details: ' + req.body.description);
});
app.delete('/dishes/:dishId',(req, res, next) => {
  res.end('Deleting all the dishes');
});
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});