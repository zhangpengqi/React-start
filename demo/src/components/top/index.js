import React, {Component} from 'react';

import {Link} from "react-router-dom";
import "./style.css"

import {AuthContext} from "../../app"

class Top extends Component {

    // state = {nickname: ""}
    //
    // componentDidMount() {
    //     let val = window.localStorage.getItem("nickname")
    //
    //     if (val) {
    //         this.setState({nickname: val})
    //     }
    // }

    render() {
        return (

            <AuthContext.Consumer>

                {(value) => {

                    return (
                        <div className="Nav">

                            {value.user ?
                                <div> 当前用户: {value.user.nickname} <span onClick={() => {
                                    value.setUser(null)
                                }}>退出</span></div>
                                :
                                <div><Link to="/login">请登录</Link></div>
                            }

                            <ul>
                                <li><Link to="/">首页</Link></li>
                                <li><Link to="/sign">注册</Link></li>
                                <li><Link to="/article">文章管理</Link></li>
                                <li><Link to="/member">会员管理</Link></li>
                            </ul>
                        </div>
                    )

                }}


            </AuthContext.Consumer>
        );
    }
}

export default Top;