import React from "react";
import "./style.css"

class Nav extends React.Component{
        //当前被选中项
        state={
            activeIndex:0
        }
        //点击事件，被点击的导航栏下边框变黑，字体加黑
        handleClick(e){
            this.setState({activeIndex:e})
        }

    render() {

        let category=["首页","推荐","限免","金融","公司","宏观"];
        let navData= category.map((item,index)=>{
                                return (
                                    <li
                                        key={index}
                                        onClick={()=>{this.handleClick(index)}}
                                        className={this.state.activeIndex===index?"active":"" }>{item}</li>
                                )
                            })
        //导航栏
        return (
            <div className="nav">
                <div className="nav-list">
                    <ul>
                        {navData}
                    </ul>
                </div>
                <div className="nav-add"></div>
            </div>
        );
    }
}
export default Nav;