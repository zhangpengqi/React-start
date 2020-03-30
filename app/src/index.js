import React from "react";
import {render} from "react-dom";
//自定义组件
import "./style.css"
// import Reg from "./components/reg"
import Search from "./components/search";
import Nav from "./components/nav";
import Banner from "./components/banner";
import Article from "./components/article";
import Tabbar from "./components/tabbar";

let index=(
    <div>
        {/*/!*注册*!/*/}
        {/*<Reg></Reg>*/}
        {/*分类导航*/}
        <Search/>
        {/*分类导航*/}
        <Nav/>
        {/*幻灯片*/}
        <Banner/>
        {/*文章列表*/}
        <Article/>
        {/*底部导航*/}
        <Tabbar/>
    </div>
)
render(index,document.getElementById("root"));


