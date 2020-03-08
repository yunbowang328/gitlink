import React, { Component } from 'react';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import _ from 'lodash'
import Drawer from 'material-ui/Drawer';

import './TPICodeMirror.css'
import TPICodeSetting from './TPICodeSetting'


import { fromStore, toStore } from 'educoder'
require('codemirror/lib/codemirror.css');
// require('codemirror/mode/javascript/javascript');
// require('codemirror/mode/xml/xml');
// require('codemirror/mode/markdown/markdown');

function getModeByMirrorName(mirror_name) {
    let mode = 'javascript'
    if (mirror_name && mirror_name.length) {
        for (let i = 0; i < mirror_name.length; i++) {
            let modeVal = mirrorNameModeMap[mirror_name[i]];
            if (modeVal) {
                mode = modeVal;
                break;
            }
        }
    }
    return mode;
}
const _extraKeys = {"Alt-/": "autocomplete"};
function createCMOptions(mirror_name, theme) {
    let mode = getModeByMirrorName(mirror_name)

    let cmOptions = {
        lineNumbers: true,
        mode: mode,
        // theme: "railscasts",
        // theme: "vs-dark",
        theme: theme,
        indentUnit:4,
        matchBrackets: true,
        autoRefresh: true,
        smartIndent: true,//智能换行
        extraKeys: _extraKeys,
        autofocus: true,
        styleActiveLine: true,
        lint: true, 
        gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-lint-markers"]
    };
    return cmOptions;
}

const mirrorNameModeMap = {
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
}


let extend_editor = null;
let notCallCodeMirrorOnChangeFlag = false;

const $ = window.$;

/*
    lint的实现，目前只支持javascript\html\css\coffeescript\json的lint，支持的语言版本有待考量
    底层gutter mark实现使用的还是setGutterMarker接口（参见lint.js的189行）

    红色波浪线实现方式：
    _cm.markText({line:4, ch:32}, {line:4, ch:40}, {
        className: "CodeMirror-lint-mark-error",
        __annotation: {message: "Expected an identifier and instead saw ';'.", severity: "error"}
    })
*/
class TPICodeMirror extends Component {

	constructor(props) {
		super(props)
		this.state = {
            cmFontSize: fromStore('cmFontSize', 16),
            cmCodeMode: fromStore('cmCodeMode', 'vs-dark'),
            autoCompleteSwitch: fromStore('autoCompleteSwitch', true),
		}
	}
    onAutoCompleteSwitchChange = () => {
        extend_editor.setOption({
            extraKeys: this.state.autoCompleteSwitch ? _extraKeys : {"Ctrl-Alt-/": "autocomplete"}
        })
        toStore('autoCompleteSwitch', !this.state.autoCompleteSwitch)
        this.setState({ autoCompleteSwitch: !this.state.autoCompleteSwitch })
    }
	componentDidUpdate(prevProps, prevState, snapshot) {
        const { game, mirror_name } = this.props
        if (extend_editor && !_.isEqual(prevProps.mirror_name, mirror_name)) {
            extend_editor.setOption("mode", getModeByMirrorName(mirror_name));
        } 
    }
	componentDidMount() {
        let cmOptions = createCMOptions(this.props.mirror_name, this.state.cmCodeMode)
        extend_editor = window.CodeMirror.fromTextArea(window.$('#extend-challenge-file-edit')[0]
        	, cmOptions);

        extend_editor.on('beforeChange', (cm,change) => {
            // if ( ~readOnlyLines.indexOf(change.from.line) ) {
            //     change.cancel();
            // }
            if (change.origin === "setValue") {
                return;
            }
            if (!this.props.isEditablePath) {
                change.cancel();
            }
        });

        extend_editor.on('change', (cMirror) => {
            // get value right from instance
            // $('#extend-challenge-file-edit').val(cMirror.getValue());
            if (notCallCodeMirrorOnChangeFlag === true) {
                // 避免死循环 onRepositoryCodeUpdate 和 componentWillReceiveProps
                notCallCodeMirrorOnChangeFlag = false;
                return;
            }
            
            this.props.onRepositoryCodeUpdate(cMirror.getValue())
        });

        extend_editor.refresh();
		// wtf 加了这句后，禁用快捷键唤起autocomplete就生效了。。。
        extend_editor.setOption('extraKeys', {"Ctrl-Alt-/": "autocomplete"})

        // 拖拽也需要用 ： window.editor_CodeMirror.refresh()
        window.editor_CodeMirror = extend_editor;	// tpi_html_show需要用到

        this.initHint()
        this.props.codemirrorDidMount();
    }
    initHint() {
    	window.CodeMirror.showHint && extend_editor.on('keyup', (editor_arg, event) => {
		    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' 
		      || event.key === 'ArrowRight' || event.key === 'Enter' || event.key === 'Space'
		      // 32 空格
		      || event.key === 'Escape' || event.keyCode === 32 ) { // 避免使用键盘选择hint的时候再次触发

                // TODO 增加的键 ：ctrl+v ctrl+z
		      return;
		    }
            var cursor = extend_editor.getCursor();
            var lineText = extend_editor.getLine(cursor.line);
            const lastCharInput = lineText.charAt(cursor.ch - 1).trim()
            if (lineText && /^[a-zA-Z0-9_]+$/.test(lastCharInput) === true) {
                this.state.autoCompleteSwitch && extend_editor.showHint(editor_arg);
            }
		});

        let languageHints;
        if (this.props.challenge.isHtml === true) {
            languageHints = allCssPropValueArray
        }
		window.CodeMirror.on(extend_editor, "hinting", (words) => {
		  // extend_editor.state.needToClearJSHint = true;  // 每次调用完成后，needToClearJSHint会被置为false
		  var result = window.CodeMirror.hint.anyword(extend_editor)  // 获取当前editor里的单词
		  

		  extend_editor.state.myhints = languageHints || []
		  var myhints = extend_editor.state.myhints;
		  result.list.forEach(function(item) {
		    if (myhints.indexOf(item) === -1) myhints.push(item)
		  })
		})

		window.document.onkeydown = (e) => { 
         	e=window.event||e;
         	if(e.keyCode== 83 && e.ctrlKey){ 
        	   /*延迟，兼容FF浏览器  */
        	    // setTimeout(function(){
        		  	// alert('ctrl+s'); 
        	   	// },1); 
				this.props.doFileUpdateRequestOnCodeMirrorBlur();
                return false;      
   		    }    
       };
		 
		window.CodeMirror.registerHelper(	
			"hintWords", "javascript", 
			(
            // string
			"charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
	        "toUpperCase toLowerCase split concat match replace search " +
            // array
	        "length concat join splice push pop shift unshift slice reverse sort indexOf " +
	        "lastIndexOf every some filter forEach map reduce reduceRight " +
            // Math
            "sin cos tan abs ceil floor exp max min pow PI random " +

            "console log " +
	        "prototype apply call bind " +
			"double float int long short null true false enum super this void auto for register static const friend mutable explicit virtual template typename " +
	        "break continue return do while if else for instanceof switch case default try catch finally throw throws assert import byte char delete " +
	        "export operator with " +
	        "print exec raise lambda private protected public abstract class extends final implements interface native new static " +
	        "String vector Boolean function").split(" "));
    }

    componentWillReceiveProps(newProps) {

        if (this.props.codeLoading === true && newProps.codeLoading === false 
                && newProps.repositoryCode != extend_editor.getValue()) {
            // newProps.repositoryCode !== this.props.repositoryCode && 
            notCallCodeMirrorOnChangeFlag = true;
            
            
            // 重要：setState(因获取代码、重置代码等接口引起的调用)调用引起的变化才需要setValue
            extend_editor.setValue(newProps.repositoryCode)

            // Clears the editor's undo history.
            extend_editor.clearHistory()
        }
    }

    onFontSizeChange = (value) => {
        toStore('cmFontSize', value),

        this.setState({ cmFontSize: value });
    } 

    onCodeModeChange = (value) => {
        toStore('cmCodeMode', value);
        this.setState({ cmCodeMode: value });
        window.monaco.editor.setTheme(value);
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
                <div className="cmWrapper" style={{fontSize: `${cmFontSize}px`}}>
    	    	  <textarea className = "" id="extend-challenge-file-edit" name="content">{repositoryCode}</textarea>
                </div>
            </React.Fragment>
	    );
  	}
}


export default ( TPICodeMirror ) ;

// prop     http://css-infos.net/
const allCssPropertiesArray = 
`alignment-adjust
alignment-baseline
appearance
azimuth
background
background-attachment
background-clip
background-color
background-image
background-origin
background-position
background-repeat
background-size
baseline-shift
bookmark-label
bookmark-level
bookmark-target
border
border-bottom
border-bottom-color
border-bottom-left-radius
border-bottom-right-radius
border-bottom-style
border-bottom-width
border-clip
border-collapse
border-color
border-image
border-left
border-left-color
border-left-style
border-left-width
border-radius
border-right
border-right-color
border-right-style
border-right-width
border-spacing
border-style
border-top
border-top-color
border-top-left-radius
border-top-right-radius
border-top-style
border-top-width
border-width
bottom
box-decoration-break
box-shadow
caption-side
clear
clip
color
column-count
column-fill
column-gap
column-rule
column-rule-color
column-rule-style
column-rule-width
column-span
column-width
columns
content
counter-increment
counter-reset
crop
cue
cue-after
cue-before
cursor
direction
display
dominant-baseline
drop-initial-after-adjust
drop-initial-after-align
drop-initial-before-adjust
drop-initial-before-align
drop-initial-size
drop-initial-value
elevation
empty-cells
fit
fit-position
float
float-offset
font
font-family
font-size
font-size-adjust
font-stretch
font-style
font-variant
font-weight
grid-columns
grid-rows
hanging-punctuation
height
hyphenate-after
hyphenate-before
hyphenate-character
hyphenate-lines
hyphenate-resource
hyphens
icon
image-orientation
image-resolution
inline-box-align
left
letter-spacing
line-height
line-stacking
line-stacking-ruby
line-stacking-shift
line-stacking-strategy
list-style
list-style-image
list-style-position
list-style-type
margin
margin-bottom
margin-left
margin-right
margin-top
mark
mark-after
mark-before
marker-offset
marks
marquee-direction
marquee-loop
marquee-speed
marquee-style
max-height
max-width
min-height
min-width
move-to
nav-down
nav-index
nav-left
nav-right
nav-up
opacity
orphans
outline
outline-color
outline-offset
outline-style
outline-width
overflow
overflow-style
overflow-x
overflow-y
padding
padding-bottom
padding-left
padding-right
padding-top
page
page-break-after
page-break-before
page-break-inside
page-policy
pause
pause-after
pause-before
phonemes
pitch
pitch-range
play-during
pointer-events
position
presentation-level
punctuation-trim
quotes
rendering-intent
resize
rest
rest-after
rest-before
richness
right
rotation
rotation-point
ruby-align
ruby-overhang
ruby-position
ruby-span
size
speak
speak-header
speak-numeral
speak-punctuation
speech-rate
stress
string-set
tab-side
table-layout
target
target-name
target-new
target-position
text-align
text-align-last
text-decoration
text-emphasis
text-height
text-indent
text-justify
text-outline
text-overflow
text-shadow
text-transform
text-wrap
top
unicode-bidi
vertical-align
visibility
voice-balance
voice-duration
voice-family
voice-pitch
voice-pitch-range
voice-rate
voice-stress
voice-volume
volume
white-space
white-space-collapse
widows
width
word-break
word-spacing
word-wrap
z-index`.split('\n')

// value    http://www.siliconbaytraining.com/pages/csspv.html
/*  var array =[]; $('.test tr td:nth-child(2) font').each((index, item) => array = array.concat($(item).text().split(', ')))
    var mySet = new Set(array)
    array = Array.from(mySet)
    var array2=array.filter(item=> {return item.indexOf('(') == -1 && item.length < 18 && item != 'Values'})
    array2 = array2.map((item) => item.trim().replace('↵',''))
*/
const allCssValueArray = "none,inherit,normal,wider,narrower,ultra-condensed,semi-condensed,semi-expanded,expanded,extra-expanded,ultra-expanded,italic,oblique,small-caps,bold,bolder,lighter,xx-small,x-small,small,medium,large,x-large,xx-large,larger,smaller,1em,left,right,center,justify,underline,overline,line-through,blink,capitalize,uppercase,lowercase,scroll,fixed,transparent,top,bottom,repeat,repeat-x,repeat-y,no-repeat,auto,thin,thick,dotted,dashed,solid,double,groove,ridge,inset,outset,disc,circle,square,decimal,lower-roman,upper-roman,lower-alpha,upper-alpha,upper-latin,hebrew,armenian,georgian,cjk-ideographic,hiragana,katakana,hiragana-iroha,katakana-iroh,outside,inside,pre,nowrap,crosshair,default,pointer,move,e-resize,ne-resize,nw-resize,n-resize,se-resize,sw-resize,s-resize,w-resize,text,wait,help,invert,visible,hidden,open-quote,close-quote,no-open-quote,no-close-quote,inherit,none,both,ltr,rtl,inline,block,list-item,run-in,compact,marker,table,inline-table,table-row-group,table-row,table-caption,static,absolute,relative,embed,bidi-override,baseline,sub,super,text-top,middle,text-bottom,collapse,separate,show,hide,once,always,number,percentage,silent,x-soft,soft,loud,x-loud,spell-out,time,percentage,uri,mix,angle,left-side,far-left,center-left,center-right,far-right,right-side,behind,leftwards,rightwards,below,level,above,higher,lower,x-slow,slow,fast,x-fast,faster,slower,frequency,x-low,low,high,x-high,code,digits,continuous".split(',')
const allCssPropValueArray = allCssPropertiesArray.concat(allCssValueArray)