import React, {Component} from 'react';
import Land from "./land"
class Login extends Component {
    render(){
        return(
            <div>
                <Land history={this.props.history}></Land>
            </div>
        )
    }
}
export default Login;