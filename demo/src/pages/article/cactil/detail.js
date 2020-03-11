import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "../style.css";

import {Link} from  "react-router-dom";
import  img1 from "../img/1.png";
import  img2 from "../img/2.png";
import  img3 from "../img/3.png";
import  img4 from "../img/4.png";

function Index(props) {
    let[id,setId]=useState('');
    let[name,setName]=useState('');
    let[title,setTitle]=useState('');
    let[content,setContent]=useState('');
    let[member,setMember]=useState('null')
        useEffect(()=>{
            let idd = props.match.params.id;
        console.log(idd)
        let member = localStorage.getItem("member");
        console.log(member)

        setMember(member)
        console.log(member)
  
        setId(idd)
        axios.get('/\/api\/article\/detail.*/',{
            params: {
                page:1
            }
        }).then((res)=>{
            console.log(res.data.data[idd])

            setName(res.data.data[idd].name);
            setTitle(res.data.data[idd].title);
            setContent(res.data.data[idd].content)
        })
        },[])
        
        console.log(member)
        if(member!==null){
            return (
                <div className="article-content">
                    <div className="top">
                        <div><b>&lt;</b></div>
                    </div>
                    <div >{title}<img src=""/></div>
                    <div>
                        <div><p>文章详细的介绍{name}的成就，经历，个人简介</p></div>
                    </div>
                    <div><b></b>  <span>{content}</span></div>
                    <div>
                    <ul>
                        <li>
                        <Link to={`/article/comment/${id}`}><input type="text" placeholder="写评论..."/></Link>
                        </li>
                        <li><img src={img1} width="20px" height="30px"/></li>
                        <li><img src={img2} width="20px" height="30px"/></li>
                        <li><img src={img3} width="20px" height="30px"/></li>
                        <li><img src={img4} width="20px" height="30px"/></li>        
                    </ul>          
                    </div>
                </div>
            );
        }else{
            return(
                <div className="article-content">
                    <div className="article-content-back">
                        <div className="article-content-back-left"><b>&lt;</b></div>
                    </div>
                    <div className="article-content-title">{title}<img src=""/></div>
                    <div>
                        <div className="article-content-till"><p>文章详细的介绍{name}的成就，经历，个人简介</p></div>
                    </div>
                    <div className="article-content-c">
                        <div className="article-content-one">会员专享 登录后阅读全文</div>
                        <div className="article-content-two">去订阅</div>
                        <div className="article-content-three"><Link to="/">登录</Link></div>
                    </div>

                    <div className="article-content-buttom">
                    <ul>
                        <li>
                        <Link to={`/article/comment/${id}`}><input type="text" placeholder="写评论..."/></Link>
                        </li>
                        <li><img src={img1} width="20px" height="30px"/></li>
                        <li><img src={img2} width="20px" height="30px"/></li>
                        <li><img src={img3} width="20px" height="30px"/></li>
                        <li><img src={img4} width="20px" height="30px"/></li>        
                    </ul>          
                    </div>
            
            </div>
            )
        }
       
    // }
}

export default Index;