  import React,{Component} from 'react';
  // import {render} from "react-dom";
  // import Head from "./Head.js";
  import Input from "./Input.js";
  import "./index.css";
 

class Sign extends React.Component{
  render(){
    return(
             <div>
              <Input history={this.props.history}/>
          </div>
          )
  }
}

 export default Sign;
