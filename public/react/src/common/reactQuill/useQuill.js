/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 09:09:50
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-17 15:46:50
 */
import useQuillPlaceholder from './useQuillPlaceholder';
import useQuillValueSync from './useQuillValueSync';
import useQuillOnChange from './useQuillOnChange';
import useMountQuill from './useMountQuill';
import { useEffect } from 'react';

function useQuill ({
  disallowColors,
  placeholder,
  uploadImage,
  onChange,
  options,
  value,
  element,
  showUploadImage
}) {

  // 获取 quill 实例
  const quill = useMountQuill({
    element,
    options,
    uploadImage,
    showUploadImage
  });

  useEffect(() => {
    if (disallowColors && quill) {
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        delta.ops = delta.ops.map(op => {
          if (op.attributes && op.attributes.color) {
            const { color, ...attributes } = op.attributes;
            return {
              ...op,
              attributes
            }
          }
          return op;
        });
        return delta;
      });
    }
  }, [
    disallowColors,
    quill
  ]);
  
  useQuillPlaceholder(quill, placeholder);
  useQuillValueSync(quill, value);
  useQuillOnChange(quill, onChange);
}

export default useQuill;
