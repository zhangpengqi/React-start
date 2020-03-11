import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import {AuthContext} from "../../app";
import "./style.css"

class Sg extends Component {

    state={
        username:"",
        password:""
    }

    handleusername=(e)=>{
        console.log(e)
        this.setState({username:e.target.value})
    }

    handlepassword=(e)=>{
        this.setState({password:e.target.value})
    }



    handleClick=()=>{
        var token = localStorage.getItem('token')
        console.log(token)


        axios({
            method:'Post',
            url:`http://playground.it266.com/login?token=${token}`,
            headers: {'Content-Type': ' application/x-www-form-urlencoded'},
            data:qs.stringify({
                'username':this.state.username,
                'password':this.state.password,
            })
        }).then((response)=>{
            if(response.data.status){
                console.log(response.data)
                window.localStorage.setItem('token',response.data.data.token)
                this.props.history.push("/")
            } else {
                alert('账户密码不对')
            }

        }).catch((error)=>{
            alert('登陆出错啦')
        })

    };

// register=()=>{
      
//          // console.log(response)
//           //this.props.history.replace("./home")
         
//     }
    render() {
        return (
            <AuthContext.Consumer>
                {(auth) => {
                    console.log(auth)

                    return (
                        <div className="land">

                            <div>
                                <input  value={this.state.username}
                                        onChange={this.handleusername}
                                        placeholder="请输入账号"/>
                            </div>
                            <div>
                                <input  value={this.state.password}
                                        onChange={this.handlepassword}
                                        placeholder="请输入密码"/>
                            </div>

                            <button onClick={this.handleClick}>提交</button>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}
                

export default Sg;