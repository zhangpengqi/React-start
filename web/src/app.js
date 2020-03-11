import React, {Component} from 'react';
import Home from "./pages/home";
import Article from "./pages/article";
import {HashRouter,Switch,Route} from "react-router-dom";
import Login from "./login";

class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/article" component={Article}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default App;