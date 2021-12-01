// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function(CodeMirror) {
    var Pos = CodeMirror.Pos;

    function forEach(arr, f) {
        for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
    }

    function arrayContains(arr, item) {
        if (!Array.prototype.indexOf) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        }
        return arr.indexOf(item) != -1;
    }

    function scriptHint(editor, keywords, getToken, options) {
        // Find the token at the cursor
        var cur = editor.getCursor(), token = getToken(editor, cur);
        if (/\b(?:string|comment)\b/.test(token.type)) return;
        token.state = CodeMirror.innerMode(editor.getMode(), token.state).state;

        // If it's not a 'word-style' token, ignore the token.
        if (!/^[\w$_]*$/.test(token.string)) {
            token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                type: token.string == "." ? "property" : null};
        } else if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        var tprop = token;
        // If it is a property, find out what it is a property of.
        while (tprop.type == "property") {
            tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (tprop.string != ".") return;
            tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (!context) var context = [];
            context.push(tprop);
        }
        // 发消息让其他组件注入 其他hint
        CodeMirror.signal(editor, "hinting");
        var myhints = editor.state.myhints
        var needToClearJSHint = editor.state.needToClearJSHint
        if (needToClearJSHint) {    // 不使用js的hint，可能注入了其他语言的hint
            keywords = []
            editor.state.needToClearJSHint = false;
        }
        myhints && myhints.forEach(function(item) {
            if (!arrayContains(keywords, item)) keywords.push(item)
        })

        return {list: getCompletions(token, context, keywords, options),
            from: Pos(cur.line, token.start),
            to: Pos(cur.line, token.end)};
    }

    function javascriptHint(editor, options) {
        return scriptHint(editor, javascriptKeywords,
            function (e, cur) {return e.getTokenAt(cur);},
            options);
    };
    CodeMirror.registerHelper("hint", "javascript", javascriptHint);

    function getCoffeeScriptToken(editor, cur) {
        // This getToken, it is for coffeescript, imitates the behavior of
        // getTokenAt method in javascript.js, that is, returning "property"
        // type and treat "." as indepenent token.
        var token = editor.getTokenAt(cur);
        if (cur.ch == token.start + 1 && token.string.charAt(0) == '.') {
            token.end = token.start;
            token.string = '.';
            token.type = "property";
        }
        else if (/^\.[\w$_]*$/.test(token.string)) {
            token.type = "property";
            token.start++;
            token.string = token.string.replace(/\./, '');
        }
        return token;
    }

    function coffeescriptHint(editor, options) {
        return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken, options);
    }
    CodeMirror.registerHelper("hint", "coffeescript", coffeescriptHint);

/*    var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
        "toUpperCase toLowerCase split concat match replace search").split(" ");
    var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
        "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
    var funcProps = "prototype apply call bind".split(" ");*/
    var javascriptKeywords = ("double float int long short null true false enum super this void auto for register static const friend mutable explicit virtual template typename printf " +
        "break continue return do while if else for instanceof switch case default try catch finally throw throws assert import package boolean byte char delete private " +
        "inline struct union signed unsigned export extern namespace using operator sizeof typedef typeid and del from not as elif or with pass except " +
        "print exec raise is def lambda private protected public abstract class extends final implements interface native new static strictfp synchronized transient main " +
        "String string System println vector bool boolean FALSE TRUE function").split(" ");
/*
    var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for " +
        "if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");
*/

    function forAllProps(obj, callback) {
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
            for (var name in obj) callback(name)
        } else {
            for (var o = obj; o; o = Object.getPrototypeOf(o))
                Object.getOwnPropertyNames(o).forEach(callback)
        }
    }

    function getCompletions(token, context, keywords, options) {
        var found = [], start = token.string, global = options && options.globalScope || window;
        function maybeAdd(str) {
            // var results = fuzzysort.go(start, [str])
            // if ( results.total && !arrayContains(found, str) )  found.push(str);

            if (fuzzysort && fuzzysort.single) {
                // 使用模糊搜索
                var results = fuzzysort.single(start, str)
                if ( results && results.score <= 0 && !arrayContains(found, str)) found.push(str);
            } else {
                if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
            }
        }
        function gatherCompletions(obj) {
            if (typeof obj == "string") forEach(stringProps, maybeAdd);
            else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
            else if (obj instanceof Function) forEach(funcProps, maybeAdd);
            forAllProps(obj, maybeAdd)
        }

        // 不启用context context强制要求了lib的调用才提示，比如Math.a 就会提示 Math.abs
        if (false && context && context.length) {
            // If this is a property, see if it belongs to some object we can
            // find in the current environment.
            var obj = context.pop(), base;
            if (obj.type && obj.type.indexOf("variable") === 0) {
                if (options && options.additionalContext)
                    base = options.additionalContext[obj.string];
                if (!options || options.useGlobalScope !== false)
                    base = base || global[obj.string];
            } else if (obj.type == "string") {
                base = "";
            } else if (obj.type == "atom") {
                base = 1;
            } else if (obj.type == "function") {
                if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
                    (typeof global.jQuery == 'function'))
                    base = global.jQuery();
                else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
                    base = global._();
            }
            while (base != null && context.length)
                base = base[context.pop().string];
            if (base != null) gatherCompletions(base);
        } else {
            // If not, just look in the global object and any local scope
            // (reading into JS mode internals to get at the local and global variables)
           /* for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);*/
/*            for (var v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
            if (!options || options.useGlobalScope !== false)
                gatherCompletions(global);*/

            // forEach(keywords, maybeAdd);

            var result = fuzzysort.go(start, keywords)
            result && result.forEach(function(item) {
                found.push(item.target)
            })
        }
        return found;
    }
});
