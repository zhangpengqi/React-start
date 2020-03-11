import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "../style.css";




function Patile (props) {
    let[id,setId]=useState('');
    let[name,setName]=useState('');
    let[title,setTitle]=useState('');
    let[content,setContent]=useState('');
    let[member,setMember]=useState('');
    let[token,setToken]=useState(null);
  
        useEffect(()=>{
            let idd = props.match.params.id;
        console.log(idd)
        
        let token = localStorage.getItem("token");

        setToken(token);
        setId(id)
        },[])

    let radio=(id)=>{
        setMember(id)
    }
    let hike=()=>{
        axios.get('/\/api\/article\/patile.*/',{
            params: {
                page:1
            }
        }).then((res)=>{
            console.log(res.data)
            {window.localStorage.setItem("member",member)}
            props.history.replace("/article")
        })
    }
  
    let button=()=>{
        if(token==null){
            return(<div className="pay-for"><button className="pay-button">登录订阅</button></div>)
        }else{
            return(<div className="pay-for"><button className="pay-button" onClick={hike}>立即订阅</button></div>)
        }
    }
    // render() {
        return (
            <div className="article-content">
                <div className="article-content-back">
                    <div className="article-content-back-left"><b>&lt;</b></div>
                </div>
                <div className="pay-content">
                   <div className="box1"><input type="radio" name="frult" value="" id="pay-radio1" onClick={()=>{radio(1)}}/><p id="text1">包月</p><p id="pay-able1">￥856</p></div> 
                    <br/><span id="pay-introduce"><div id="pay-introduce-t">如客户开通本服务，则视为授权bilibili在客户的大会员即将到期时，从客户的自有充值账户、与会员账号绑定的第三方支付账户、银行卡（以下统称“账户”）中代扣下一个计费周期包月费。
该服务实现的前提是客户已将大会员账号与上述账户绑定，且可成功从上述账户中扣款，因上述账户中可扣款余额不足导致的续费失败，由客户自行承担。 
2、本服务由客户自主选择是否取消，若客户选择不取消，则视为客户同意bilibili按照本规则进行代扣款项的续费尝试，一旦扣款成功，bilibili将为客户开通下一个计费周期的大会员。若在自动续费时/前，大会员服务价格发生调整，应以现时有效的价格为准。 
3、本服务自客户开通之日起长期有效，直至客户自主选择取消本服务/大会员到期时终止。 
4、客户可通过下述方式取消本服务：
①微信购买：请在哔哩哔哩安卓客户端V5.25及以上版本、或iOS客户端V5.28及以上版本，登录您自动续费的账号，进入“我的大会员”-点击头图-进入大会员信息页-点击“管理连续包月”。在这个页面点击“取消连续包月”即可。具体操作方式根据客户端版本更新可能不同。 </div></span>
                    <br/><input type="radio" name="frult" value="" id="pay-radio2" onClick={()=>{radio(2)}}/><p id="text2">包年</p><span id="pay-able1">￥1956</span>
                </div>
                <div className="box-bottom">
               {button()}
               </div>
            </div>
        );
    // }
}

export default Patile;