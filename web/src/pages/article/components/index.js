import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios"
import qs from "qs"
import "./style.css"
// import ShowPage from "./showPage";
class Index extends Component {
    state={
        //后台返回数据
        itemCount:0,//总文章数
        currentPage:1,//当前页数
        pageSize:5,//一页的新闻条数
        pageCount:0,//总页数
        prevPage:0,//上一页页数
        nextPage:0,//下一页数
        articles:[],//文章列表

        // axios请求参数
        title:"",//搜索标题
        created_begin:"",//搜索起始时间
        created_end:"",//搜索结束时间
    }
    //加载页面时从后台获取数据
    componentDidMount() {
    this.getDate();
    }
    //从后台获取文章列表数据
    getDate=()=>{
        let token=localStorage.getItem("token");
        console.log("token");
        console.log(token);
        axios({
            method:"get",
            url:"http://playground.it266.com/article",
            params:{
                'token':token,
                'page':this.state.currentPage,
                'page_size':this.state.pageSize,
                'title':this.state.title,
                'created_begin':this.state.created_begin,
                'created_end':this.state.created_end,
            }
        }).then((result)=>{
            console.log(result);
            if(result.data.status){
                this.setState({
                    itemCount:result.data.data.page.itemCount,//总文章数
                    currentPage:result.data.data.page.currentPage,//当前页数
                    pageSize:result.data.data.page.pageSize,//一页的新闻条数
                    pageCount:result.data.data.page.pageCount,//总页数
                    prevPage:result.data.data.page.prevPage,//上一页页数
                    nextPage:result.data.data.page.nextPage,//下一页页数
                    articles:result.data.data.articles,//文章列表
                })
            }
        });
    }

    //分页函数
    showPage=()=>{
        let numbers=[];
        for(let i=1;i<=this.state.pageCount;i++){
            numbers.push(<span
                key={i}
                className={i===this.state.currentPage?"active":""}
                onClick={()=>{
                    this.setState({currentPage:i},this.getDate)}}
            >{i}</span>)
        }
        return(
                <div className="bottom">
                    <span className="itemCont">
                        共{this.state.itemCount}条
                    </span>
                    {/*上一页*/}
                    <span className="prevPage" onClick={()=>{
                        this.setState({currentPage:this.state.prevPage},this.getDate)
                    }}/>
                    {numbers}
                    {/*下一页*/}
                    <span className="nextPage" onClick={()=>{
                        this.setState({currentPage:this.state.nextPage},this.getDate)
                    }}/>

                    <select onChange={(e)=>{
                        this.setState({pageSize:e.target.value,currentPage:1},this.getDate)}}
                    >
                        <option value="5">5条/页</option>
                        <option value="10">10条/页</option>
                        <option value="15">15条/页</option>
                    </select>
                    跳至
                    <input
                           value={this.state.currentPage}
                           onChange={(e)=>{
                               this.setState({currentPage:e.target.value})
                           }}
                           onKeyDown={(e)=>{
                               if(e.keyCode===13){
                                this.setState({currentPage:e.target.value},this.getDate)}}}
                           type="text"
                    /> 页
                </div>
        )
    }

    //删除数据
    deleteArticle=(id)=>{
        console.log(id);
        let token=localStorage.getItem('token');
        axios({
            method: "post",
            url:"http://playground.it266.com/article/delete?token="+token,
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data:qs.stringify({'id':id})
        }).then((result)=>{
            //删除成功，更新页面
            this.getDate()
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        return (

            <div className="article-center">
               <div className="title">文章管理</div>

                {/*搜索栏*/}
                <div className="search">
                    <input
                        type="text"
                        placeholder="文章标题"
                        className="search-article"
                        value={this.state.title}
                        onChange={(e)=>{
                            this.setState({title:e.target.value})
                        }}
                    />
                    <input
                        type="text"
                        placeholder="开始时间"
                        className="created_begin"
                        value={this.state.created_begin}
                        onChange={(e)=>{
                            this.setState({created_begin:e.target.value})
                        }}
                    />
                    <span>~</span>
                    <input
                        type="text"
                        placeholder="结束时间"
                        className="created_end"
                        value={this.state.created_end}
                        onChange={(e)=>{
                            this.setState({created_end:e.target.value})
                        }}
                    />
                    <button className="search-button" onClick={this.getDate}>搜索</button>
                    <button className="clear" onClick={()=>{
                        this.setState({title:"",
                            created_begin:"",
                            created_end:"",
                        },this.getDate)
                    }}>清空</button>
                    <Link to="article/create" className="add">新增文章</Link>
                </div>

                {/*文章列表栏*/}
                <table border="1" cellPadding="18px" cellSpacing="0">
                    <thead className="table-title">
                    <tr>
                        <th width="100px">id</th>
                        <th width="500px">标题</th>
                        <th width="200px">发布时间</th>
                        <th width="200px">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.articles.map((item)=>{
                        return(

                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <th>{item.title}</th>
                            <th>{item.created_at.slice(0,10)}</th>
                            <th>
                                <Link
                                    to={"article/edit/"+item.id}
                                    className="edit"
                                >编辑</Link>|

                                <span
                                    className="delete"
                                    onClick={() => {
                                    this.deleteArticle(item.id)}}
                                >删除</span>
                            </th>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*分页*/}
                {this.showPage()}
            </div>
        );
    }
}
export default Index;