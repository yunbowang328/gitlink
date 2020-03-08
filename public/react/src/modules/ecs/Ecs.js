import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SnackbarHOC } from 'educoder';

import CustomLoadable from "../../CustomLoadable";
import {TPMIndexHOC} from "../tpm/TPMIndexHOC";

const Home = CustomLoadable(() => import('./Home/index'));
const EcYear = CustomLoadable(() => import('./EcYear/index'));
const EcSetting = CustomLoadable(() => import('./EcSetting/index'));

const $ = window.$
//工程认证各个页面的查看详情弹层
function elasticLayer(forumId){
    if (window.__memo) {
        doElasticLayer(window.__memo, true)
        return;
    }
    if (!forumId) return;
    var url = 'https://www.educoder.net/api/memos/' + forumId
    $.ajax({
        url: url,
        type: 'get',
        success: function(res) {
            console.log(res)
            doElasticLayer(res.memo)
        }
    });
    
    // document.body.addEventListener('touchmove',bodyScroll,false);
    // $('body').css({'position':'fixed',"width":"100%"});
}
function doElasticLayer(memo, rendered){
    if (rendered) {
        $(".layerContent").show();
        $(".newMain").hide();
        return;
    }
    window.__memo = memo
    var content = memo.content
    var subject = memo.subject
    var html='<div class="layerContent"><div class="educontent">' +
        '<p class="clearfix pt25 pb25 color-grey-3 bor-bottom-greyE"><span class="fl font-24">'+ subject +'</span>' +
        '<a href="javascript:void(0)" onclick="removeElasticLayer();" class="fr font-16 mt5">返回</a></p>' +
        '<div id="MDContent"><textarea style="display:none">'
            + content +
        '</textarea></div>'
                            
    $(".newMain").after(html).hide();

    window.editormd.markdownToHTML("MDContent", {
        htmlDecode: "style,script,iframe",  // you can filter tags decode
        taskList: true,
        tex: true,  // 默认不解析
        flowChart: true,  // 默认不解析
        sequenceDiagram: true // 默认不解析
    });
}
function removeElasticLayer(){
    $(".layerContent").hide();
    $(".newMain").show();
}
window.elasticLayer = elasticLayer
window.doElasticLayer = doElasticLayer
window.removeElasticLayer = removeElasticLayer

class Ecs extends React.Component {

  render() {
    return (
      <div className="newMain clearfix">
        <Switch>
          <Route extra path='/ecs/department' component={Home}></Route>
          <Route path='/ecs/major_schools/:majorId/years/:yearId/:type' component={EcSetting}></Route>
          <Route extra path='/ecs/major_schools/:majorId' component={EcYear}></Route>
        </Switch>
      </div>
    )
  }
}

export default SnackbarHOC() (TPMIndexHOC  ( Ecs ));