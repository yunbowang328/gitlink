import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Select, Radio, Col, Row,Divider,Input,Form} from 'antd';
import Nav from './Nav';
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import reactCSS from 'reactcss'
import axios from 'axios';
import moment from 'moment'


const TextArea = Input.TextArea;
const { Group, Button } = Radio;
class NewMilepost extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      value: moment('2017-01-25'),
      selectedValue: undefined,
    }
  }

  componentDidMount=()=>{
   
  }

  onPanelChange=(time, mode)=>{
    this.setState({
       value:time
       });
  }

  onSelect=(time)=>{
    this.setState({
      value:time,
      selectedValue: time,
    });
  }

  submit=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { projectsId } = this.props.match.params;
        const url = `/projects/${projectsId}/versions`;
        let time=undefined;
        if(this.state.selectedValue===undefined){
         
        }else{
          time=this.state.selectedValue.format("YYYY-MM-DD")
        }
      
        axios.post(url,{
          ...values,
          project_id:projectsId,
          effective_date:time,
          status:'open'
        }).then(result=>{
          if(result){
          this.props.history.push(`/projects/${projectsId}/orders/Milepost`);
          }
          
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }
  cleartime=()=>{
    this.setState({
      selectedValue:undefined
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { projectsId } = this.props.match.params;
  return(
        <div className="main">
          <Form>
           <div className="topWrapper">
            <Nav {...this.props} {...this.state} />
            {/* <a onClick={this.newshow} className="topWrapper_btn" >新建里程碑</a> */}
        
          </div>
            <div style={{marginLeft:15, marginTop: 24}}>
              <h1 >新的里程碑</h1>
              <h5 className="mt-5 color-grey-9">里程碑组织工单，合并请求和跟踪进度.</h5>
            </div>
          <Divider/>
           <div  style={{display:'flex'}}>
             <div className="newmilepostleft">
               标题
               <div>
               <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入标题'
                    }],
                  })(
                    <Input placeholder="标题"/>
                  )}
                </Form.Item>
              </div>
               描述
               <Form.Item>
                  {getFieldDecorator('description', {
                    rules: [{
                      required: true, message: '请输入描述内容'
                    }],
                  })(
                    <TextArea placeholder="添加一个可选的扩展描述。。。"  style={{height:"300px"}}/>

                  )}
                </Form.Item>
               </div>
              <div className="newmilepostrighe" >
              <a style={{color:'black'}}>截止日期(可选)</a> <a style={{color:'red'}} onClick={this.cleartime}>清除</a>
              <div>
              <Input style={{width:"120px"}} value={this.state.selectedValue && this.state.selectedValue.format('YYYY-MM-DD')}/> 
            </div>
            <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 ,marginTop:25}}>
          <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];
              const current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let index = start; index < end; index++) {
                monthOptions.push(
                  <Select.Option className="month-item" key={`${index}`}>
                    {months[index]}
                  </Select.Option>,
                );
              }
              const month = value.month();

              const year = value.year();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }
              return (
                <div style={{ padding: 10 }}>
                  <Row type="flex" justify="space-between">
                    <Col>
                      <Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                        <Button value="month">日期</Button>
                        <Button value="year">月份</Button>
                      </Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        style={{width:80}}
                        onChange={newYear => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                        value={String(year)}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={String(month)}
                        onChange={selectedMonth => {
                          const newValue = value.clone();
                          newValue.month(parseInt(selectedMonth, 10));
                          onChange(newValue);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
            onPanelChange={this.onPanelChange}
            onSelect={this.onSelect}
          />
        </div>
        </div>
          </div>
        <Divider/>
        <div className="clearfix mt15" onClick={this.submit}>
        <a  className="topWrapper_btn fr"  >创建里程碑</a>
        </div>
        </Form>
  </div>
    )
  }
}
const WrappedNewMile = Form.create({ name: 'NewMilepostFrom' })(NewMilepost);

export default WrappedNewMile;