import axios from 'axios'

export function deleteVideoInCloud(login, video_id) {
    const url = `/users/${login}/videos/cancel.json`
    axios.post(url, {
        video_id
    }).then((response) => {
        

    }).catch((error) => {
        console.log(error)
    })
}