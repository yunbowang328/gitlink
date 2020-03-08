import React, { Component } from 'react';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import _ from 'lodash'
import Drawer from 'material-ui/Drawer';

import './TPIMonaco.css'
import TPICodeSetting from '../TPICodeSetting'

import * as monaco from 'monaco-editor'


import { fromStore, toStore } from 'educoder'
import './TPIMonacoConfig'
import { isThisSecond } from 'date-fns';

// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors
monaco.editor.defineTheme('myCoolTheme', {
      base: 'vs', // vs、vs-dark、hc-black
      inherit: true,
      rules: [
        { token: 'green', background: 'FF0000', foreground: '00FF00', fontStyle: 'italic'},
        { token: 'red', foreground: 'FF0000' , fontStyle: 'bold underline'},
        { background: '#121c23' },
        // { foreground: 'FFFFFF' }
      ],
      // editor_monaco._themeService._knownThemes.get('myCoolTheme')
      colors: {
        // 'editor.foreground': '#FFFFFF',
        'editor.background': '#121c23',

        // 'editor.selectionHighlightBorder': '#ffffff',
        // 'input.border': '#ffffff',
        'editor.lineHighlightBorder': '#222c34',        // .current-line

        // 'editor.selectionBackground': '#FFFF0030',
        // 'editor.selectionHighlightBackground' :'#0000FFFF',
      }
});

const $ = window.$;
function loadMonacoResouce(callback) {
    let _url_origin = ``;
    let prefix = 'react/build'
    if (window.location.port == 3007) {
        prefix = ''
    } else {
        // _url_origin = `https://testeduplus2.educoder.net/`;
		   	_url_origin  = 'http://pre-newweb.educoder.net';
    }
    const $ = window.$;

    if (!window['monaco']) {
        // How to import this library in a create-react-app?
        // https://github.com/Microsoft/monaco-editor/issues/82
        // window.require = { paths: { 'vs': '../node_modules/monaco-editor/min/vs' } };
        // window.require = { paths: { 'vs': `${_url_origin}${prefix}/js/monaco/vs` } };

        // $('head').append($('<link rel="stylesheet" type="text/css" />')
        //     .attr('href', `${_url_origin}${prefix}/js/monaco/vs/editor/editor.main.css`));

        // $.ajaxSetup({
        //     cache: true
        // });
        // $.when(

        //     // $.getScript( `${_url_origin}${prefix}/js/monaco/vs/language/typescript/tsMode.js` ),
        //     // $.getScript( `${_url_origin}${prefix}/js/monaco/vs/basic-languages/javascript/javascript.js` ),
        //     $.getScript( `${_url_origin}${prefix}/js/monaco/vs/basic-languages/python/python.js` ),
        //     // $.getScript( `${_url_origin}${prefix}/js/monaco/vs/language/typescript/tsWorker.js` ),

        //     $.getScript(  `${_url_origin}${prefix}/js/monaco/vs/loader.js` ),
        //     $.getScript( `${_url_origin}${prefix}/js/monaco/vs/editor/editor.main.nls.js` ),
        //     $.getScript( `${_url_origin}${prefix}/js/monaco/vs/editor/editor.main.js` ),
        //     $.Deferred(function( deferred ){
        //         console.log('Deferred')

        //         // TODO 暂时放这里
        //         $( deferred.resolve );
        //         checkIfLoaded(callback);

        //     })
        // ).done(function(){
        //     debugger;
        //     // TODO 没执行到这里
        //     console.log('done done done ')
        //     //place your code here, the scripts are all loaded
        //     // callback && callback()
        // });

        // require.config({ paths: { 'vs': `/monaco/vs` }});

        // require(['/vs/editor/editor.main'], function() {
            callback && callback()
            var editor = monaco.editor.create(document.getElementById('container'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript'
            });
        // });

    } else {
        callback && callback()
    }
}
function checkIfLoaded (callback) {
    if (window.monaco && window.monaco.editor) {
        $.ajaxSetup({
            cache: false
        });
        callback && callback()
    } else {
        console.log('check again 2s later..')
        setTimeout(() => {
            checkIfLoaded(callback)
        }, 2000);
    }
}

/*
    language
    javascript css less scss html typescript
    java ruby vb r python php perl go cpp csharp
    sql pgsql mysql
    swift objective-c
    shell
    redis
    xml yaml
    markdown

    'JFinal': 'text/x-java',
    'Java': 'text/x-java',
    'Kotlin': 'text/x-kotlin',
    'C/C++' : 'text/x-c++src',
    'MachineLearning': {
                name: "python",
                version: 3,
                singleLineStringErrors: false
    },
    'Python2.7': {
                name: "python",
                version: 3,
                singleLineStringErrors: false
    },
    'Python3.6': {
                name: "python",
                version: 3,
                singleLineStringErrors: false
    },
*/
const mirror2LanguageMap = {
    'JFinal': 'java',
    'Java': 'java',
    'JavaWeb': 'java',
    'Kotlin': 'java',

    'Html': 'html',
    'Css': 'css',
    'Javascript': 'javascript',
    'JavaScript': 'javascript',

    'C/C++': 'cpp',
    'MachineLearning': 'python',
    'Python2.7': 'python',
    'Python3.6': 'python',

    'C#': 'csharp',
    'R': 'r'

}
function getLanguageByMirrorName(mirror_name) {
    let lang = 'javascript'
    if (mirror_name && mirror_name.length) {
        // 需要倒着遍历， html、css的实训，主评测语言环境是python，小类别是html或css
        // TODO http://localhost:3007/tasks/hmcwa3g8typ5?debug=t   ["Python3.6", "VNC", "Html"]
        for (let i = mirror_name.length - 1; i >= 0; i--) {
            let languageVal = mirror2LanguageMap[mirror_name[i]];
            if (languageVal) {
                lang = languageVal;
                break;
            }
        }
    }
    return lang;
}

let notCallCodeMirrorOnChangeFlag = false;

/**
    props :
        mirror_name  决定语言
        isEditablePath
        repositoryCode

        codemirrorDidMount

        shixun.forbid_copy

        showSettingDrawer, settingDrawerOpen
*/
class TPIMonaco extends Component {

	constructor(props) {
		super(props)

        loadMonacoResouce();
		this.state = {
            cmFontSize: fromStore('cmFontSize', 16),
            cmCodeMode: fromStore('cmCodeMode', 'vs-dark'),
            autoCompleteSwitch: fromStore('autoCompleteSwitch', true),
        }
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
        const { mirror_name } = this.props
        const editor_monaco = this.editor_monaco;
        if (editor_monaco && !_.isEqual(prevProps.mirror_name, mirror_name)) {
            // TODO 后期考虑加入，根据文件类型的不同，使用不同的lang
            const lang = getLanguageByMirrorName(mirror_name);
            // https://github.com/Microsoft/monaco-editor/issues/539
            window.monaco.editor.setModelLanguage(editor_monaco.getModel(), lang)
        } else if (prevProps.isEditablePath != this.props.isEditablePath) {
            // 当前文件是否可编辑
            if (this.props.isEditablePath || this.props.shixun && this.props.shixun.code_edit_permission == true) {
                editor_monaco.updateOptions({readOnly: false})
            } else {
                editor_monaco.updateOptions({readOnly: true})
            }

        } else if (editor_monaco && prevProps.codeLoading === true && this.props.codeLoading === false
                ) {
            if (this.props.repositoryCode != editor_monaco.getValue()) {
                // newProps.repositoryCode !== this.props.repositoryCode &&
                notCallCodeMirrorOnChangeFlag = true;

                // 重要：setState(因获取代码、重置代码等接口引起的调用)调用引起的变化才需要setValue
                editor_monaco.setValue(this.props.repositoryCode)
            }

            // 代码没变也需要layout，可能从命令行自动切回了代码tab
            editor_monaco.layout();

            // Clears the editor's undo history.
            // TODO
            // extend_editor.clearHistory()
        }
        editor_monaco.layout();
    }
    componentWillUnmount() {
        // 注意销毁，不然会出现不能编辑的bug
        this.editor_monaco && this.editor_monaco.dispose()
    }

	componentDidMount() {
        checkIfLoaded(() => {
            let value = [
                'define([], function() {',
                '\treturn ({p1, p2}) => {',
                '\t\treturn Promise.resolve("Hello, World");',
                '\t};',
                '});'
            ].join('\n');
            // value = [
            //         'function x() {',
            //         '\tconsole.log("Hello world!");',
            //         '}'
            //     ].join('\n'),
            value =  "<h1>Hello</h1>↵<!-- ********* Begin ********* -->↵    ↵    ↵<!-- ********* End ********* -->"

            value = this.props.repositoryCode

            const height =  $('#games_repository_contents').height() - 40
            const width =  $('#games_repository_contents').width()

            $('#codetab_con_1').height(height)

            const lang = getLanguageByMirrorName(this.props.mirror_name);
            const editor = window.monaco.editor.create(document.getElementById('extend-challenge-file-edit'), {
                value: value,
                readOnly: !this.props.isEditablePath && this.props.shixun && this.props.shixun.code_edit_permission != true,
                // 属性说明
                // http://testeduplus2.educoder.net/react/build/static/node_modules/_monaco-editor@0.15.6@monaco-editor/esm/vs/editor/common/config/commonEditorConfig.js
                // https://github.com/Microsoft/monaco-editor/issues/29
                scrollBeyondLastLine: false,

                language: lang,
                // language: 'css',

                // theme: "vs",
                theme: this.state.cmCodeMode,
                // theme: 'myCoolTheme',
                insertSpaces: false,
                fontSize: this.state.cmFontSize,
                // theme: this.state.cdCodeMode
            });

            window.editor_monaco = editor;
            this.editor_monaco = editor

            // editor.setPosition({ lineNumber: 2, column: 30 });

            // editor.model.onDidChangeContent((event) => {
            //     if (notCallCodeMirrorOnChangeFlag === true) {
            //         notCallCodeMirrorOnChangeFlag = false
            //         return;
            //     }
            //     this.props.onRepositoryCodeUpdate(editor.getValue())
            // });

            editor.onDidChangeModelContent((event) => {
                if (notCallCodeMirrorOnChangeFlag === true) {
                    notCallCodeMirrorOnChangeFlag = false
                    return;
                }
                this.props.onRepositoryCodeUpdate && this.props.onRepositoryCodeUpdate(editor.getValue())
            })
            this.props.codemirrorDidMount && this.props.codemirrorDidMount()

            if(this.props.shixun && this.props.shixun.forbid_copy == true) {
                // 禁用粘贴
                // https://github.com/Microsoft/monaco-editor/issues/100
                window.editor_monaco.onDidPaste( (a, b, c) => { window.__pastePosition = a })
                window.addEventListener('paste', (a, b, c) => {
                    const selection = window.editor_monaco.getSelection();
                    const range = new monaco.Range(
                        window.__pastePosition.startLineNumber || selection.endLineNumber,
                        window.__pastePosition.startColumn || selection.endColumn,
                        window.__pastePosition.endLineNumber || selection.endLineNumber,
                        window.__pastePosition.endColumn || selection.endColumn,);
                    window.editor_monaco.executeEdits('', [{range, text: ''}] )

                })

                // 禁用复制
                window.editor_monaco.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C, () => null);
                window.editor_monaco.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V, () => null);
            }


            setTimeout(() => {
                editor.layout();
                editor.focus();
            }, 600)

            window.editor_monaco.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
                this.props.doFileUpdateRequestOnCodeMirrorBlur();
                return false;
            });
            window.editor_monaco.onDidBlurEditorWidget(() => {
                this.props.onEditBlur && this.props.onEditBlur();
            })
        })

        // window.document.onkeydown = (e) => {
        //     e = window.event || e;
        //     if(e.keyCode== 83 && e.ctrlKey){
        //     /*延迟，兼容FF浏览器  */
        //         // setTimeout(function(){
        //             // alert('ctrl+s');
        //         // },1);
        //         this.props.doFileUpdateRequestOnCodeMirrorBlur();
        //         return false;
        //     }
        // };
    }
    onFontSizeChange = (value) => {
        toStore('cmFontSize', value)
        this.setState({ cmFontSize: value });
        this.editor_monaco.updateOptions({fontSize: value})
    }

    onCodeModeChange = (value) => {
        toStore('cmCodeMode', value);
        this.setState({ cmCodeMode: value });
        window.monaco.editor.setTheme(value);
    }


    onAutoCompleteSwitchChange = () => {

    }
	render() {
		const { repositoryCode, showSettingDrawer, settingDrawerOpen } = this.props;
		const { cmFontSize } = this.state;

	    return (
            <React.Fragment>
                <Drawer
                    anchor="right"

                    className="settingDrawer"

                    width={260}
                    open={settingDrawerOpen}

                    onClose={() => showSettingDrawer( false )}
                >
                    <TPICodeSetting {...this.props} {...this.state}
                        onFontSizeChange={this.onFontSizeChange}
                        onCodeModeChange={this.onCodeModeChange}
                        onAutoCompleteSwitchChange={this.onAutoCompleteSwitchChange}
                         ></TPICodeSetting>
                </Drawer>
                <div className = "" id="extend-challenge-file-edit" name="content"
                    style={{ width: '100%', height: '100%', border:'1px solid grey' }}></div>
            </React.Fragment>
	    );
  	}
}


export default ( TPIMonaco ) ;



/**
// http://testeduplus2.educoder.net/react/build/static/node_modules/
    _monaco-editor@0.15.6@monaco-editor/esm/vs/editor/common/config/editorOptions.js
export var EDITOR_DEFAULTS = {
    inDiffEditor: false,
    wordSeparators: USUAL_WORD_SEPARATORS,
    lineNumbersMinChars: 5,
    lineDecorationsWidth: 10,
    readOnly: false,
    mouseStyle: 'text',
    disableLayerHinting: false,
    automaticLayout: false,
    wordWrap: 'off',
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: 1
    wordWrapBreakBeforeCharacters: '([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋',
    wordWrapBreakAfterCharacters: ' \t})]?|&,;¢°′″‰℃、。｡､￠，．：；？！％・･ゝゞヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ｧｨｩｪｫｬｭｮｯｰ”〉》」』】〕）］｝｣',
    wordWrapBreakObtrusiveCharacters: '.',
    autoClosingBrackets: 'languageDefined',
    autoClosingQuotes: 'languageDefined',
    autoSurround: 'languageDefined',
    autoIndent: true,
    dragAndDrop: true,
    emptySelectionClipboard: true,
    copyWithSyntaxHighlighting: true,
    useTabStops: true,
    multiCursorModifier: 'altKey',
    multiCursorMergeOverlapping: true,
    accessibilitySupport: 'auto',
    showUnused: true,
    viewInfo: {
        extraEditorClassName: '',
        disableMonospaceOptimizations: false,
        rulers: [],
        ariaLabel: nls.localize('editorViewAccessibleLabel', "Editor content"),
        renderLineNumbers: 1 // On ,
        renderCustomLineNumbers: null,
        selectOnLineNumbers: true,
        glyphMargin: true,
        revealHorizontalRightPadding: 30,
        roundedSelection: true,
        overviewRulerLanes: 2,
        overviewRulerBorder: true,
        cursorBlinking: 1 /* Blink ,
        mouseWheelZoom: false,
        cursorStyle: TextEditorCursorStyle.Line,
        cursorWidth: 0,
        hideCursorInOverviewRuler: false,
        scrollBeyondLastLine: true,
        scrollBeyondLastColumn: 5,
        smoothScrolling: false,
        stopRenderingLineAfter: 10000,
        renderWhitespace: 'none',
        renderControlCharacters: false,
        fontLigatures: false,
        renderIndentGuides: true,
        highlightActiveIndentGuide: true,
        renderLineHighlight: 'line',
        scrollbar: {
            vertical: 1 /* Auto ,
            horizontal: 1 /* Auto ,
            arrowSize: 11,
            useShadows: true,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            horizontalScrollbarSize: 10,
            horizontalSliderSize: 10,
            verticalScrollbarSize: 14,
            verticalSliderSize: 14,
            handleMouseWheel: true,
            mouseWheelScrollSensitivity: 1,
        },
        minimap: {
            enabled: true,
            side: 'right',
            showSlider: 'mouseover',
            renderCharacters: true,
            maxColumn: 120
        },
        fixedOverflowWidgets: false,
    },
    contribInfo: {
        selectionClipboard: true,
        hover: {
            enabled: true,
            delay: 300,
            sticky: true
        },
        links: true,
        contextmenu: true,
        quickSuggestions: { other: true, comments: false, strings: false },
        quickSuggestionsDelay: 10,
        parameterHints: {
            enabled: true,
            cycle: false
        },
        iconsInSuggestions: true,
        formatOnType: false,
        formatOnPaste: false,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        acceptSuggestionOnCommitCharacter: true,
        wordBasedSuggestions: true,
        suggestSelection: 'recentlyUsed',
        suggestFontSize: 0,
        suggestLineHeight: 0,
        tabCompletion: 'off',
        suggest: {
            filterGraceful: true,
            snippets: 'inline',
            snippetsPreventQuickSuggestions: true,
            localityBonus: false
        },
        selectionHighlight: true,
        occurrencesHighlight: true,
        codeLens: true,
        folding: true,
        foldingStrategy: 'auto',
        showFoldingControls: 'mouseover',
        matchBrackets: true,
        find: {
            seedSearchStringFromSelection: true,
            autoFindInSelection: false,
            globalFindClipboard: false
        },
        colorDecorators: true,
        lightbulbEnabled: true,
        codeActionsOnSave: {},
        codeActionsOnSaveTimeout: 750
    },
};


 */
