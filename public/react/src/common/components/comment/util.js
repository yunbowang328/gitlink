/*
 * @Description: quill delta -> html
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-24 08:51:25
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-26 09:30:11
 */
export const formatDelta = (deltas) => {

  let formatted = [];

  deltas.forEach(element => {
    let text = null;
    // 没有图片时
    if (!element['insert']['image']) {
      text = element['insert']; // 获取插入的内容
      // 元素有属性时
      if (element['attributes']) {
        // 获取所有的key值
        const keys = Object.keys(element['attributes']);
        keys.forEach(key => {
          text = operate(text, key, element['attributes'][key]);
        });
      } else if (element['insert']['formula']) {
        text = element['insert']['formula'];
      }
    } else {
      const image = element['insert']['image'];
      const {url, alt} = image;
      if (url && (url.startsWith('http') || url.startsWith('https'))) {
        text = `
          <img
            src="${url}"
            style="{display: 'inline-block'}"
            width="60px"
            height="30px"
            alt="${alt}"
          />
        `;
        // text = "<img src="+url+" width='60px' height='30px' onclick='' alt="+alt+"/>";
      }
    }

    formatted.push(text);
  });
  console.log(formatted);
  return formatted.join('');
}

/**
 * @param {*} text 文本内容
 * @param {*} key 属性key
 * @param {*} value 属性key对应的值
 */
export const operate = (text, key, value) => {
  let operatedText = null;
  debugger;
  switch (key) {
    case 'bold':
      operatedText = `<strong>${text}</strong>`;
      break;
    case 'italic':
      operatedText = `<i>${text}</i>`;
      break;
    case 'strike':
      operatedText = `<s>${text}</s>`;
      break;
    case 'underline':
      operatedText = `<u>${text}</u>`;
      break;
    case 'link':
      operatedText = `<a href="${value}" style="color: #5091ff; text-decoration: underline;" target="bland">${text}</a>`;
      break;
    default: 
      operatedText = text;
  }

  return operatedText;
}
