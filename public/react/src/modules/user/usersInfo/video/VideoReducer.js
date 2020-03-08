import update from 'immutability-helper'

function find(state, action) {
    let _index = -1
    state.videos.some((item, index) => {
        // 同文件不同名字 fileHash也是一样的
        if (item.loaded != 100 && ((!item.fileHash || action.uploadInfo.fileHash == item.fileHash) && action.uploadInfo.file.name == item.name)) {
            _index = index
            return true;
        }
    })
    return _index;
}
export function reducer(state, action) {
  switch (action.type) {
    case 'addVideo':
        const uploadInfo = action.uploadInfo
        return {videos: [...state.videos, {
            name: uploadInfo.file.name,
            size: uploadInfo.file.size,
            type: uploadInfo.file.type,

            fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
            state: uploadInfo.state, //  "Uploading"  "Ready"   "Success"
            videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
            loaded: 0,

            title: ''
        }]};
    case 'removeVideo': 
        return {
            videos: update(state.videos, {$splice: [[action.index, 1]]}) 
        }
    case 'removeAll': 
        return {
            videos: []
        }
    case 'updateProgress':
        let _index = find(state, action)
        let newvideos = state.videos
        // 删除先执行
        if (_index != -1) {
            newvideos = update(state.videos, {[_index]: { 
                loaded: {$set: action.progressPercent},

                videoId: {$set: action.uploadInfo.videoId},
                // addFileSuccess的时候没有fileHash
                fileHash: {$set: action.uploadInfo.fileHash}
            }})
        }
        return {videos: newvideos};
    case 'updateTitle':
        let _upadteIndex = action.index

        let newvideos2 = state.videos
        
        if (_upadteIndex != -1) {
            newvideos2 = update(state.videos, {[_upadteIndex]: { 
                title: {$set: action.title},
            }})
        }
        return {videos: newvideos2};
    default:
      throw new Error();
  }
}

export const initialState = {videos: []};