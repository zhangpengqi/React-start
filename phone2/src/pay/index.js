import React, {useState} from 'react';
import "./style.css"
import axios from "axios"
import "../mocks"
import {AuthContext} from "../app"

function Pay(props) {

    let [cost,setCost]=useState('￥498');


    let handleBuy=(val)=>{
        if(!val.user.token){
            props.history.push('/login');
            return
        }
        axios({
            method:'post',
            url:'/api/buy',
        }).then((response)=>{
            console.log(response);
            if(response.status===200){
                val.setVip(response.data.vip);
                // localStorage.setItem('vip',response.data.vip);
                props.history.push('/article')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <AuthContext.Consumer>
            {(value)=>{
                return(
                    <div className="Pay">
                        <div className="Title"><span className='Return'/>用户名</div>
                        <div className="Cost">
                            <div className='Year'>
                                <input name="Cost" type="radio"
                                       onClick={setCost('￥498')}
                                />包年
                                <span>￥498</span>
                            </div>
                            <div className='Mouth'>
                                <input
                                    name="Cost"
                                    type="radio"
                                       onClick={setCost('￥58')}
                                />包月 <span>￥58</span>
                            </div>
                        </div>
                        <div className="Bottom">
                            <div className="Title"><span className="S1">实付：</span><span className="S2">{cost}</span><span className="S3">暂无可用优惠券</span></div>
                            <div className="Submit">
                                <button onClick={()=>{handleBuy(value)}}
                                >{value.user.token?'立即订阅':'登录订阅'}</button>
                            </div>
                        </div>
                    </div>
                )
            }}
        </AuthContext.Consumer>
    )
}

export default Pay;