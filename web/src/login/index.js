import React from "react";
import "./style.css"
import axios from "axios"
import qs from "qs"

class Login extends React.Component{

    state={
        username:"",
        password:""
    }
    handleChange=(e)=>{
        console.log(e.target.className);
        if(e.target.className==="userName"){
            this.setState({username:e.target.value});
            console.log(this.state.username);
        }
        if(e.target.className==="passWord"){
            this.setState({password:e.target.value});
        }
    }

    submit=(e)=>{
        console.log(this.state);

        axios({
            method:'Post',
            url:'http://playground.it266.com/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'username':this.state.username,
                'password':this.state.password,
            })
        }).then((item)=>{
                if(item.data.data.token!==undefined){
                    localStorage.setItem('token',item.data.data.token)
                    this.props.history.push("/home");
                }
        }).catch((error)=>{
            alert('用户名不能为空')
        })
    }

    render() {
        return(
            <div className="login">
                <div className="message">请登录</div>
                    <input
                        onChange={this.handleChange}
                        className="userName"
                        type="text"
                        name="username"
                        placeholder="请输入账号"
                    />
                    <input
                        onChange={this.handleChange}
                        className="passWord"
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                    />
                <button
                    onClick={this.submit}
                    className="submit"
                >提交</button>
            </div>
        );
    }
}
export default Login;