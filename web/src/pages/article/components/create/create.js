import React from 'react';
import axios from "axios"
import qs from "qs"
import "./style.css"
class Create extends React.Component {

    state={
        title:"",
        content:""
    }
    handleClick=()=>{
        let token=localStorage.getItem("token")
      axios({
            method:"POST",
            url:"http://playground.it266.com/article/create?token="+token,
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:qs.stringify({
                'title':this.state.title,
                'content':this.state.content
            })
        }).then((result)=>{
            this.props.history.push("/article");
            console.log(result);
      }).catch((error)=>{
          alert('输入内容不能为空')
      });
    }
    render() {
        return (
            <div className="create">
                <div className="title">新增文章</div>

                    {/*从输入框拿到title*/}
                <div className="text">标题:
                    <input
                    type="text"
                    onChange={(e)=>{
                        this.setState({title:e.target.value})}}
                    value={this.state.title}/>
                </div>

                    {/*从输入框拿到content*/}
                <div className="text">内容:
                    <input
                        type="text"
                        onChange={(e)=>{
                            this.setState({content:e.target.value})}}
                        value={this.state.content}/>
                </div>
                <button onClick={this.handleClick} className="button">提交</button>
            </div>
        );
    }
}

export default Create;