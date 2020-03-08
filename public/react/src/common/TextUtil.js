import { bytesToSize, getUrl, getUrl2 } from 'educoder';
const $ = window.$

export function isImageExtension(fileName) {
    return fileName ? !!(fileName.match(/.(jpg|jpeg|png|gif)$/i)) : false
}

export function markdownToHTML(oldContent, selector) {
    window.$('#md_div').html('')
    // markdown to html
    if (selector && oldContent && oldContent.startsWith('<p')) {  // 普通html处理
        window.$('#' + selector).addClass('renderAsHtml')
        window.$('#' + selector).html(oldContent)
    } else {
        try {    
        $("#"+selector).html('')
            // selector || 
        var markdwonParser = window.editormd.markdownToHTML(selector || "md_div", {
            markdown: oldContent, // .replace(/▁/g,"▁▁▁"),
            emoji: true,
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            taskList: true,
            tex: true,  // 默认不解析
            flowChart: true,  // 默认不解析
            sequenceDiagram: true // 默认不解析
        });

        } catch(e) {
            console.error(e)
        }
        // selector = '.' + selector
        if (selector) {
            return;
        }
        
        const content = window.$('#md_div').html()
        if (selector) {
            window.$(selector).html(content)
        }
        return content
    }
}
function _doDownload(options) {
    $.fileDownload(getUrl() + "/api" + options.url, {
        successCallback: options.successCallback,
        failCallback: options.failCallback
    });
}
export function downloadFile(options) {
    if ($.fileDownload) {
        _doDownload(options)
    } else {
        const _url_origin = getUrl2()
        $.getScript(
            `${_url_origin}/javascripts/download/jquery.fileDownload.min.js`,
            (data, textStatus, jqxhr) => {
            _doDownload(options)
        });
    }
        
}

export function appendFileSizeToUploadFile(item) {
    return `${item.title}${uploadNameSizeSeperator}${item.filesize}`
}
export function appendFileSizeToUploadFileAll(fileList) {
    return fileList.map(item => {
        if (item.name.indexOf(uploadNameSizeSeperator) == -1) {
          return Object.assign({}, item, {name: `${item.name}${uploadNameSizeSeperator}${bytesToSize(item.size)}`})
        } 
        return item
    }) 
}
export const uploadNameSizeSeperator = '　　'

export const sortDirections = ["ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", 
      "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", 
      "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", 
      "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", "ascend", "descend", ]