import React, {Component} from 'react';
import {Switch,Route} from "react-router-dom";
import Index from "./components";
import Create from "./components/create/create";
import Edit from "./components/edit/edit";


class Article extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/article" component={Index}/>
                <Route path="/article/create" component={Create}/>
                <Route path="/article/edit/:id" component={Edit}/>
            </Switch>
        );
    }
}

export default Article;