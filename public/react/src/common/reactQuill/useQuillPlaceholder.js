/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 09:28:34
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-16 11:39:48
 */
import { useEffect } from 'react'

function useQuillPlaceholder (
  quill,
  placeholder
) {

  useEffect(() => {
    if (!quill || !quill.root) return;
    quill.root.dataset.placeholder = placeholder;
  }, [quill, placeholder]);
}

export default useQuillPlaceholder;
