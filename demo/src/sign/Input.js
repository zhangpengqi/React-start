import React,{Component} from 'react';
import {render} from "react-dom";
import axios from 'axios';
import qs from 'qs'
import {AuthContext} from "../app"

class Input extends React.Component{

    state={
        usertel:'',    //手机号码
        url:"",

        captcha_code:"",
        captcha_key:"",
        verify:"",
        nickname:'',
        avator:"",
        token:"",
        mobile:""
    }

    checkTel=()=>{
        let phoneNum = this.state.usertel
        // let value = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        if(phoneNum.match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)!==null){
            axios.get('http://jizhang-api-dev.it266.com/api/captcha')
                .then((response)=>{
                    console.log(response)
                    this.setState({url:response.data.data.url
                    });
                    this.setState({captcha_key:response.data.data.key})
                    // c  onsole.log()

                })

        }else{
            alert("手机号码错误,请重新输入")
        }
    }



    handletel=(e)=>{
        console.log(e)
        this.setState({usertel:e.target.value})
    }

    handlerkey=(e)=>{
        this.setState({captcha_code:e.target.value})
    }

    handPassword= ()=>{
        axios({
            method:'post',
            url:'http://jizhang-api-dev.it266.com/api/sms/verify',
            data:qs.stringify({
                mobile:this.state.usertel,
                captcha_code:this.state.captcha_code,
                captcha_key:this.state.captcha_key
            })
        }).then((response)=>{
            console.log(response)
            alert(response.data.data)
            this.setState({url:null})
        })
            .catch((error)=>{
                alert(error)
            })
    }









    handver=(e)=>{
        console.log(e)
        this.setState({verify:e.target.value})
    }
    handlepassword=(e)=>{
        this.setState({password:e.target.value})
    }






    render(){
        // let phoneNum = this.state.usertel

        return(
            <AuthContext.Consumer>
                {(auth)=>{
                    console.log(auth)

                    return(
                        <div className="land">
                            <div className="land-top">
                                <div className=" land-top-right">注册</div>
                            </div>

                            <div className="top-text">为啦获得更好的体验，建议您立即完善手机号码</div>

                            <div className="center-text">
                                <div className="center-text-left">手机号归属地</div>
                                <div className="center-text-right">中国</div>
                            </div>

                            <div className="phoneNumber">
                                <div className="phone-left">+86</div>
                                <div className="phone-right">
                                    <input type="text"
                                           placeholder="输入手机号码"
                                        // onBlur={this.checkTel}
                                           onChange={this.handletel}/>
                                </div>
                            </div>

                            <div className="validation">
                                <input type="text"
                                       placeholder="输入验证码"
                                       onChange={
                                           this.handver
                                       }
                                />
                                <div className="validation-right"  onClick={this.checkTel}> 获取验证码</div>
                            </div>

                            {
                                this.state.url?  <div  className="text-box">
                                    <div className="box">
                                        <div className="box1">安全验证</div>
                                        <div className="box2">
                                            <img src={this.state.url}/>
                                            <div className="box2-1">换一换</div>
                                        </div>
                                        <div className="box3"><input  type="text"
                                                                      placeholder="输入验证码"
                                                                      value={this.state.captcha_code}
                                                                      onChange={
                                                                          this.handlerkey
                                                                      }
                                        /></div>
                                        <button className="box4" onClick={this.handPassword}>确认</button>
                                    </div>
                                </div>:null
                            }
                            <div className="text-password">
                                <input type="text" name="password"
                                       value={this.state.password}
                                       onChange={this.handlepassword}
                                       placeholder="请输入密码"
                                />
                            </div>

                            <div className="top-bottom">
                                您也可以接听
                                <span>语音验证码</span>
                            </div>
                            <button onClick={()=>{

                                axios({
                                    method:'post',
                                    url:'http://jizhang-api-dev.it266.com//api/user/register',
                                    data:qs.stringify({
                                        mobile:this.state.usertel,
                                        verify:this.state.verify,
                                        'password':this.state.password,
                                    })
                                }).then((response)=>{
                                    console.log(response.data.data )
                                    this.setState({token:response.data.data.token})

                                    if(response.data.status){
                                        window.localStorage.setItem('token',response.data.data.token)
                                        //  console.log(this.setState.token)
                                        this.props.history.push("/User")
                                        axios({
                                            method:'get',
                                            url:`http://jizhang-api-dev.it266.com/api/user/profile?token=${this.state.token}`,
                                        }).then((response)=>{
                                            console.log(response.data.data )
                                            //  window.localStorage.setItem('avatar', response.data.data.avatar_url);
                                            // window.localStorage.setItem('nickname', response.data.data.nickname);
                                            // window.localStorage.setItem('mobile', response.data.data.mobile);

                                            auth.setUser({nickname:response.data.data.nickname,
                                                avatar_url:response.data.data.avatar_url,
                                                mobile:response.data.data.mobile})
                                            this.props.history.push("/")

                                        })
                                            .catch((error)=>{
                                                alert(error)
                                            })
                                    }
                                })
                                    .catch((error)=>{
                                        alert(error)
                                    })

                            }} >完成</button>

                        </div>
                    )
                }}


            </AuthContext.Consumer>

        )
    }
}
export default Input