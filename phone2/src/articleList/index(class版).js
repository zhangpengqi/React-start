import React from "react";
import "./style.css"
import axios from "axios"
import "../mocks"
import {AuthContext} from "../app";

class ArticleList extends React.Component{

    state={
        articles:[],
    }

    componentDidMount() {
            axios.get("/api/article")
                .then((response)=>{
                    this.setState({articles:response.data.articles});
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
                        <div>
                            {
                                this.state.articles.map((item)=>{
                                    return(
                                        <div key={item.id}  className="article">
                                            <div className="article-left">
                                                <div  className="article-left-top" onClick={()=>this.props.history.push('/article')}>{item.title}</div>
                                                <div className="article-left-bottom">{item.from}</div>
                                            </div>
                                            <div className="article-right">
                                                <img src="http://img.caixin.com/2020-02-05/1580861007869383_300_200.jpg" alt=""/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div onClick={()=>{
                                localStorage.setItem('token','');
                                localStorage.setItem('vip','')
                                value.setVip('');
                            }}>退出登录</div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}

export default ArticleList;