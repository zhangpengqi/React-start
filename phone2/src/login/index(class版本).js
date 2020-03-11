import React from "react";
import "./style.css"
import axios from "axios"
import qs from "qs"
import {AuthContext} from '../app'
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

    submit=(val)=>{
        console.log(this.state);

        axios({
            method:'Post',
            url:'/api/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'username':this.state.username,
                'password':this.state.password,
            })
        }).then((response)=>{
            console.log(response)
            if(response.data.status===200){
                val.setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
                this.props.history.push("/pay");
            }else{
                alert(response.data.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    console.log(value)
                    console.log('value')
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
                                onClick={()=>{this.submit(value)}}
                                className="submit"
                            >提交</button>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}
export default Login;