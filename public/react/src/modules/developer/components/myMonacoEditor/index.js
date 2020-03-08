/*
 * @Description: 抽取代码编辑器
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 15:02:52
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-02 13:59:38
 */
import './index.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Tooltip, Badge } from 'antd';
import { fromStore, CNotificationHOC } from 'educoder'; 
import { connect } from 'react-redux';
import MonacoEditor from '@monaco-editor/react';
import SettingDrawer from '../../components/monacoSetting';
import CONST from '../../../../constants';
import MyIcon from '../../../../common/components/MyIcon';

// import actions from '../../../../redux/actions';

const { fontSetting, opacitySetting } = CONST;
const maps = {
  'c': 'main.c',
  'c++': 'main.cc',
  'java': 'main.java',
  'python': 'main.py'
};

function MyMonacoEditor (props, ref) {

  const {
    code,
    notice,
    language, 
    identifier,
    hadCodeUpdate,
    showOrHideControl, 
    // saveUserInputCode,
    onCodeChange,
    onRestoreInitialCode,
    onUpdateNotice
  } = props;

  const [showDrawer, setShowDrawer] = useState(false); // 控制配置滑框
  // const [editCode, setEditCode] = useState('');
  // const [curLang, setCurLang] = useState('C');
  const [fontSize, setFontSize] = useState(() => { // 字体
    return +fromStore('oj_fontSize') || 14;
  });
  const [theme, setTheme] = useState(() => { // 主题 theme
    return fromStore('oj_theme') || 'dark';
  });
  const [ height, setHeight ] = useState('calc(100% - 56px)');
  const editorRef = useRef(null);

  // useEffect(() => {
  //   setEditCode(props.code || '');
  // }, [props]);
  
  useEffect(() => {
    setHeight(showOrHideControl ? 'calc(100% - 378px)' : 'calc(100% - 56px)');
  }, [showOrHideControl]);

  // 控制侧边栏设置的显示
  const handleShowDrawer = () => {
    setShowDrawer(true);
  }
  // 关闭设置
  const handleDrawerClose = () => {
    setShowDrawer(false);
  }
  // 侧边栏改变字体大小
  const handleChangeFontSize = (value) => {
    setFontSize(value);
  }
  // 改变主题
  const handleChangeTheme = (value) => {
    setTheme(value);
  }

    // 文本框内容变化时，记录文本框内容
  const handleEditorChange = (origin, monaco) => {
    editorRef.current = monaco; // 获取当前monaco实例
    // setEditCode(origin); // 保存编辑器初始值
    editorRef.current.onDidChangeModelContent(e => { // 监听编辑器内容的变化
      // TODO 需要优化 节流
      const val = editorRef.current.getValue();
      // setEditCode(val);
      // console.log('编辑器代码====>>>>', val);
      onCodeChange(val);
      // 值一变化保存当前代码值
      // saveUserInputCode(val);
    });
  }

  // 配置编辑器属性
  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: `${fontSize}px`
  }
  
  // 恢复初始代码
  const handleRestoreCode = () => {
    props.confirm({
      title: '提示',
      content: '确定要恢复代码吗?',
      onOk () {
        onRestoreInitialCode && onRestoreInitialCode();
      }
    })
    // Modal.confirm({
    //   content: '确定要恢复代码吗?',
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk () {
    //     onRestoreInitialCode && onRestoreInitialCode();
    //   }
    // })
  }

  const handleUpdateNotice = () => {
    if (props.notice) {
      onUpdateNotice && onUpdateNotice();
    }
  }
  
  // const renderRestore = identifier ? (
  //   <MyIcon type="iconzaicizairu" />
  // ) : '';

  // lex_has_save ${hadCodeUpdate} ? : ''
  const _classnames = hadCodeUpdate ? `flex_strict flex_has_save` : 'flex_strict';
  return (
    <React.Fragment>
      <div className={"monaco_editor_area"}>
        <div className="code_title">
          {/* 未保存时 ? '学员初始代码文件' : main.x */}
          <span className='flex_strict' style={{ color: '#ddd'}}>{identifier ? language ? maps[language.toLowerCase()] : '' : '学员初始代码文件'}</span>
          <span className={_classnames}>{hadCodeUpdate ? '已保存' : ''}</span>
          {/* <Tooltip
            style={{ background: 'gold' }}
            className="tooltip_style"
            title="通知" 
            placement="bottom"
          > */}
          <Tooltip
            placement="bottom"
            title="通知"
          >
            <Badge 
              className="flex_normal" 
              style={{ color: '#666'}} 
              dot={notice}
              onClick={handleUpdateNotice}
            >
              {/* <Icon type="bell" /> */}
              <MyIcon type="iconxiaoxi1" style={{fontSize: '18px'}}/>
            </Badge>
          </Tooltip>
          <Tooltip
            placement="bottom"
            title="恢复"
          >
            <MyIcon 
              className="flex_normal" 
              onClick={handleRestoreCode} 
              type="iconzaicizairu"
              style={{ display: identifier ? 'inline-block' : 'none', fontSize: '18px'}}
            />
            {/* <span onClick={handleRestoreCode} className="flex_normal"  style={{ display: identifier ? 'inline-block' : 'none'}}>{renderRestore}</span> */}
          </Tooltip>
          <Tooltip
            placement="bottom"
            title="设置"
          >
            <MyIcon className='code-icon' type="iconshezhi" onClick={handleShowDrawer} style={{fontSize: '18px'}}/>
          </Tooltip>
        </div>
        <MonacoEditor
            height={height}
            width="100%"
            language={language && language.toLowerCase()}
            value={code || ''}
            options={editorOptions}
            theme={theme} // dark || light
            editorDidMount={handleEditorChange}
          />
      </div>

      <Drawer
        className={'setting_drawer'}
        placement="right"
        onClose={handleDrawerClose}
        visible={showDrawer}
      >
        <SettingDrawer 
          {...fontSetting} 
          onChangeFontSize={handleChangeFontSize}
          onChangeTheme={handleChangeTheme}
        />
        <SettingDrawer {...opacitySetting}/>
      </Drawer>
    </React.Fragment>
  )
};

const mapStateToProps = (state) => {
  const { showOrHideControl } = state.commonReducer;
  return {
    showOrHideControl
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   // saveUserInputCode: (code) => dispatch(actions.saveUserInputCode(code)),
// });

// MyMonacoEditor = React.forwardRef(MyMonacoEditor);
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CNotificationHOC() (MyMonacoEditor));
