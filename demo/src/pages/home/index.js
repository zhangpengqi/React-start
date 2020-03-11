import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../app"
class Home extends Component {



    state = {nickname: ""}

    componentDidMount() {
        let val = window.localStorage.getItem("nickname")
        if (val) {
            this.setState({nickname: val})
        }
    }
    run=()=>{
        var nickname =window.localStorage.getItem("nickname")
        if (nickname) {
            return(<li><Link to="self">个人信息</Link></li>)
        }
    }
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
                                {this.run()}
                            </ul>
                        </div>
                    )

                }}


            </AuthContext.Consumer>
        );
    }
}

export default Home;
