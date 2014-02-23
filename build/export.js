var http = require("http")
  , util = require("sys")
  , fs = require("fs")

var target= process.argv[3] || "http://127.0.0.1:5000"
var dest = process.argv[2] || "../src/test/resources/features/"

console.log(dest);

http.get(target + "/features", function(res) {
  res.on('data', function (chunk) {
    console.log('features: ' + chunk);
    var features = JSON.parse(chunk);
    for(var i=0; i < features.length; i++) {
      var feature = features[i];
      get(feature);
    }
  });

}).on('error', function(e) {
  console.log("Got error: " + e.message);
});


function get(feature){
  http.get(target + feature.url + "?format=raw", function(res) {
    res.on('data', function (chunk) {

      fs.writeFile(dest + feature.title.split(' ').join('_') + ".feature", chunk, function(err) {
        console.log('######### ' + feature.url + "\n");
        if(err) {
          console.log(err);
        } else {
          console.log("The file was saved!");
        }
      });
    });
  });
}
