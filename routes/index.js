
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.sendfile('public/html/index.html');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.sendfile('public/html/partials/' + name + ".html");
};