import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from "antd";
import axios from 'axios';
import { getImageUrl } from 'educoder';

import './Cooperatives.css';

class Cooperatives extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      data: [
        { name: "产学联盟" },
        { name: "知名企业" },
        { name: "各类院校" }
      ]
    }
  }

  componentDidMount(){
    window.document.title = "合作伙伴";
    this.getCooperatives();
  }

  getCooperatives(){
    axios.get("/helps/cooperatives.json").then((result) => {
      if(result){
        this.setState({
          data: result.data.data,
          loading: false
        })
      }
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    })
  }

  render() {
    let { loading, data } = this.state;

    return (
      <div>
        <div className="cooperatives-container">
          <Card title="合作伙伴" bordered={false} loading={loading} style={{ minHeight: 600 }}>
            <div className="cooperatives-content">
              {
                data && data.length > 0 && data.map((item, _key) => {
                  return (
                    <div className="cooperative-item">
                      <div className="cooperative-item-title">{ item.name }</div>
                      <div className="cooperative-item-list">
                        <List
                          grid={{ gutter: 16, column: 4 }}
                          dataSource={item.values}
                          renderItem={obj => (
                            <List.Item>
                              <div className="cooperative-item-list-item">
                                <a href={obj.url || 'javascript:void(0)'} target={obj.url && '_blank'}>
                                  <img className="" height="90" src={getImageUrl(obj.img.substr(1))} />
                                </a>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Cooperatives;