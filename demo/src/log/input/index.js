import React,{Component} from "react";
import axios from "axios";
import qs from "qs";
import {AuthContext} from "../../app";
import "./input.css";
class Input extends Component{
    state={
        phonenum:'',
        pwd:'',
        yzmcode:'',
        yzmnum:'',
        errPhone:'phidd',
        errYzm:'yhidd',
        back:'back',
        getyzm:'获取验证码',
        time:59,
        fleg:null,
        disabled:'',
        img:[],
        token:'',
    }
    

    change=(e)=>{
        this.setState({phonenum:e.target.value})
    }
    pBlur=()=>{
        if(!(this.state.phonenum.match(/^1[3-9]\d{9}$/))&&this.state.phonenum.length<11){
            this.setState({errPhone:'pshow'})
        }else{
            this.setState({errPhone:'phidd',fleg:1})
        }
    }
    yBlur=()=>{
        if(this.state.yzmcode.length===0){
            this.setState({errYzm:'yshow'})
        }    
    }
    pFocus=()=>{
        this.setState({errPhone:'phidd'})
    }
    yFocus=()=>{
        this.setState({errYzm:'yhidd'})
    }
    
    getYzm=()=>{
        if(this.state.fleg===1){
            axios.get(' http://jizhang-api-dev.it266.com/api/captcha')
            .then((response)=>{
                console.log(this.state.img)
                this.setState({img:response.data.data,back:'background'})
            })
            .catch((error)=>{
                alert(error)
            })
            // this.setState({back:'background'})
        }else{
            this.setState({errPhone:'pshow',fleg:0})
            alert('嗨,电话不对哦')
        }
        // this.setState({fleg:0})
    }

    verify=()=>{
        this.setState({back:'back'})
        axios({
            method:'post',
            url:'http://jizhang-api-dev.it266.com/api/sms/verify',
            data:qs.stringify({mobile:this.state.phonenum,
                captcha_code:this.state.yzmcode,
                captcha_key:this.state.img.key})
        })
        .then((response)=>{
            console.log(response.data)
            if(response.data.status){
                this.setState({disabled:'disabled'},this.run)
            }
        })
        .catch((error)=>{
            alert(error)
        })
    }
    run=()=>{
        this.timer=setInterval(() => {
            this.setState({time:this.state.time-1,getyzm:this.state.time+'s'})
            if(this.state.time===-1){
                clearInterval(this.timer)
                this.setState({time:59,getyzm:'重新发送',disabled:''})
            }
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    zlogin=(auth)=>{
        axios({
            method:'post',
            url:'http://jizhang-api-dev.it266.com/api/user/token/mobile',
            data:qs.stringify({mobile:this.state.phonenum,
                                password:this.state.pwd,
                                captcha_key:this.state.img.key})
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({token:response.data.data.token},()=>{this.info(auth)})
            
        })
        .catch((error)=>{
            alert(error)
        })
    }
    info=(auth)=>{
        axios({
            method:'get',
            url:`http://jizhang-api-dev.it266.com/api/user/profile?token=${this.state.token}`,       
        })
        .then((response)=>{
            console.log(response.data)
            auth.setInfo({array:response.data.data,token:this.state.token})
            this.props.history.push("/info")
        })
        .catch((error)=>{
            // alert(error)
            console.log(error)
        })
    }
    render(){
        return(
            <AuthContext.Consumer>
                {(auth)=>{
                    // console.log(auth)
                    return(
                        <div>
                            <div className="input-top">
                                <div className="input-text">
                                    手机号归属地
                                </div>
                                <div className="contry">中国<span>&gt;</span></div>
                            </div>
                            <div className="input-top">
                                <span>+86</span>
                                <input type="text" 
                                        className="phone" 
                                        placeholder="请输入手机号"
                                        maxLength="11"
                                        onChange={this.change}
                                        onBlur={this.pBlur}
                                        onFocus={this.pFocus}
                                />
                            </div>
                            <div className="error">
                                <p id="num" className={this.state.errPhone}>请输入正确的手机号</p>
                            </div>
                            <div className="input-yyy">
                                <input type="password" 
                                        className="pwd" 
                                        placeholder="请输入密码"
                                        onChange={(e)=>{
                                            this.setState({pwd:e.target.value})
                                        }}
                                />
                            </div>
                            <div className="input-yyy">
                                <input type="text" 
                                        className="yzm" 
                                        placeholder="请输入验证码"
                                        onChange={(e)=>{
                                            this.setState({yzmnum:e.target.value})
                                        }}
                                        onBlur={this.yBlur}
                                        onFocus={this.yFocus}
                                />
                                <div className="input-yzm">
                                    <button className="getyzm"
                                            onClick={this.getYzm}
                                            disabled={this.state.disabled}
                                    >{this.state.getyzm}</button>
                                </div>
                            </div>
                            <div className="error">
                                <p id="num" className={this.state.errYzm}>请输入正确的验证码</p>
                                <p>您也可以接听<a href="##">语音验证码</a></p>
                            </div>
                            <div className="input-login">
                                <button 
                                    className="login"
                                    onClick={()=>{this.zlogin(auth)}}>登陆</button>
                            </div>
                            <div className={this.state.back}>
                                <div className="back-box">
                                    <div className="box-top">安全验证</div>
                                    <div className="box-img">
                                        <img src={this.state.img.url} alt="加载失败"/>
                                        <span>换一换</span>
                                    </div>
                                    <div className="box-input">
                                        <input type="text" 
                                            placeholder='请输入验证码'
                                            onChange={(e)=>{
                                                this.setState({yzmcode:e.target.value})
                                            }}/>
                                    </div>
                                    <div className="box-butt">
                                        <button onClick={this.verify}>提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}
export default Input