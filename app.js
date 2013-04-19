
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  winston = require('winston');

var app = module.exports = express();

// Configuration

winston.remove(winston.transports.Console);
//winston.add(winston.transports.Console, { level : "error"  });
winston.add(winston.transports.Console, { level : "debug"  });

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function (){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function (){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);



// JSON API

app.get('/api/v1/posts', api.posts);

app.get('/api/v1/post/:id', api.getPost);
app.post('/api/v1/post', api.addPost);
app.put('/api/v1/post/:id', api.editPost);
app.delete('/api/v1/post/:id', api.deletePost);

app.get('/api/v2/post/all', api.posts);

app.get('/api/v2/post/:id', api.getPost);
app.post('/api/v2/post', api.addPost);
app.post('/api/v2/post/:id', api.editPost);
app.delete('/api/v2/post/:id', api.deletePost);



// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
