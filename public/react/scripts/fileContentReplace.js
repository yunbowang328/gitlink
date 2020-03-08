var fs2 = require('fs');

function generateNewIndexJsp() {
    
  var filePath = './build/index.html';

  var outputPath = filePath
  fs2.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data
        .replace('/js/create_kindeditor.js', '/react/build/js/create_kindeditor.js')
        .replace(/https:\/\/testeduplus2.educoder.net/g, '');
        // .replace(/http:\/\/testbdweb.educoder.net/g, '');

        .replace('/css/css_min_all.css', '/react/build/css/css_min_all.css');

    fs2.writeFile(outputPath, result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}