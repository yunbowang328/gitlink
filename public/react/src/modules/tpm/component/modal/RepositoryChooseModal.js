// import React, { useState, useEffect, memo } from 'react';
// import axios from 'axios'
// import { Modal, Input } from 'antd';

// function RepositoryChooseModal(props) {
//     const [trees, setTrees] = useState([])
//     const [path, setPath] = useState('')
//     const [pathArray, setPathArray] = useState([{val: "根目录/", path: ""}])
//     const [modalVisible, setModalVisible] = useState(true)

//     useEffect(() => {
//         repository('')
//     }, [])
//     function onOk() {

//     }
//     function onCancel() {

//     }
//     /**
//         点nav  会传入key
//         点item 会传入 newPath

//         item => name, type              type tree/leaf
//      */
//     const repository=(item, key, newPath)=>{
//         let newPathArray = [] // 
//         // 
//         if (key) {
//             for(var i=0; i<=key; i++){
//                 newPathArray.push(pathArray[i])
//             }
//         } else if (item) {
//             newPathArray = pathArray.slice(0)
//             newPathArray.push({val: item.name, path: pathArray[pathArray.length - 1] + "/" + item.name})
//         }
        
//         const path = item || key ? newPathArray[newPathArray.length - 1] : ''
        
// 		let id = props.match.params.shixunId;
// 		let url ="/shixuns/"+id+"/repository.json";
// 		axios.post(url,{
// 			path: path
// 		}).then((response) => {
// 			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

// 			}else{
//                 setTrees(response.data.trees)
//                 setPath(path)
//                 pathArray(newPathArray)
// 			}

// 		}).catch((error) => {
// 			console.log(error)
// 		});
// 	}
//     const savegetfilepath=(value)=>{
//         const state = {}
// 		let {selectpath,saveshixunfilepath,pathtype} = state

// 		if(pathtype===1){
// 			let newselectpath;

// 			if(saveshixunfilepath==="shixunfilepathplay"){
// 				newselectpath=value
// 			}else{
// 				const type = selectpath.split('；');
// 				let types=false;
// 				for(var i=0; i<type.length; i++){
// 					if(type[i]===value){
// 						types=true
// 						return
// 					}
// 				}

// 				if(types===false){
// 					newselectpath=selectpath+value+ "；"
// 				}else{
// 					newselectpath=selectpath
// 				}
// 			}
// 			// this.setState({
// 			// 	// selectpatharr:newarr,
// 			// 	selectpath: newselectpath,

// 			// })
// 		}
        
//     }
//     const goblakepath=(path,key)=>{

//     }
//     function sendgetfilepath() {

//     }
//     return (
//         <Modal
//             keyboard={false}
//             title="文件路径"
//             visible={modalVisible}
//             closable={false}
//             footer={false}
//         >
//             <div className="task_popup_con">
//                 <div className="newupload_conbox clearfix">
//                     <ul id="directory_file">
//                         {/*文件导航*/}
//                         {
//                             pathArray.length===0?"":pathArray.map((item,key)=>{
//                                 return(
//                                     <a className="f14 fb" onClick={()=>goblakepath(item.path,key,item)}>{item.val}</a>
//                                 )
//                             })
//                         }
//                         {/*文件*/}
//                         {trees === undefined || trees === null ? "" : trees.map((item, key) => {
//                             return(
//                                 <li className="entry" key={key}>
//                                     <div className="filename_no_report hidden">{
//                                         item.type==="tree"?<a onClick={()=>sendgetfilepath(item.name,item.type,path+item.name)} data-remote="true">
//                                             <i className="iconfont icon-wenjianjia color-blue mr2"></i>
//                                             {path+item.name}</a>:<a data-remote="true">
//                                             <i className="iconfont icon-zuoye color-blue mr2"></i>
//                                             <span onClick={()=>savegetfilepath(path+item.name,item.type)}>{path+item.name}</span>
//                                         </a>
//                                     }
//                                     </div>
//                                 </li>

//                             )
//                         })}

//                     </ul>
//                     <div className="clearfix mt20">
//                         <label className="fl mt5 directory_filepath">选中的文件路径：</label>
//                         <Input id="points_tusi" placeholder="选中的文件路径" className="fl input-60-40"
//                                         style={{width:"400px"}}
//                                         onInput={(e)=>saveselectpath(e)}
//                                         value={path}/>
//                     </div>

//                     <a className="task-btn task-btn-orange fr"
//                             style={{marginTop: '20px',marginLeft:'20px'}} id="add_path"  onClick={()=>onOk()}>确定</a>
//                     <a  className="pop_close task-btn mb10 fr"
//                             style={{marginTop: '20px'}} id="back_page" onClick={()=>onCancel()}>取消</a>
//                 </div>
//             </div>
//         </Modal>
//     )

// }

// export default RepositoryChooseModal