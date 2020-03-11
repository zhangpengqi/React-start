import React, {Component} from 'react';
import "./style.css"
import {AuthContext} from "../../app";

class UserInfo extends Component {

    render() {
        return (
                <AuthContext.Consumer>
                    {(value)=>{
                        return(
                            <div className="User-info">
                                <div className="Title">
                                    <span
                                        className="Return"
                                        onClick={()=>{
                                            this.props.history.push('./home')
                                        }}
                                    ></span>个人信息
                                </div>
                                <div className="Avatar">
                                    <span>头像</span>
                                    <img src={value.user.avatar_url} alt=""/>
                                </div>
                                <div className="Nickname">
                                    <span className="Left">昵称</span>
                                    <span className="Right">{value.user.nickname}</span>
                                </div>
                                <div className="Sex">性别</div>
                                <div className="Area">地区</div>
                                <div className="Intro">个人简介</div>
                                <div className="Bottom"></div>
                            </div>
                        )
                    }}
                </AuthContext.Consumer>

        );
    }
}

export default UserInfo;