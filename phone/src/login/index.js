import React from "react";
import "./style.css"
import axios from "axios"
import qs from "qs"
import {Link} from "react-router-dom";
import {AuthContext} from "../app";
class Login extends React.Component{

    state={
        password:"",//密码
        image:"",//验证码图片地址链接
        captcha_code:"",//安全码
        verify:"",//验证码
        captcha_key:"",
        value:"获取验证码",//获取验证码的按钮显示'获取验证码'，或者倒计时。
        disabled:"",//获取验证码按钮是否能点击。为disabled时，60s点击按钮不能点击
        token: "",
        background:"Hide",//图片验证码弹出框，为Show时显示，为Hide是隐藏
    }

    //获取安全码图片
    getCode=()=>{
        let number=60;
        if(!(/^1\d{10}$/.test(this.state.mobile))){
            document.getElementById("MobileError").className="Mobile-error-active"
            return
        }
        document.getElementById("MobileError").className="Mobile-error-none"
        axios({
            method:'get',
            url:'http://jizhang-api-dev.it266.com/api/captcha',
        }).then((result)=>{
                document.getElementById("box").className="box"
                this.setState({
                    image:result.data.data.url,
                    captcha_key:result.data.data.key,
                    disabled:"disabled",
                    background:"Show"
                },()=>console.log(this.state.image))

        }).catch((error)=>{
            console.log(error)
        })
        //60s倒计时和不能点击
        let time=setInterval(()=>{
            this.setState({value:number+'s'},()=>{number--})
            if(number===0){
                clearInterval(time)
                this.setState({
                    value:"获取验证码",
                    disabled:""
                })
            }
        },1000)
    }
    //获取验证码
    getVerify=()=>{
        this.setState({background:'Hide'})
        document.getElementById("box").className="box-none"
        axios({
            method:"post",
            url:"http://jizhang-api-dev.it266.com/api/sms/verify",
            data:qs.stringify({
                'mobile':this.state.mobile,
                'captcha_code':this.state.captcha_code,
                'captcha_key':this.state.captcha_key
            })
        }).then(((result)=>{
            alert(result.data.data)
        })).catch((error)=>{
            console.log(error)
        })
    }

    //登录获取token
    login=(val)=>{
        axios({
            method:"post",
            url:"http://jizhang-api-dev.it266.com/api/user/token/mobile",
            data:qs.stringify({
                'mobile':this.state.mobile,
                'password':this.state.password,
                'captcha_code':this.state.captcha_code,
                'captcha_key':this.state.captcha_key,
            })
        }).then((result)=> {
            console.log(result)
            if (result.data.status) {
                this.setState({token: result.data.data.token},()=>console.log(this.state.token))
                localStorage.setItem('token',result.data.data.token)
                this.getUserInfo(val)

            }
            if (result.data.data==='帐号或密码不匹配'){
                alert(result.data.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    //获取个人信息
    getUserInfo=(val)=>{
        axios({
            method:"get",
            url:"http://jizhang-api-dev.it266.com/api/user/profile",
            params:{
                'token':this.state.token,
            }
        }).then((result)=>{
            if(result.status===200){
                let user={
                    'mobile':result.data.data.mobile,
                    'nickname':result.data.data.nickname,
                    'avatar_url':result.data.data.avatar_url,
                    'token':this.state.token,
                }
                console.log("avatar_url");
                console.log(result.data.data.avatar_url);
                console.log(result);
                val.setUser(user)
                localStorage.setItem('user',qs.stringify(user));
                this.props.history.push("/home");
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
                    return(
                        <div className="Login">
                            <div className="LoginTop"><b>登录</b></div>
                            <div className="Title"><Link to="/sign" className="Link">没有账号点击注册</Link></div>
                            <div className="Location">
                                <span className="left">手机号归属地</span>
                                <span className="right">中国</span>
                            </div>
                            <div className="Mobile">
                                +86<input
                                type="text"
                                placeholder="输入手机号"
                                onChange={(e)=>{this.setState({mobile:e.target.value})}}
                            />
                                <span className="Mobile-error-none" id="MobileError">
                            请输入正确的手机号
                        </span>
                            </div>
                            <div className="Code">
                                <input
                                    type="text"
                                    placeholder="输入验证码"
                                    className="input"
                                    onChange={(e)=>{
                                        this.setState({verify:e.target.value})
                                    }}
                                />
                                <input
                                    type="text"
                                    onClick={()=>this.getCode()}
                                    className="button"
                                    readOnly
                                    disabled={this.state.disabled}
                                    value={this.state.value}
                                />
                            </div>
                            <div className="Mobile">
                                <input
                                    type="password"
                                    placeholder="输入密码"
                                    onChange={(e)=>{this.setState({password:e.target.value})}}
                                />
                            </div>


                            <div className="Submit">
                                <div className="CodeInfo">
                            <span className="Code-error-none" id="CodeError">
                            请输入正确的验证码
                            </span>
                                    <div className="CodeChange">
                                <span>
                                    您也可以接听
                                </span>
                                        <span className="CodeChangeButton">
                                    语音验证码
                                </span>
                                    </div>
                                </div>
                                <button onClick={()=>{
                                    this.login(value)
                                }}>登录</button>
                            </div>

                            <div className={this.state.background}>
                                <div className="box" id="box">
                                    <div className="title">安全验证</div>
                                    <div className="Code">
                                        <img src={this.state.image} alt=""/>
                                        <span>换一换</span>
                                    </div>
                                    <div className="Input">
                                        <input
                                            type="text"
                                            placeholder="请输入验证码"
                                            onChange={(e)=>{
                                                this.setState({captcha_code:e.target.value})
                                            }}
                                        />
                                    </div>
                                    <button onClick={this.getVerify}>确认</button>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}
export default Login;