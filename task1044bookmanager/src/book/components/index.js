import React, {Component} from 'react';
import axios from "axios"
import "./style.css"
import {Link} from "react-router-dom";

class Components extends Component {
    state={
        name:"",//图书名称
        page:1,//当前页
        limit:5,//每页信息条数
        total:0,//图书总数量
        books:[],//图书列表
        pages:1,//总页数
    }
    //加载页面时从后台获取图书数据
    componentDidMount() {
        this.getDate();
    }

    getDate=()=>{
        axios({
            method:"get",
            url:"http://127.0.0.1:8080/books/",
            params:{
                "name":this.state.name,
                'page':this.state.page,
                'limit':this.state.limit,
            }
        }).then((result)=>{
            console.log(result);
            this.setState({

                books:result.data.data.books,
                page:result.data.data.pagination.page,
                limit:result.data.data.pagination.limit,
                total:result.data.data.pagination.total,
            },()=>{
                //获取图书数量，设置页数
                this.setState({
                    pages:Math.ceil(this.state.total/this.state.limit)})})
        }).catch((error)=>{
            console.log(error)
        });
    }
    //删除数据
    deleteBook=(id)=>{
        axios({
            method: "delete",
            url:"http://127.0.0.1:8080/books/"+id,
        }).then((result)=>{
            //删除成功，更新页面
            this.getDate()
        }).catch((error)=>{
            console.log(error);
        })
    }
    //分页函数
    showPage=()=>{
        let numbers=[];

        for(let i=1;i<=this.state.pages;i++){
            numbers.push(<span
                key={i}
                className={i===this.state.page?"active":""}
                onClick={()=>{
                    this.setState({page:i},this.getDate)}}
            >{i}</span>)
        }
        return(
            <div className="bottom">
                    <span className="itemCont">
                        共{this.state.total}条
                    </span>
                {/*上一页*/}
                <span className="prevPage" onClick={()=>{
                    this.setState({page:this.state.page-1>0?(this.state.page-1):1},this.getDate)
                }}/>
                {numbers}
                {/*下一页*/}
                <span className="nextPage" onClick={()=>{
                    this.setState({page:(this.state.page+1)<=this.state.pages?(this.state.page+1):1},this.getDate)
                }}/>

                <select onChange={(e)=>{
                    this.setState({limit:e.target.value,page:1},this.getDate)}}
                >
                    <option value="5">5条/页</option>
                    <option value="10">10条/页</option>
                    <option value="15">15条/页</option>
                </select>
                跳至
                <input
                    value={this.state.page}
                    onChange={(e)=>{
                        this.setState({page:e.target.value})
                    }}
                    onKeyDown={(e)=>{
                        if(e.keyCode===13){
                            this.setState({page:e.target.value},this.getDate)}}}
                    type="text"
                /> 页
            </div>
        )
    }

    render() {
        return (
            <div className="article-center">
                <div className="title">图书管理</div>

                {/*搜索栏*/}
                <div className="search">
                    <input
                        type="text"
                        placeholder="请输入书名"
                        className="search-article"
                        value={this.state.name}
                        onChange={(e)=>{
                            this.setState({name:e.target.value,page:1})
                        }}
                    />

                    <button className="search-button" onClick={this.getDate}>搜索</button>
                    <button className="clear" onClick={()=>{
                        this.setState({name:"",
                        },this.getDate)
                    }}>清空</button>
                    <Link to="/create" className="add">新增图书</Link>
                </div>

                {/*图书列表栏*/}
                <table border="1" cellPadding="18px" cellSpacing="0">
                    <thead className="table-title">
                    <tr>
                        <th width="100px">id</th>
                        <th width="500px">书名</th>
                        <th width="200px">发布时间</th>
                        <th width="200px">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.books.map((item)=>{
                        return(

                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <th>{item.name}</th>
                                <th>{item.createdAt}</th>
                                <th>
                                    <Link
                                        to={"/edit/"+item.id}
                                        className="edit"
                                    >编辑</Link>|

                                    <span
                                        className="delete"
                                        onClick={() => {
                                            this.deleteBook(item.id)}}
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

export default Components;