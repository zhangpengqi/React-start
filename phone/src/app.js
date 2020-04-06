import React, {Component} from 'react';
import Home from "./pages/home";
import Article from "./pages/article";
import {HashRouter,Switch,Route} from "react-router-dom";
import Sign from "./sign";
import Login from "./login"
import UserInfo from "./pages/userInfo"

//设置上下文
export const AuthContext=React.createContext({
    user:null,
    setUser:()=>{
    }
})

class App extends Component {

    constructor(props) {
        super(props);
        this.setUser=(u)=>{
            this.setState({auth:{...this.state.auth,user:u}})
        }
        this.state={
            auth:{
                user: {
                    token:localStorage.getItem('token'),
                    vip:localStorage.getItem('key')
                },
                setUser:this.setUser
            }
        }
    }

    render() {
        return (
            <AuthContext.Provider value={this.state.auth}>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={Login}></Route>
                            <Route path="/sign" component={Sign}></Route>
                            <Route path="/userInfo" component={UserInfo}></Route>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/article" component={Article}></Route>
                        </Switch>
                    </HashRouter>
            </AuthContext.Provider>
        );
    }
}
export default App;