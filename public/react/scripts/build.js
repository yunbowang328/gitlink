'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

var CombinedStream = require('combined-stream');
var fs2 = require('fs');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

function removeExceptGitDir(dir) {
  // readdirSync
  const list = fs2.readdirSync(dir)
    // if (err) return done(err);
  var pending = list.length;
  // if (!pending) return done(null, results);
  list.forEach(function(file) {
    if (file.indexOf('.git') == -1) {
      file = path.resolve(dir, file);
      fs.removeSync(file)
    }
  });
}
// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    // fs.emptyDirSync(paths.appBuild);
    console.log('removeExceptGitDir')

    removeExceptGitDir(paths.appBuild)

    console.log('copyPublicFolder')
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'));
      printBuildError(err);
      process.exit(1);
    }
  );

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      generateNewIndexJsp();

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

// 给build脚本增加的方法，对其生成的index.html做一些文本替换，以及cdn处理
function generateNewIndexJsp() {
  // var combinedStream = CombinedStream.create();
  var filePath = paths.appBuild + '/index.html';
  // var htmlContent = fs2.createReadStream( filePath )

  // stream没有replace方法
  // htmlContent = htmlContent.replace('/js/js_min_all.js', '/react/build/js/js_min_all.js')
  // htmlContent = htmlContent.replace('/css/css_min_all.css', '/react/build/css/css_min_all.css')

  // combinedStream.append(htmlContent);
  // combinedStream.pipe(fs2.createWriteStream( filePath ));

  var outputPath = paths.appBuild  + '/../../../index.html'
  fs2.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const newVersion = '1.1.1'
    let cdnHost = 'https://shixun.educoder.net'
    cdnHost = 'https://ali-cdn.educoder.net'
    cdnHost = ''


    var mainRegex = /<script type="text\/javascript" src="\/forgeplus-react\/build\/.\/static\/js\/main.([a-zA-Z0-9]{8,}).js"><\/script>/
    var matchResult = data.match(mainRegex)
    var code = `
      <script>
         (function() {
            var _host = '/forgeplus-react/build/'
            /**/
            if (window.location.host == 'pre-newweb.educoder.net') {
                _host = 'https://testali-cdn.educoder.net/react/build/'
            } else if (window.location.host == 'www.educoder.net') {
                _host = 'https://ali-cdn.educoder.net/react/build/'
            }
            document.write('<script type="text/javascript" src="' + _host + 'js/js_min_all.js"><\\/script>');
            document.write('<script type="text/javascript" src="' + _host + 'static/js/main.${matchResult[1]}.js"><\\/script>');
         })()
      </script>
    `
    var jsMinAllRegex = /<script type="text\/javascript" src="\/js\/js_min_all.js"><\/script>/
    // <script type="text/javascript" src="/js/js_min_all.js"></script>
    var result = data
        .replace(jsMinAllRegex, code)
        // .replace('/js/js_min_all.js', `${cdnHost}/react/build/js/js_min_all.js?v=${newVersion}`)
        // .replace('/js/js_min_all_2.js', `${cdnHost}/react/build/js/js_min_all_2.js?v=${newVersion}`)

        // ${cdnHost}  加了cdn后，这个文件里的字体文件加载会有跨域的报错   ../fonts/fontawesome-webfont.eot
        // TODO tpi 评测结果关闭也使用了fontawesome
        .replace('/css/css_min_all.css', `${cdnHost}/react/build/css/css_min_all.css?v=${newVersion}`)
			  .replace('/css/iconfont.css', `${cdnHost}/react/build/css/iconfont.css?v=${newVersion}`)
        .replace(/\/js\/create_kindeditor.js/g, `${cdnHost}/react/build/js/create_kindeditor.js?v=${newVersion}`)

        .replace(mainRegex, '')
        // .replace('/react/build/./static/css/main', `${cdnHost}/react/build/./static/css/main`)
        // .replace('/react/build/./static/js/main', `${cdnHost}/react/build/./static/js/main`)

        // .replace(/https:\/\/testeduplus2.educoder.net/g, '');
        // .replace(/http:\/\/testbdweb.educoder.net/g, '');

        // .replace('/css/css_min_all.css', '/react/build/css/css_min_all.css');

    fs2.writeFile(outputPath, result, 'utf8', function (err) {
       if (err) return console.log(err);
      //  commitAndPush();
    });
  });
}

function commitAndPush() {
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) { console.log(stdout) }
  var options = {cwd:"./build"};
  exec("git status && git commit -am 'b' && git push", options, puts);
}
