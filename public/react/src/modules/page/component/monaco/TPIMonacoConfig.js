import * as monaco from 'monaco-editor'
import _ from 'lodash'
const ifelse = {
    label: 'ifelse',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: [
        'if (${1:condition}) {',
        '\t$0',
        '} else {',
        '\t',
        '}'
    ].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If-Else Statement'
}
// monaco.languages.registerCompletionItemProvider('cpp', {
// 	provideCompletionItems: () => {
// 		var suggestions = [{
// 			label: 'simpleText',
// 			kind: monaco.languages.CompletionItemKind.Text,
// 			insertText: 'simpleText'
// 		}, {
// 			label: 'testing',
// 			kind: monaco.languages.CompletionItemKind.Keyword,
// 			insertText: 'testing(${1:condition})',
// 			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
// 		}];
// 		return { suggestions: suggestions };
// 	}
// });


function getWordsInString(string) {
    return string.match(/[A-z]+/g);
}

const cArray = ['auto','break','case','char','const','continue','default','do','double','else','enum','extern',
    'float','for','goto','if','int','long','register','return','short','signed','sizeof','static','struct',
    'switch','typedef','union','unsigned','void','volatile','while','inline','restrict','_Bool','_Complex',
    '_Imaginary','_Alignas','_Alignof','_Atomic','_Static_assert','_Noreturn','_Thread_local','_Generic']

monaco.languages.registerCompletionItemProvider('cpp', {
	provideCompletionItems: (model) => {
        const currentFileWords = getWordsInString(model.getValue());
        const all = _.union(cArray, currentFileWords)
		var suggestions = all.map((item) => {
            return {
                label: item,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: item,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        });
        suggestions.push(ifelse)

		return { suggestions: suggestions };
	}
});

// https://www.programiz.com/python-programming/keyword-list
const pythonArray = ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
    'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 
    'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']

monaco.languages.registerCompletionItemProvider('python', {
	provideCompletionItems: (model) => {
        const currentFileWords = getWordsInString(model.getValue());
        const all = _.union(pythonArray, currentFileWords)
		var suggestions = all.map((item) => {
            return {
                label: item,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: item,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        });
        suggestions.push({
            label: 'print',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
                'print($0)',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'print'
        })
		return { suggestions: suggestions };
	}
});

const javaArray = ['abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 
'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 
'implements', 'import', 'instance of', 'int', 'interface', 'long', 'native',
'new', 'package', 'private', 'protected', 'public', 'return', 'strictfp', 'short', 'static', 'super', 'switch', 
'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while']

monaco.languages.registerCompletionItemProvider('java', {
	provideCompletionItems: (model) => {
        const currentFileWords = getWordsInString(model.getValue());
        const all = _.union(javaArray, currentFileWords)

		var suggestions = all.map((item) => {
            return {
                label: item,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: item,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        });
        suggestions.push(ifelse)
        suggestions.push({
            label: 'main',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
                'public static void main(String[] args) {',
                '\t$0',
                '}',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'main function'
        })
        suggestions.push({
            label: 'System.out.print',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
                'System.out.print($0)',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'system print'
        })
		return { suggestions: suggestions };
	}
});