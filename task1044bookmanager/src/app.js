import React, {Component} from 'react';
import {HashRouter,Switch,Route} from "react-router-dom";
import Book from "./book";
class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path="/" component={Book}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default App;