import React, {Component} from 'react';
import axios from "axios"
// import qs from "qs"
import "./style.css"
class Index extends Component {
    state={
        id:"",
        name:"",
        describe:""
    }
    //根据id拿到需要修改的数据
    componentDidMount() {
        //拿到id
        let id=this.props.match.params.id;
        axios({
            method:"get",
            url:"http://127.0.0.1:8080/books/"+id,
        }).then((result)=>{
            console.log(result);
            this.setState({
                id:result.data.data.id,
                name:result.data.data.name,
                describe:result.data.data.describe
            })
        }).catch((error)=>{
            console.log(error);
        });
    }
    //拿到修改后的数据提交后台修改
    handleClick=()=>{
        console.log(this.state);
        axios({
            method:"POST",
            url:"http://127.0.0.1:8080/books/"+this.state.id,
            headers:{'Content-Type':'application/json'},
            data:{
                'name':this.state.name,
                'describe':this.state.describe,
            }
        }).then((result)=>{
            console.log(result.data);
            console.log("修改返回数据");
        this.props.history.push("/");
        }).catch((error)=>{
            console.log(error);
        });
    }
    render() {
        return (
            <div className="edit-content">
                <div className="title">修改图书信息</div>
                <div className="id">图书编号:{this.state.id}</div>
                <div className="name">
                    书名:
                    <input
                        type="text"
                        onChange={(e)=>{
                            this.setState({name:e.target.value})}}
                        value={this.state.name}
                    /></div>
                <div className="describe">
                    图书描述:
                    <textarea
                        type="text"
                        onChange={(e)=>{
                            this.setState({describe:e.target.value})}}
                        value={this.state.describe}
                    /></div>
                <div className="submit"><button onClick={this.handleClick} >确认修改</button></div>
            </div>
        );
    }
}
export default Index;