import React,{Component} from "react";
import Top from "./top"
import Input from "./input"
class Page extends Component{
    render(){
        return(
            <div>
                <Top/>
                <Input history={this.props.history}/>
            </div>
        )
    }
}
export default Page