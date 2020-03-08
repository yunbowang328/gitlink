import React , {Component} from 'react';
import { Dropdown , Icon , Menu , Pagination, Modal,Input,Popconfirm,Form } from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import axios from 'axios';
class Tags extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      limit:15,
      page:1,
      order_name:undefined,
      order_type:undefined,
      //新建标签区域是否显示 none 隐藏 block 显示
      display:'none',
      //调色盘颜色
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      textcolor:'#F17013',
      isShow:false,
      newcolor:'',
      name:'',
      description:'',
      id:'',
      modelname:''
    }
  }

  componentDidMount=()=>{
    this.getList();
  }


  getList=(page,order_name,order_type)=>{
    const { projectsId } = this.props.match.params;
    const { limit } = this.state;
    const url = `/projects/${projectsId}/issue_tags.json`;
    axios.get(url,{
      params:{
        page,limit,order_name,order_type
      }
    }).then((result)=>{
      if(result){
        this.setState({
          data:result.data
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  createtagpost=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { projectsId } = this.props.match.params;
        const url = `/projects/${projectsId}/issue_tags`;
        axios.post(url,{
          ...values,
          project_id:projectsId,
          color:this.state.textcolor
        }).then(result=>{
          if(result){
            this.props.form.setFieldsValue({
              name: "",
              description: ""
            });
            this.setState({
              color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
              },
              textcolor:'#F17013',
              display:'none'
            });
            this.getList()
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }

  ChangePage=(page)=>{
    this.setState({
      page
    })

    this.getList(page);
  }

  // 排序
  arrayList=(e)=>{
    this.setState({
      order_name:e.key,
      order_type:e.item.props.value
    })

    this.getList(1,e.key,e.item.props.value);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ 
      color: color.rgb,
      textcolor:color.hex,
      newcolor:color.hex,
    })
  };



  //控制新建标签页是否显示
  newshow=()=>{
    this.setState({
      display:'block'
    });
   
  };
  newclose=()=>{
    this.setState({
      display:'none'
    }); 
  };

  handleok=()=>{
    this.updatetag();
  }
  updatetag=()=>{
    const { projectsId } = this.props.match.params;
    let id=this.state.id;
    const url = `/projects/${projectsId}/issue_tags/${id}.json`;
    let name=this.state.name;
    let description=this.state.description;
    let modalcolor=this.state.newcolor
    axios.put(url,{
      project_id:projectsId,
      id:id,
      name:name,
      description:description,
      color:modalcolor
    }).then((result)=>{
      if(result){
        this.setState({
          isShow:false
        }); 
        this.getList()
      }
    }).catch((error)=>{
      console.log(error);
    })
   }

   deletetag=(id)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/issue_tags/${id}.json`;
    axios.delete(url,{ data: {
      project_id: projectsId,
      id: id
    }
  }).then((result)=>{
      if(result){
        this.getList()
      }
    }).catch((error)=>{
      console.log(error);
    }) 
   }

  handleCancel=()=>{
    this.setState({
      isShow:false
    });
  }
  
  changmodelname=(e)=>{
    this.setState({
      name:e.target.value
    })
  }
  changdescription=(e)=>{
    this.setState({
      description:e.target.value
    })
  }

  editshow=(arr)=>{
    this.setState({
      isShow:true,
      newcolor:arr.color,
      name:arr.name,
      description:arr.description,
      id:arr.id
    });   
  };

  render(){
    const { data , limit , page } = this.state;
    const { projectsId } = this.props.match.params;
    const { getFieldDecorator } = this.props.form;
    
    const menu = (
      <Menu onClick={this.arrayList}>
        <Menu.Item key={'created_at'} value="desc">按创建时间降序排序</Menu.Item>
        <Menu.Item key={'created_at'} value="asc">按创建时间升序排序</Menu.Item>
        <Menu.Item key={'issues_count'} value="desc">按issue个数降序排序</Menu.Item>
        <Menu.Item key={'issues_count'} value="asc">按issue个数升序排序</Menu.Item>
      </Menu>
    )
    const styles = reactCSS({
      'default': {
        color: {
          width: '20px',
          height: '20px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          width:'100px',
          marginTop:'5px',
          height:'28px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'flex',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        modalcolor:{
          width: '20px',
          height: '20px',
          borderRadius: '2px',
          background: this.state.newcolor,
        }
      },
    });


    const Paginations = (
      <React.Fragment>
        {
          data && data.issue_tags_count > limit ?
          <div className="mt30 mb50 edu-txt-center">
            <Pagination simple defaultCurrent={page} total={data && data.issue_tags_count} pageSize={limit} onChange={this.ChangePage}></Pagination>
          </div>:""
        }
      </React.Fragment>
    )

    const renderList =()=>{
      if(data && data.issue_tags && data.issue_tags.length>0 ){
        return(
          <div className="tagList">
            {
              data.issue_tags.map((item,key)=>{
                return(
                  <div>
                    <span className="width20 mr10">
                      <span style={{backgroundColor:`${item.color}`}} className="tagColor"></span>
                      {item.name}
                    </span>
                    <span className="hide-1 width50 mr10">{item.description}</span>
                    <span className="width15 mr10">{item.issues_count}个开启的工单</span>
                    {
                      data && data.user_admin_or_member ?
                        <div className="width15 text-right">
                          <a onClick={()=>this.editshow(item)} className="topWrapper_btn fr" >编辑</a>
                          <Popconfirm placement="bottom" title={'删除标签会将其从所有引用中删除。继续？'}  okText="是" cancelText="否" onConfirm={()=>this.deletetag(item.id)}>
                            <a className="a_btn delete_btn fr" >删除</a>
                          </Popconfirm>

                        </div>
                        : ''
                    }
                  </div>
                )
              })
            }
          </div>
        )
      }else{
        return(
          <NoneData />
        )
      }
    }

    return(
      <div className="main">
        <div>
          <div className="topWrapper">
            <Nav {...this.props} {...this.state} />
            {
              data && data.user_admin_or_member ?
                <a onClick={this.newshow} className="topWrapper_btn" >创建标签</a>
                : ''
            }

            {/* <Link to={`/projects/${projectsId}/orders/new`} className="topWrapper_btn" >新建标签</Link> */}
          </div>
          <div style={{display: this.state.display}}>
            <Form>
            <div className="tagdiv" >
            <Form.Item
              className="inptwidth"
            >
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请填写标签名字'
                    }],
                  })(
                <Input  placeholder="标签名字" maxLength="10"/>

                  )}
                </Form.Item>

                <Form.Item
                className="inputcount"
                >
                  {getFieldDecorator('description', {
                    rules: [{
                      required: true, message: '描述不能为空'
                    }],
                  })(
                    <Input  placeholder="描述, 30字以内" maxLength="30"/>
                  )}
                </Form.Item>

           
            <div>
            <div style={ styles.swatch } onClick={ this.handleClick }>
              <div style={ styles.color }>
                <p style={{paddingLeft:25}}>{this.state.textcolor}</p>
              </div>
            </div>
              { this.state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
              </div> : 
              null }
              </div>
              <div className="fr" style={{marginTop:5}}> 
              <a onClick={this.createtagpost} className="topWrapper_btn fr" >创建标签</a> 
              <a onClick={this.newclose} className="a_btn cancel_btn fr" >取消</a>
              </div>
            </div>
            </Form>
         

          </div>
          <div className="topWrapper">
            <span>共{ data && data.issue_tags_count }个标签</span>
            <ul className="topWrapper_select">
              <li>
                <Dropdown className="topWrapperSelect" overlay={menu} trigger={['click']} placement="bottomCenter">
                  <span>标签<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
            </ul>
          </div>
          { renderList() }
          { Paginations }
        </div>
        <Modal
          title="编辑标签"
          onCancel={this.handleCancel}
          visible={this.state.isShow}
          onOk={this.handleok}
          mask={true}
          width="60%"
        >
          <div className="dialogdiv">
            <Input  placeholder="标签名字" maxLength="10" className="inptwidth" value={this.state.name} onChange={this.changmodelname}/>
            <Input  placeholder="描述, 30字以内" maxLength="30" className="inputcount" value={this.state.description} onChange={this.changdescription}/>
            <div>
            <div style={ styles.swatch } onClick={ this.handleClick }>
              <div style={ styles.modalcolor }>
                <p style={{paddingLeft:25,width:100}}>{this.state.newcolor}</p>
              </div>
            </div>
              { this.state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
              </div> : 
              null }
              </div>
          </div>
        </Modal>


      </div>
    )
  }
}
const WrappedTags = Form.create({ name: 'tageFrom' })(Tags);
export default WrappedTags;