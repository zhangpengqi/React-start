import React, {useEffect,useState} from 'react';
import "./style.css"
import axios from 'axios'
import '../../mocks'
import {AuthContext} from "../../app";

function Article(props) {
    let [title,setTitle]=useState([]);
    let [created,setCreated]=useState([]);
    let [from,setFrom]=useState([]);
    let [content,setContent]=useState([]);
    let [comment,setComment]=useState(null);
    let [commentList,setCommentList]=useState([]);

    useEffect(()=>{
        setComment('Comment-close');
        axios({
            method:"get",
            url:'/api/article',
            params:{
                'id':1,
            }
        }).then((result)=>{
            console.log(result)
                setTitle(result.data.article.title)
                setCreated(result.data.article.created)
                setFrom(result.data.article.from)
                setContent(result.data.article.content)
        }).catch((error)=>{
            console.log(error)
        })

        return ()=>{
            console.log('离开文章详情页')
        }
    },[])

    let handleComment=()=>{
        setComment('Comment-open');
    axios({
        method:'get',
        url:'/api/comment',
    }).then((response)=>{
        setCommentList(response.data.data)
        console.log(response)
    }).catch((error)=>{
        console.log(error)
    })
    }
    return(
        <AuthContext.Consumer>
            {(value)=>{
                console.log(value)
                return(
                    <div className="Article">
                        <div className="Top"><span className="Return" onClick={()=>{
                            props.history.push('/')
                        }}/></div>
                        <div className="Article-title"><b>{title}</b><span className="Key"/></div>
                        <div className="Article-created">{from}{created}</div>
                        <div className="Article-content">{content}
                            <div className={value.user.vip?"None":"Subscription"}>
                                <div className="Surplus">本文共计字1188字<span/></div>
                                <div className="Vip">
                                    <div className="Title">会员专享，订阅后阅读全文</div>
                                    <div className="Go" onClick={()=>{props.history.push('/pay')}}
                                    >去订阅</div>
                                    <div className="Login" onClick={()=>{props.history.push('/login')}}>登录</div>
                                </div>
                                <div className="Logo">
                                    <span className="g1">微信</span>
                                    <span className="g2">朋友圈</span>
                                    <span className="g3">微博</span>
                                </div>

                            </div>
                        </div>

                        <div className="Bottom">
                            <input className="Comment" type="text" placeholder="写评论..."/>
                            <span className="Comment-list" onClick={()=>{handleComment()
                            }}/>
                            <span className="Support"/>
                            <span className="WeChat"/>
                            <span className="More"/>
                        </div>
                        <div className={comment}>
                            <div className="Title"><span className='Return' onClick={()=>{
                                setComment('Comment-close')
                            }}/>评论</div>
                            {commentList.map((item)=>{
                                return(
                                    <div key={item.id} className="Comment">
                                         <div className="top"><img src={item.url} alt="" className="Avatar"/><span className="Nickname">{item.name}</span></div>
                                        <div className="Kong"/>
                                         <div className="Comment-content">{item.comment_content}</div>
                                         <div className="Zan">
                                             <span className="Up">{item.up}</span>
                                             <span className="Down">{item.down}</span>
                                             <span className="Return">{item.return}</span>
                                         </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }}
        </AuthContext.Consumer>
    )
}
export default Article;