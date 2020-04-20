const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
    .get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
    .post((req, res, next) => {
    res.end('Will add the dishes : '+ req.body.name +
        ' with details: '+ req.body.description);
})
    .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes')
})
    .delete((req, res, next) => {
    res.end('Deleting all the dishes');
});
dishRouter.route('/:dishId').all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'type/plain' });
    next();
})
    .get(function(req, res, next) {
        res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
    })
    .put(function(req, res, next) {
        res.write('Updating the dish: '+ req.params.dishId + '.\n');
        res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(function(req, res, next) {
        res.end('Deleting dish: ' + req.params.dishId);
    });

module.exports=dishRouter;