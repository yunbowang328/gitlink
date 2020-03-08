/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 19:49:11
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-16 11:39:27
 */
import { useEffect } from 'react';

function useQuillOnChange (quill, onChange) {
  
  useEffect(() => {

    if (!quill) return;
    if (typeof onChange !== 'function') return;

    let handler;

    quill.on(
      'text-change', 
      (handler = () => {
        onChange(quill.getContents()); // getContents: 检索编辑器内容
      })
    );

    return () => {
      quill.off('text-change', handler);
    }
  }, [quill, onChange]);
}

export default useQuillOnChange;
