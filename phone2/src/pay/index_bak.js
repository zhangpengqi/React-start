import React, {Component} from 'react';
import "./style.css"
import axios from "axios"
import "../mocks"
// import qs from "qs"
import {AuthContext} from "../app"
class Pay extends Component {
    state={
        cost:"￥498",
        token:"",
    }
    handleBuy=(val)=>{
        if(!val.user.token){
            this.props.history.push('/login')
            return
        }
        axios({
            method:'post',
            url:'/api/buy',
        }).then((response)=>{
            console.log(response)
            if(response.status===200){
                val.setVip(response.data.vip)
                localStorage.setItem('vip',response.data.vip)
                this.props.history.push('/article')
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
                        <div className="Pay">
                            <div className="Title"><span className='Return'/>用户名</div>
                            <div className="Cost">
                                <div className='Year'>
                                    <input name="Cost" type="radio"
                                           onClick={()=>this.setState({cost:"￥498"})}
                                    />包年
                                    <span>￥498</span>
                                </div>
                                <div className='Mouth'>
                                    <input
                                        name="Cost"
                                        type="radio"
                                        onClick={()=>this.setState({cost:"￥58"})}
                                    />包月 <span>￥58</span>
                                </div>
                            </div>
                            <div className="Bottom">
                                <div className="Title"><span className="S1">实付：</span><span className="S2">{this.state.cost}</span><span className="S3">暂无可用优惠券</span></div>
                                <div className="Submit">
                                    <button onClick={()=>{this.handleBuy(value)}}
                                    >{value.user.token?'立即订阅':'登录订阅'}</button>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}

export default Pay;