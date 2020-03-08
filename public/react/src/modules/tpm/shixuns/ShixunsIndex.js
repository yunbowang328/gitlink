import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import axios from 'axios';

import { Spin } from 'antd';

import { TPMIndexHOC } from '../TPMIndexHOC';

import { SnackbarHOC } from 'educoder';

import ShixunCardList from './ShixunCardList';

import ShixunSearchBar from './ShixunSearchBar';

import ShixunCard from './ShixunCard';

import UpgradeModals from '../../modals/UpgradeModals';

const queryString = require('query-string');

const $ = window.$;

class ShixunsIndex extends Component {
    constructor(props) {
        super(props)
        this.state={
            order_by: "new",
            page:1,
            limit:16,
            keyword:"",
            status:0,
            diff:0,
            tag_level: 1,
            tag_id:'',
            middleshixundata:[],
            typepvisible:true,
            pages:1,
            search_tags:null,
            parsedid:undefined,
            newtag_level:undefined,
            newpalce:undefined,
            sort:"desc"
        }
    }
    componentDidMount(){

			const upsystem=`/users/system_update.json`;
			axios.get(upsystem).then((response)=>{
				let updata=response.data;
				this.setState({
					updata:updata
				})
			}).catch((error)=>{
				console.log(error);
			})



			let _keyword;
        if (window.__headSearchKeyword) {
            this.setState({ keyword: window.__headSearchKeyword })
            _keyword = window.__headSearchKeyword
            delete window.__headSearchKeyword
        }
        const parsed = queryString.parse(this.props.location.search);
        if(parsed.id===undefined&&parsed.type===undefined){
            let {order_by, tag_level, tag_id, page, limit, keyword, status, diff} = this.state;
            let params={
                order_by:order_by,
                tag_level:tag_level,
                tag_id:tag_id,
                page:page,
                limit:limit,
                keyword: _keyword || keyword ,
                status:status,
                diff:diff,
                sort: "desc"
            }
            this.shixunresultend(params);
        }else{
            let {order_by,page, limit, keyword, status, diff} = this.state;
            let nawparsed=parsed.type;
            let newpalce=parsed.palce;
            if(nawparsed==="rep"){
                nawparsed=1
            }
            else if(nawparsed==="sub"){
                nawparsed=2
            }else if(nawparsed==="tag"){
                nawparsed=3
            }
            let params={
                order_by:order_by,
                tag_level:nawparsed,
                tag_id:parsed.id,
                page:page,
                limit:limit,
                keyword: _keyword || keyword,
                status:status,
                diff:diff,
                sort: "desc"
            }
            this.setState({
                parsedid:parsed.id,
                newtag_level:nawparsed,
                tag_level:nawparsed,
                newpalce:newpalce,
                tag_id:parsed.id,
                keyword: _keyword || keyword,
            })
            this.shixunresultend(params);
        }

    }

    allUpdatashixunlist=()=>{
			let{sort,order_by}=this.state;

        this.setState({
            tag_level: 1,
            tag_id:'',
            page: 1,
            limit: 16,
            keyword:'',
            status: 0,
            diff: 0,
        })

        let params={
            order_by:order_by,
            tag_level: 1,
            tag_id:'',
            page: 1,
            limit: 16,
            keyword:'',
            status: 0,
            diff: 0,
				  	sort:sort
        }
        this.shixunresultend(params)
    }
    Updatasearchlist=(value)=>{
        if (value[1].tag_id === " ") {
            this.setState({
                keyword: ""
            })
        }
        this.setState({
            tag_level:value[0].tag_level,
            tag_id:value[1].tag_id,
            typepvisible:true
        })

        let {order_by, sort, limit, keyword, status, diff} = this.state;

        let params={
            order_by:order_by,
            tag_level:value[0].tag_level,
            tag_id:value[1].tag_id,
            page:1,
            limit:limit,
            keyword:keyword,
            status:status,
            diff:diff,
					  sort:sort
        }

        this.shixunresultend(params)
    }

    StatusEnquiry=(key)=>{

        let Vrl=`/shixuns.json`;
        let newstatus;
        let newdiff;
        if(key[0].type===1){
            this.setState({
                status: key[1].value,
                typepvisible:true
            })
            newstatus=key[1].value;
            newdiff=this.state.diff;
        }else if(key[0].type===2){
            this.setState({
                diff: key[1].value,
                typepvisible:true
            })
            newdiff=key[1].value;
            newstatus=this.state.status;
        }
        let params= {
            order_by:this.state.order_by,
            tag_level:this.state.tag_level,
            tag_id:this.state.tag_id,
            page:1,
            limit:this.state.limit,
            keyword:this.state.keyword,
            status:newstatus,
            diff:newdiff,
        }
        this.shixunresultend(params)

    }

    OnSearchInput=(value,type)=>{
      if(type===true){
        this.setState({
            keyword:value,
            typepvisible:true,
            pages:1
        })
        let {order_by, tag_level, tag_id, sort, limit, status, diff} = this.state;
        let params= {
            order_by:order_by,
            tag_level:tag_level,
            tag_id:tag_id,
            page:1,
            limit:limit,
            keyword:value,
            status:status,
            diff:diff,
					  sort:sort
        }
          this.shixunresultend(params)
        }else{
        this.setState({
          keyword:value,
          pages:1
        })
      }


    }

    ShixunsSwitch=()=>{
        //types
        this.setState({
            order_by:"mine",
            typepvisible:true,
            pages:1,
        })
        let{tag_level,tag_id,page,limit,keyword,status,diff,sort}=this.state;
        let newsort=sort;
        if(newsort===undefined){
            newsort="desc"
        }
        let params= {
            order_by:"mine",
            tag_level:tag_level,
            tag_id:tag_id,
            page:1,
            limit:limit,
            keyword:keyword,
            status:status,
            diff:diff,
            sort:newsort
        }
        this.shixunresultend(params)
    }


    shixunsPage=(value)=>{
        this.setState({
            page:value,
            typepvisible:true,
            pages:value
        })
        let {order_by, tag_level, tag_id, limit, keyword, status, diff,sort} = this.state;
        let params= {
            order_by:order_by,
            tag_level:tag_level,
            tag_id:tag_id,
            page:value,
            limit:limit,
            keyword:keyword,
            status:status,
            diff:diff,
			  		sort:sort
        }

        let Url=`/shixuns.json`;
        axios.get(Url,{
            params
        }).then((response)=> {
            if(response.status===200){
                this.setState({
                    middleshixundata: response.data,
                    typepvisible:false,
                });
            }
        }).catch((error)=>{
            console.log(error)
        });
    }
    ShixunsState=(val,type,sorts)=>{
        // sort,
        let {tag_level, tag_id, page, limit, keyword, status, diff,sort} = this.state;
        let newsort=sorts?sorts:sort;
        this.setState({
            order_by:type,
            typepvisible:true,
            pages:1,
            sort:sorts?sorts:sort
        })

        let params
        // let vals=false
          if(newsort===undefined){
              newsort="desc"
          }else{
              newsort=sorts?sorts:sort
          }
        params= {
            order_by:type,
            tag_level:tag_level,
            tag_id:tag_id,
            page:1,
            limit:limit,
            keyword:keyword,
            status:status,
            diff:diff,
            sort:newsort
        }
        this.shixunresultend(params)
    }

    Shixunsupcircles=(sort)=>{
        console.log(sort)
        this.setState({
            sort:sort
        })
        let {
            order_by,
            tag_level,
            tag_id,
            limit,
            keyword,
            status,
            diff,
        } = this.state;



        let params= {
            order_by:order_by,
            tag_level:tag_level,
            tag_id:tag_id,
            page:1,
            limit:limit,
            keyword:keyword,
            status:status,
            diff:diff,
            sort:sort
        }
        this.shixunresultend(params)
    }




    shixunresultend=(params)=>{
        let Url=`/shixuns.json`;
        axios.get(Url,{
            params
        }).then((response)=> {
            // TODO 有keyword返回值时 显示一共有多少条记录
            if(response.status===200){
                this.setState({
                    search_tags:response.data.search_tags,
                    middleshixundata: response.data,
                    typepvisible:false,
                    pages:1
                });
            }
        }).catch((error)=>{
            console.log(error)
        });
    }
    render() {
        let {middleshixundata, typepvisible, pages, search_tags, keyword,parsedid,newtag_level,newpalce} = this.state;

        // console.log(this.state.updata)
        return (
            <div className="newMain clearfix  backFAFAFA">
							{this.state.updata===undefined?"":<UpgradeModals
								{...this.state}
							/>}
                {/*<Spin spinning={typepvisible}  size="large" style={{marginTop:'15%'}}>*/}
                    <ShixunSearchBar
                        Updatasearchlist={this.Updatasearchlist.bind(this)}
                        allUpdatashixunlist={this.allUpdatashixunlist}
                        StatusEnquiry={this.StatusEnquiry.bind(this)}
                        OnSearchInput={this.OnSearchInput.bind(this)}
                        keyword={keyword}
                        parsedid={parsedid}
                        newtag_level={newtag_level}
                        newpalce={newpalce}
                        {...this.props}
                        {...this.state}
                    />

                    <ShixunCardList
                        ShixunsState={this.ShixunsState.bind(this)}
                        ShixunsSwitch={this.ShixunsSwitch.bind(this)}
                        Shixunsupcircles={this.Shixunsupcircles.bind(this)}
                        allUpdatashixunlist={this.allUpdatashixunlist}
                        {...this.props}
                        {...this.state}
                        OnSearchInput={this.OnSearchInput.bind(this)}
                    />
                     {/*下方图片*/}
                    <ShixunCard
                        typepvisible={typepvisible}
                        middleshixundata={middleshixundata.shixuns}
                        totalcount={middleshixundata.total_count}
                        pagination={middleshixundata.pagination}
                        pages={pages}
                        shixunsPage={this.shixunsPage.bind(this)}
                    />
                {/*</Spin>*/}
            </div>
        );
    }
}

export default SnackbarHOC() (TPMIndexHOC  ( ShixunsIndex ));
