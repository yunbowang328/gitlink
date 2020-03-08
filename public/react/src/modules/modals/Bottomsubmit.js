import React, {Component} from 'react';
import {
  Button,
} from 'antd';

class Bottomsubmit extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  cannelfun = () => {
    // window.location.href=
		if(this.props.Cohetepaperbool===true){
			this.props.setCohetepaperbool(false);
		}else {
			this.props.history.replace(this.props.url);
		}

  }


  render() {

    return (
      <div>
        <style>
          {
            `
             .newFooter{
               display:none;
             }
            `
          }
        </style>
        <div className="clearfix bor-bottom-greyE edu-back-white orderingbox newshixunbottombtn">
          <div className=" edu-txt-center padding13-30">
            <button type="button" className="ant-btn mr20 newshixunmode backgroundFFF" onClick={() => this.cannelfun()}>
              <span>取 消</span></button>
            <Button type="button" className="ant-btn newshixunmode mr40 ant-btn-primary" type="primary"
                    htmlType="submit" onClick={() => this.props.onSubmits()}
                    loading={this.props.loadings}><span>{this.props.bottomvalue===undefined?"保存":this.props.bottomvalue}</span></Button>
          </div>
        </div>
      </div>

    );
  }
}


export default Bottomsubmit;






