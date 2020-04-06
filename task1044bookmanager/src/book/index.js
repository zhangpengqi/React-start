import React, {Component} from 'react';
import {Switch,Route} from "react-router-dom";
import Index from "./components";
import Create from "./components/create"
import Edit from "./components/edit"
class Book extends Component {
    render() {
        return (
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/create" component={Create}/>
                    <Route path="/edit/:id" component={Edit}/>
                </Switch>
        );
    }
}

export default Book;