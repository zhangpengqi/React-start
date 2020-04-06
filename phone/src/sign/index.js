import React from "react";
import "./style.css"
import axios from "axios"
import qs from "qs"

class Login extends React.Component{

    state={
        mobile:"",//手机号
        password:"",//密码
        image:"",//验证码图片地址链接
        captcha_code:"",//安全码
        verify:"",//验证码
        captcha_key:"",
        value:"获取验证码",
        disabled:"",
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
            if(result){
                document.getElementById("box").className="box"
                this.setState({
                    image:result.data.data.url,
                    captcha_key:result.data.data.key,
                    disabled:"disabled"
                },()=>{
                    console.log("图片地址");
                    console.log(this.state.image);
                    console.log(this.state.captcha_key)
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
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
                console.log(result);
                console.log(result.data)
                alert(result.data.data)
                // this.setState({verify:result.data})
            })).catch((error)=>{
                console.log(error)
            })
    }

    //注册
    sign=()=>{
        axios({
            method:"post",
            url:"http://jizhang-api-dev.it266.com/api/user/register",
            data:qs.stringify({
                'mobile':this.state.mobile,
                'verify':this.state.verify,
                'password':this.state.password
            })
        }).then((result)=>{
            if(result.data.data==='验证码不正确'){
                console.log(result)
                console.log(111)
                console.log(document.getElementById("CodeError"))
                document.getElementById('CodeError').className="Code-error"
                return
            }
            console.log(result)
            if(result.data.data==='密码最少需要6个字符长度'){
                alert(result.data.data)
                return;
            }
            if(result.data.data.token){
                console.log(this.props)
                this.props.history.push("/");
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return(
            <div className="Sign">
                <div className="SignTop"><span className="Return" onClick={()=>this.props.history.push('/')}/><b>完善手机号</b></div>
                <div className="Title">为了获得更好体验，建议您立即完善手机号</div>
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
                        className="button"
                        type="submit"
                        disabled={this.state.disabled}
                        onClick={this.getCode}
                        value={this.state.value}
                    />
                </div>
                <div className="Mobile">
                    <input
                    type="password"
                    placeholder="输入密码"
                    name="password"
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
                    <button onClick={this.sign}>注册</button>
                </div>


                <div className="box-none" id="box">
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
        );
    }
}
export default Login;