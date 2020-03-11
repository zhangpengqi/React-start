import React,{Component} from "react";
import {AuthContext} from "../app";
import "./info.css";
class Info extends Component{   
    render(){
        return(
            <AuthContext.Consumer>
                {(val)=>{
                    console.log(val)
        
                    return(
                        <div id="background">
                            <div className="con-top">
                                <span>&lt;</span>
                                <span className="top-text">个人信息</span>    
                            </div>
                            <div className='content'>
                                <div className="con-activ">
                                    <div className="text tactiv">头像</div>
                                    <div className="jiantou">
                                        <img src={val.array.avatar_url} alt='加载失败'/>
                                    </div>
                                </div>
                                <div className="con-m">
                                    <div className="text">昵称</div>
                                    <div className="jiantou">{val.array.nickname}</div>
                                    <div className="jiantou">&gt;</div>
                                </div>
                                <div className="con-m">
                                    <div className="text">性别</div>
                                    <div className="jiantou">不详</div>
                                    <div className="jiantou">&gt;</div>
                                </div>
                                <div className="con-m">
                                    <div className="text">电话</div>
                                    <div className="jiantou">{val.array.mobile}</div>
                                    <div className="jiantou">&gt;</div>
                                </div>
                                <div className="con-m">
                                    <div className="text">地区</div>
                                    <div className="jiantou">111</div>
                                    <div className="jiantou">&gt;</div>
                                </div>
                                <div className="con-m">
                                    <div className="text">个人简介</div>
                                    <div className="jiantou">111</div>
                                    <div className="jiantou">&gt;</div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}
export default Info