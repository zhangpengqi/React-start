import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import Index from "./cactil/index.js";
import Detail from "./cactil/detail.js";
import Comment from "./cactil/comment";
import Patile from "./cactil/Patile";

class Article extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/article"><Index History={this.props.history}></Index></Route>
                <Route path="/article/detail/:id" component={Detail}></Route>
                <Route path="/article/comment/:id" component={Comment}></Route>
                <Route path="/article/patile" component={Patile}></Route>
            </Switch>
        );
    }
}

export default Article;