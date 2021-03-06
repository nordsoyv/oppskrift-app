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
winston.add(winston.transports.Console, { level: "info"  });

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


// JSON API
app.get('/api/v2/oppskrifter/all', api.oppskrifter);

app.get('/api/v2/oppskrifter/:id', api.getOppskrift);
app.post('/api/v2/oppskrifter', api.addOppskrift);
app.post('/api/v2/oppskrifter/:id', api.updateOppskrift);
app.delete('/api/v2/oppskrifter/:id', api.deleteOppskrift);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function (err) {
    winston.info('Express server listening on port ' + this.address().port  + ' in ' + app.settings.env + ' mode');
//    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
