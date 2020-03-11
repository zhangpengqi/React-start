import React from "react";
import "./style.css"
import axios from "axios"
import qs from "qs"
import Reg1 from "../../images/return.png"

class Index extends React.Component{

    state={
        username:"",
        password:""
    }
    handleChange=(e)=>{
        if(e.target.className==="userName"){
            this.setState({username:e.target.value});
            console.log(this.state.username);
            console.log("hello");
        }
        if(e.target.className==="passWord"){
            this.setState({password:e.target.value});
        }
    }

    submit=(e)=>{
        console.log(e.target);
        console.log(this.state.username);
        console.log(this.state.password);


        axios({
            method:'Post',
            url:'http://playground.it266.com/register',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'username':this.state.username,
                'password':this.state.password,
            })
        }).then((item)=>{
            console.log(item.data)
        }).catch((error)=>{
            alert('用户名不能为空')
        })
}

    render() {
        return(
            <div>
                <div className="title">
                    <img src={Reg1} alt=""/>注册
                </div>
                <div className="message">为了获得更好的体验，请注册</div>
                <input onChange={this.handleChange} className="userName" type="text" name="username" placeholder="请输入账号" />
                <input onChange={this.handleChange} className="passWord" type="password" name="password" placeholder="请输入密码"/>
                <button onClick={this.submit} className="submit" >提交</button>
            </div>
        );
    }
}
export default Index;