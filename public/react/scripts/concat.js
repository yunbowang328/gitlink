var fs = require('fs');
var uglify = require("uglify-js");
var path = require('path');
var concat = require('concat')    

var results = [];
var walk = function(dir, done) {
  
  fs.readdir(dir, function(err, list) {
  	console.log(list)
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            // results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

// 需要输出文件名数组时改为true
var jsDir = './public/js/';
var cssDir = './public/css'

// true && 
false &&
walk(cssDir, function() {
	console.log('results', results.length, results)
})
// return;

// ----------------------------------------------------------------------------- CSS 
	var cssResults = [ 
	
  'D:\\Code\\trustieplus\\public\\react\\public\\css\\edu-common.css',
  'D:\\Code\\trustieplus\\public\\react\\public\\css\\edu-public.css',
  'D:\\Code\\trustieplus\\public\\react\\public\\css\\taskstyle.css' ,

  'D:\\Code\\trustieplus\\public\\react\\public\\css\\font-awesome.css',
  
  'D:\\Code\\trustieplus\\public\\react\\public\\css\\editormd.min.css',
  'D:\\Code\\trustieplus\\public\\react\\public\\css\\merge.css',
  
  ]
   concat(cssResults, './public/css/css_min_all.css')

return;

// ----------------------------------------------------------------------------- JS
	var _results = [ 

	'D:\\Code\\trustieplus\\public\\react\\public\\js\\jquery-1.8.3.min.js',
	'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\underscore.min.js',
	'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\marked.min.js',
	'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\prettify.min.js',
	  'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\raphael.min.js',
	  'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\sequence-diagram.min.js',
	'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\flowchart.min.js',
	  'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\jquery.flowchart.min.js',
	  'D:\\Code\\trustieplus\\public\\react\\public\\js\\editormd\\editormd.min.js',

	'D:\\Code\\trustieplus\\public\\react\\public\\js\\codemirror\\codemirror.js',
	'D:\\Code\\trustieplus\\public\\react\\public\\js\\codemirror\\mode\\javascript.js',

	'D:\\Code\\trustieplus\\public\\react\\public\\js\\diff_match_patch.js',
	  
	  
	  'D:\\Code\\trustieplus\\public\\react\\public\\js\\merge.js',
	  
	  'D:\\Code\\trustieplus\\public\\react\\public\\js\\edu_tpi.js',

	  ]
	
	concat(_results, './public/js/js_min_all.js')

	// var uglified = uglify.minify(['./public/js/merge.js']);
	// console.log('uglified', uglified)
	// fs.writeFile('concat.min.js', uglified.code, function (err){
	//   if(err) {
	//     console.log(err);
	//   } else {
	//     console.log("Script generated and saved:", 'concat.min.js');
	//   }      
	// });


// var uglified = uglify.minify(['file1.js', 'file2.js', 'file3.js']);

