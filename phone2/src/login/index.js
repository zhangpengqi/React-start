import React, {useState} from "react";
import "./style.css"
import axios from "axios"
import qs from "qs"
import {AuthContext} from '../app'
function Login(props){

    let [username,setUsername]=useState(null)
    let [password,setPassword]=useState(null)

    let handleChange=(e)=>{
        if(e.target.className==="userName"){
            setUsername(e.target.value);
        }
        if(e.target.className==="passWord"){
            setPassword(e.target.value);
        }
    }

    let submit=(val)=>{
        axios({
            method:'Post',
            url:'/api/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'username':username,
                'password':password,
            })
        }).then((response)=>{
            console.log(response)
            if(response.data.status===200){
                val.setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
                props.history.push("/pay");
            }else{
                alert(response.data.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <AuthContext.Consumer>
            {(value)=>{
                console.log(value)
                return(
                    <div className="login">
                        <div className="message">请登录</div>
                        <input
                            onChange={handleChange}
                            className="userName"
                            type="text"
                            name="username"
                            placeholder="请输入账号"
                        />
                        <input
                            onChange={handleChange}
                            className="passWord"
                            type="password"
                            name="password"
                            placeholder="请输入密码"
                        />
                        <button
                            onClick={()=>{submit(value)}}
                            className="submit"
                        >提交</button>
                    </div>
                )
            }}
        </AuthContext.Consumer>
    );
}
export default Login;