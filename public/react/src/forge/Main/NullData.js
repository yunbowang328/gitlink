import React, { Component } from 'react';
import "../Branch/branch.css"




class NullData extends Component {
   // 点击按钮复制功能
  jsCopy=()=>{
    var e = document.getElementById("copy_rep_content_1");
    e.select();
    document.execCommand("Copy");
    this.props.showNotification('复制成功');
  }
    render() {
        const { http_url } = this.props;
        return (
            <div className="null_data_box">
                <h4 className="title">快速帮助</h4>
                <div className="bottom">
                    <div className="item">
                        <h3 className="item_title">克隆当前仓库<small>不知道如何克隆？查看<a href="https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository" target="_blank">帮助</a></small></h3>
                        <div className="gitAddressClone">
                            <span >HTTP</span>
                            <input type="text" value={http_url} readOnly id="copy_rep_content_1" />
                            <span onClick={()=>this.jsCopy()}><i className="iconfont icon-fuzhi"></i></span>
                        </div>

                    </div>
                    <div className="item">
                        <h3 className="item_title">从命令行创建一个新的仓库</h3>
                        <div className="Markdown">
                        <pre>
                            <code>
                                touch README.md<br/>
                                git init<br/>
                                git add README.md<br/>
                                git commit -m "first commit"<br/>
                                git remote add origin&nbsp;
                                <span className="clone-url">{http_url}</span> <br/>                             
                                git push -u origin master
                            </code>
                        </pre>
                        </div>
                    </div>
                    <div className="item">
                    <h3 className="item_title">从命令行推送已创建的仓库</h3>
                        <div className="Markdown">
                        <pre>
                            <code>
                                git remote add origin&nbsp;<span className="clone-url">{http_url}</span><br/>                              
                                git push -u origin master
                            </code>
                        </pre>
                        </div>

                    </div>
                </div>
            </div>
        );
    };
}

export default NullData;