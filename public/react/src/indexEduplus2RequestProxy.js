/*
    新版很多接口只是改了接口名字，参数和请求类型并没有修改，只需要建立一个map来处理这个改动就行。
*/ 
const normalRequestMap = {

}
// 有些url里面包含了可变的参数，需要遍历一遍，用正则找到对应的url
const paramRequestOldUrlArray = [
    // /\/api\/v1\/careers\/(\w*)\/edit/i, 
    // /\/api\/v1\/games\/(\w*)\/rep_content/i,

    // /api/v1/games/rwvl6htgoufi/entries
    // /\/api\/v1\/games\/(\w*)\/entries/i,

	// `/api/v1/games/${game.identifier}/choose_build`
    /\/api\/v1\/games\/(\w*)\/choose_build/i

]
const paramRequestNewUrlArray = [
    // 获取代码内容
    // (matchResult) => {
    //     const stageId = matchResult[1]
    //     return `/tasks/${stageId}/rep_content.json`
    // },

    // 获取版本库目录、文件
    // http://testeduplus2.educoder.net/tasks/se79x25pzfwo/git_entries.json?path=&dev=master&gpid=3441
    // (matchResult) => {
    //     const stageId = matchResult[1]
    //     // return `/tasks/${stageId}/git_entries.json`
    //     return `/myshixuns/${stageId}/repository.json`
    // },

    // `/tasks/tonblikwzj78/choose_build.json`
    (matchResult) => {
        const stageId = matchResult[1]
        return `/tasks/${stageId}/choose_build.json`
    },
]
export function requestProxy(config) {
    // return config;
    const url = config.url;
    if (url.indexOf('.json') !== -1) { // 已经是新接口了
        return config;
    }

    // TODO 为true的话会报错 Error: Network Error
    config.withCredentials = false;

    const oldUrlSplitPathArray = url.split('?');
    let oldPath = oldUrlSplitPathArray[0]
    let newPath, newUrl;
    newPath = normalRequestMap[oldPath];
    if (!newPath) { // 是带参的restful风格的url
        paramRequestOldUrlArray.forEach((item, index) => {
            const matchResult = oldPath.match(item);
            if (matchResult) {  // 找到了对应的restful api url
                const newUrlGenerator = paramRequestNewUrlArray[index];
                newPath = newUrlGenerator && newUrlGenerator(matchResult)

                newUrl = `${newPath}?${oldUrlSplitPathArray[1]}`
                config.url = newUrl
                return config;
            }
        });
    }
    return config;
}

/**
    ('/api/v1/careers/qweqw/edit/').match(/\/api\/v1\/careers\/(\w*)\/edit/i)
    0: "/api/v1/careers/qweqw/edit"
    1: "qweqw"

    example:
    `/api/v1/games/${this.props.game.identifier}/answer_grade` ->
    `/tasks/${this.props.game.identifier}/answer_grade.json` 


    https://testeduplus2.educoder.net/api/v1/games/feguz4tiqpvx/rep_content
        ?path=src/step2/CLnkQueue.cpp&shixun_gpid=2791&status=0&retry=0   ->
    http://testeduplus2.educoder.net/tasks/tonblikwzj78/rep_content.json
        ?path=1-4.py&shixun_gpid=2448&status=0
 */