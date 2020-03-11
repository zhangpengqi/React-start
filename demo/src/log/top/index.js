import React,{Component} from "react";
import {Link} from "react-router-dom";
import "./top.css"
class Top extends Component{
    render(){
        return(
            <div>
                <div className="top">
                    <span>&lt;</span>
                    <span className="top-text">登陆</span>
                    <Link to="/page">去注册</Link>    
                </div>
                {/* <div className="top-bottom">为获得更好体验，建议您立即完善手机号</div> */}
            </div>
        )
    }
}
export default Top