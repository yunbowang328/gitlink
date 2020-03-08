/*
 * @Description: 创建 reactQuill实例
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 09:31:42
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-17 20:42:05
 */
import Quill from 'quill'; // 导入quill
import { useState, useEffect, useMemo } from 'react';
import flatten from './flatten.js';
import useDeepEqualMemo from './useDeepEqualMemo';
import Katex from 'katex';
import ImageBlot from './ImageBlot';
import { fetchUploadImage } from '../../services/ojService.js';
import { getImageUrl } from 'educoder'
window.katex = Katex;

Quill.register(ImageBlot);

function useMountQuill ({
  element,
  options: passedOptions,
  uploadImage,
  showUploadImage,
  imgAttrs = {} // 指定图片的宽高属性
}) {

  // 是否引入 katex
  const [katexLoaded, setKatexLoaded] = useState(Boolean(window.katex))
  const [quill, setQuill] = useState(null);

  const options = useDeepEqualMemo(passedOptions);
  console.log('use mount quill: ', passedOptions);

  // 判断options中是否包含公式
  const requireKatex = useMemo(() => {
    return flatten(options.modules.toolbar).includes('formula');
  }, [options]);

  // 加载katex
  useEffect(() => {
    if (!requireKatex) return;
    if (katexLoaded) return;

    const interval = setInterval(() => {
      if (window.katex) {
        setKatexLoaded(true);
        clearInterval(interval); 
      }
    });

    return () => { // 定义回调清除定时器
      clearInterval(interval);
    }

  }, [
    setKatexLoaded,
    katexLoaded,
    requireKatex
  ]);

  // 加载 quill
  useEffect(() => {
    if (!element) return;
    if (requireKatex && !katexLoaded) {
      element.innerHTML = `
        <div style="color: #ddd">
          Loading Katex...
        </div>
      `
    }
    // 清空内容
    element.innerHTML = '';
    console.log(element);
    // 创建 quill 节点
    const quillNode = document.createElement('div');
    element.appendChild(quillNode);  // 将quill节点追回到 element 元素中

    const quill = new Quill(element, options);
    setQuill(quill);
    // 加载上传图片功能
    if (typeof uploadImage === 'function') {
      quill.getModule('toolbar').addHandler('image', (e) => {
        // 创建type类型输入框加载本地图片
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async (e) => {
          const file = input.files[0]; // 获取文件信息
          const formData = new FormData();
          formData.append('file', file);

          // const reader = new FileReader();
          // reader.readAsDataURL(file);
          // console.log('文件信息===>>', reader);
          // reader.onload = function (e) {
          //   debugger;
          //   console.log('文件信息===>>', e.target.result);
          //   const image = new Image();
          //   image.src = e.target.result;

          //   image.onload = function () {
          //     // file.width = 
          //     console.log(image.width, image.height);
          //   }
          // }

          const range = quill.getSelection(true);
          let fileUrl = ''; // 保存上传成功后图片的url
          // 上传文件
          const result = await fetchUploadImage(formData);
          // 获取上传图片的url
          if (result.data && result.data.id) {
            fileUrl = getImageUrl(`api/attachments/${result.data.id}`);
          }
          // 根据id获取文件路径
          const { width, height } = imgAttrs;
          // console.log('上传图片的url:', fileUrl);
          if (fileUrl) {
            quill.insertEmbed(range.index, 'image', {
              url: fileUrl,
              alt: '',
              onClick: showUploadImage,
              width,
              height
            }); 
          }
        }
      });
    }

    return () => {
      element.innerHTML = '';
    }
  }, [
    element,
    options,
    requireKatex,
    katexLoaded,
  ]);

  return quill;
}

export default useMountQuill;
