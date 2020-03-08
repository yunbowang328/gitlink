import React,{ Component } from "react";
import { Select, AutoComplete } from "antd";
import { WordsBtn, getUrl, getUploadActionUrl} from 'educoder';
import axios from 'axios';

const Option = Select.Option;

let timeout, currentValue

class SchoolSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            school_names: ''
        }
    }


    componentDidMount() {

    }
    fetchSchool = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function doFetch() {
            const url = `/schools/school_list.json`
            axios.get(url, {
                params: {
                search: value 
                }
            })
            .then((response) => {
                if (response.data.school_names) {
                    if (currentValue === value) {
                        callback(response.data.school_names);
                    }
                } 
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        timeout = setTimeout(doFetch, 900);
    }
    onOrgNameSearch = (value) => {
        this.fetchSchool(value, (school_names) => {
            this.setState({school_names})
        })
    }
    render () {
        const { school_names } = this.state;
        const { value, onChange } = this.props;
        return (
            <AutoComplete allowClear placeholder="请输入单位名称" value={value} 
                style={{ width: '221px'}} 
                onSearch={this.onOrgNameSearch}
                onSelect={onChange} 
                onChange={onChange}
                dataSource={school_names}
            >
                { school_names && school_names.map((item, index) => {
                    return <Option value={item} key={index}>{item}</Option>
                })}
            </AutoComplete>
        )
    }
}
export default SchoolSelect;