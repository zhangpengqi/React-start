import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./style.css"
import {AuthContext} from "../../app"
class Home extends Component {
    render() {
        return (
            <AuthContext.Consumer>
                {(value)=>{
                    return(
                        value.user?
                        <div className="home">
                            <div className="home-title">首页</div>
                            <div>欢迎用户：{value.user.nickname}!
                                <span onClick={()=>{
                                    value.setUser(null)}}
                                >退出</span>
                            </div>
                            <ul className="list">
                                <li><Link to="/article" className="link">文章管理</Link></li>
                                <li><Link to="/" className="link">会员管理</Link></li>
                                <li><Link to="/userInfo" className="link">个人信息</Link></li>
                            </ul>
                        </div>
                        : (alert('请先登录'),this.props.history.push('/'))
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}

export default Home;