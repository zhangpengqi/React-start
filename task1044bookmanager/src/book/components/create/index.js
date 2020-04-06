import React from 'react';
import axios from "axios"
import qs from "qs"
import "./style.css"
class Index extends React.Component {

    state={
        name:"",
        describe:""
    }
    handleClick=()=>{

      axios({
            method:"POST",
            url:"http://127.0.0.1:8080/books/",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'name':this.state.name,
                'describe':this.state.describe
            })
        }).then((result)=>{
            this.props.history.push("/");
            console.log(result);
      }).catch((error)=>{
          alert('输入内容不能为空')
      });
    }
    render() {
        return (
            <div className="create">
                <div className="title">新增图书</div>
                    {/*从输入框拿到name*/}
                <div className="name">图书名:
                    <input
                    type="text"
                    onChange={(e)=>{
                        this.setState({name:e.target.value})}}
                    value={this.state.name}/>
                </div>

                    {/*从输入框拿到describe*/}
                <div className="describe">图书描述:
                    <textarea
                        type="text"
                        onChange={(e)=>{
                            this.setState({describe:e.target.value})}}
                        value={this.state.describe}/>
                </div>
                <button onClick={this.handleClick} className="button">提交</button>
            </div>
        );
    }
}

export default Index;