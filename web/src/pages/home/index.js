import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./style.css"

class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-title">首页</div>
                <ul className="list">
                    <li><Link to="/article" className="link">文章管理</Link></li>
                    <li><Link to="" className="link">会员管理</Link></li>
                </ul>

            </div>
        );
    }
}

export default Home;