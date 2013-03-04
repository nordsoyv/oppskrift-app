
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("Request: index" );
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log("Request: " + req.params.name);
  res.render('partials/' + name);
};