import React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";

import "./app.css"


import Home from "./pages/home";
import Article from "./pages/article";
import Login from "./pages/login/index.js";
import Member from "./pages/member";
import Sign from "./sign/index.js";
import './mock/article';

export const AuthContext = React.createContext({
    user: null,
    avatar:null,
    mobile:null,

    setUser: () => {
    },
})

class App extends React.Component {
    constructor(props) {
        super(props);

        this.setUser = (u) => {

            // //持久化到localStorage中
            // if (u) {
            //     window.localStorage.setItem("nickname", u.nickname)
            // 	window.localStorage.setItem("avatar_url", u.avatar_url)
            // 	window.localStorage.setItem("mobile", u.mobile)
            // } else {
            //     window.localStorage.removeItem("nickname")
            // 	window.localStorage.removeItem("avatar_url", u.avatar_url)
            // 	window.localStorage.removeItem("mobile", u.mobile)
            // }

            this.setState({auth: {...this.state.auth, user: u}})
        }

        //如果localStorage中有数据，直接使用，否则为null，说明未登录
        let nickname = window.localStorage.getItem('nickname')
        let avatar_url = window.localStorage.getItem('avatar_url')
        let mobile = window.localStorage.getItem('mobile')
        this.state = {
            auth: {
                user: nickname ? {nickname: nickname} : null,
                mobile: mobile ? {mobile: mobile} : null,
                avatar: avatar_url ? {avatar_url: avatar_url} : null,

                setUser: this.setUser
            }
        }
    }

    render() {
        return (
            <AuthContext.Provider value={this.state.auth}>
                <HashRouter>
                    
                    <Switch>
                        <Route exact path="/"><Home></Home></Route>

                        <Route path="/sign" component={Sign}></Route>
                        <Route path="/article" component={Article}></Route>
                        <Route path="/member" component={Member}></Route>
                        <Route path="/login" component={Login}></Route>
                       
                    </Switch>
                </HashRouter>
            </AuthContext.Provider>
        )
    }
}

export default App
