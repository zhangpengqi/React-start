import React from "react";
import "./style.css"
import axios from "axios"

class Article extends React.Component{

    state={
        articles:[],
    };

    componentDidMount() {
            axios.get("http://playground.it266.com/news")
                .then((response)=>{
                    console.log(response);
                    this.setState({articles:response.data.articles});
                }).catch((error)=>{
                    console.log(error)
            })
    }

    render() {
        return(
            this.state.articles.map((item)=>{
                return(
                    <div key={item.id}  className="article">
                        <div className="article-left">
                            <div  className="article-left-top">{item.title}</div>
                            <div className="article-left-bottom">"财新周刊"</div>
                        </div>
                        <div className="article-right">
                            <img src="http://img.caixin.com/2020-02-05/1580861007869383_300_200.jpg" alt=""/>
                        </div>
                    </div>
                )
            })
        )
    }
}

export default Article;