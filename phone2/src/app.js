import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Article from "./articleList/article"
import ArticleList from "./articleList"
import Login from "./login"
import Pay from "./pay"

export const AuthContext=React.createContext({
    user:{
        vip:'',
        token:''
    },
    setToken:()=>{},
    setVip:()=>{}
});
class App extends Component {
    constructor(props) {
        super(props);
        this.setToken=(t)=>{
            this.setState({auth:{...this.state.auth,user:{...this.state.auth.user,token:t}}})
        }
        this.setVip=(v)=>{
            this.setState({auth:{...this.state.auth,user:{...this.state.auth.user,vip:v}}})
        }

        this.state={
            auth:{
                user:{
                    token:localStorage.getItem('token'),
                    vip:localStorage.getItem('vip')
                },
                setToken:this.setToken,
                setVip:this.setVip
            }
        }
    }
    render() {
        return (
            <AuthContext.Provider value={this.state.auth}>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={ArticleList}/>
                            <Route path="/article" component={Article}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/pay" component={Pay}/>
                        </Switch>
                    </HashRouter>
            </AuthContext.Provider>
        );
    }
}

export default App;