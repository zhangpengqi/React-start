import React, {Component} from 'react';
import axios from "axios"
import qs from "qs"
import "./style.css"
class Edit extends Component {
    state={
        id:"",
        title:"",
        content:""
    }
    //根据id拿到需要修改的数据
    componentDidMount() {
        //拿到id
        let id=this.props.match.params.id;
        console.log(id);
        let token=localStorage.getItem("token");
        axios({
            method:"get",
            url:"http://playground.it266.com/article/detail?token="+token+"&id="+id,
        }).then((result)=>{
            console.log(result);
            this.setState({
                id:result.data.article.id,
                title:result.data.article.title,
                content:result.data.article.content
            })
        }).catch((error)=>{
            console.log(error);
        });
    }
    //拿到修改后的数据提交后台修改
    handleClick=()=>{
        console.log(this.state);
        let token=localStorage.getItem('token')
        axios({
            method:"POST",
            url:'http://playground.it266.com/article/update?token='+token,
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'id':this.state.id,
                'title':this.state.title,
                'content':this.state.content,
            })
        }).then((result)=>{
            console.log(result.data);
            console.log("修改返回数据");
        this.props.history.push("/article");
        }).catch((error)=>{
            console.log(error);
        });
    }
    render() {
        return (
            <div className="edit-content">
                <div className="title">编辑内容</div>
                <div className="text">id:<input type="text" value={this.state.id}/></div>
                <div className="text">
                    title:
                    <input
                        type="text"
                        onChange={(e)=>{
                            this.setState({title:e.target.value})}}
                        value={this.state.title}
                    /></div>
                <div className="text">
                    content:
                    <input
                        type="text"
                        onChange={(e)=>{
                            this.setState({content:e.target.value})}}
                        value={this.state.content}
                    /></div>
                <div><button onClick={this.handleClick} >确认修改</button></div>
            </div>
        );
    }
}

export default Edit;