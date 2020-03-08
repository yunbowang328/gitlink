import React, { useState, useEffect, memo } from 'react';
import ImageLayer from '../../modules/page/layers/ImageLayer';
import { isImageExtension } from 'educoder';
const $ = window.$;
function ImageLayer2(props) {
    const [showImage, setShowImage] = useState(false)
    const [imageSrc, setImageSrc] = useState('')

    const { parentSel, childSel, watchPropsArray } = props

    const onImageLayerClose = () => {
        setShowImage(false)
        setImageSrc('')
    }
    const onDelegateClick = (event) => {
        const imageSrc = event.target.src || event.target.getAttribute('src') || event.target.getAttribute('href')
        // 判断imageSrc是否是图片
        const fileName = event.target.innerHTML.trim()
        if (isImageExtension(imageSrc.trim()) || isImageExtension(fileName) || event.target.tagName == 'IMG' || imageSrc.indexOf('base64,') != -1) {
            // 非回复里的头像图片; 非emoticons
            if (imageSrc.indexOf('/images/avatars/User') === -1 && 
                imageSrc.indexOf('kindeditor/plugins/emoticons') === -1 ) {  
                setShowImage(true)
                setImageSrc(imageSrc)
            }
            event.stopPropagation()
            event.preventDefault && event.preventDefault()
            event.originalEvent.preventDefault()
            // event.originalEvent.stopPropagation()
            // event.originalEvent.cancelBubble = true
            return false;
        }
    }
    useEffect(() => {
        $(parentSel)
            .delegate(childSel, "click", onDelegateClick);

        return () => {
            $(parentSel).undelegate(childSel, "click", onDelegateClick )
        }
    })

    return (
        <ImageLayer showImage={showImage} imageSrc={imageSrc} onImageLayerClose={onImageLayerClose}></ImageLayer>
    )
}

export default memo(ImageLayer2)