/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-27 19:18:09
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-27 19:19:23
 */
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";

function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function toggleLanguage() {
    setLanguage(language === "javascript" ? "python" : "javascript");
  }

  return (
    <React.Fragment>
      <LinkToRepo />
      <button onClick={toggleTheme} disabled={!isEditorReady}>
        Toggle theme
      </button>
      <button onClick={toggleLanguage} disabled={!isEditorReady}>
        Toggle language
      </button>

      <Editor
        height="calc(100% - 19px)" // By default, it fully fits with its parent
        theme={theme}
        language={language}
        value={'c'}
        editorDidMount={handleEditorDidMount}
      />
    </React.Fragment>
  );
}