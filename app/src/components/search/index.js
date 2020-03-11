import React,{Component} from "react";
import "./style.css"

class Search extends Component{

    //搜索框输入内容
    state={
        content:""
    }
    handleChange=(e)=>{
        this.setState({content:e.target.value});
        console.log(e.target.value);
    }
    render() {
        return (
            <div className={"search"}>
                <input onChange={this.handleChange}
                       value={this.state.content}
                       onKeyPress={(e)=>{
                           if(e.charCode===13){
                           console.log("用户想要搜索的内容是："+this.state.content);
                           }
                       }}
                       className="keyWord" type="text"
                       placeholder="请输入搜索内容"/>
                <span className={"icon"}></span>
            </div>
        );
    }
}
export default Search;