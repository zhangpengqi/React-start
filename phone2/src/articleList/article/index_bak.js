import React, {Component} from 'react';
import "./style.css"
import axios from 'axios'
import '../../mocks'
import {AuthContext} from "../../app";

class Article extends Component {
    state={
        title:"",//文章标题
        created:"",//文章创作时间
        from:"",//出版机构
        content:"",//文章内容
        comment:"Comment-close",//open，则展开品论列表。close则关闭评论列表

        //评论axios返回参数
        commentList:[],//评论数组
    }
    componentDidMount() {
        axios({
            method:"get",
            url:'/api/article',
            params:{
                id:1,
            }
        }).then((result)=>{
            console.log(result)
            this.setState({
                title:result.data.article.title,
                created:result.data.article.created,
                from:result.data.article.from,
                content:result.data.article.content,
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    handleComment=()=>{
        this.setState({comment:"Comment-open"});
        axios({
            method:'get',
            url:'/api/comment',
        }).then((response)=>{
            this.setState({
                commentList:response.data.data,
            })
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
                        <div className="Article">
                            <div className="Top"><span className="Return" onClick={()=>{
                                this.props.history.push('/')
                            }}/></div>
                            <div className="Article-title"><b>{this.state.title}</b><span className="Key"/></div>
                            <div className="Article-created">{this.state.from}{this.state.created}</div>
                            <div className="Article-content">{this.state.content}

                                <div className={value.user.vip?"None":"Subscription"}>
                                    {/*<div className="None">*/}
                                    <div className="Surplus">本文共计字1188字<span/></div>
                                    <div className="Vip">
                                        <div className="Title">会员专享，订阅后阅读全文</div>
                                        <div className="Go" onClick={()=>{this.props.history.push('/pay')}}>去订阅</div>
                                        <div className="Login" onClick={()=>{this.props.history.push('/login')}}>登录</div>
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
                                <span className="Comment-list" onClick={this.handleComment}/>
                                <span className="Support"/>
                                <span className="WeChat"/>
                                <span className="More"/>
                            </div>
                            <div className={this.state.comment}>
                                <div className="Title"><span className='Return' onClick={()=>{
                                    this.setState({comment:"Comment-close"});
                                }}/>评论</div>
                                {this.state.commentList.map((item)=>{
                                    return(
                                        <div key={item.id} className="Comment">
                                             <div className="top"><img src={item.url} alt="" className="Avatar"/><span className="Nickname">{item.name}</span></div>
                                            <div className="Kong"></div>
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
}

export default Article;