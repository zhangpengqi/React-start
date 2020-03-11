import React, {useEffect,useState} from 'react';  //hook  改造成函数式组件
import axios from 'axios';
import {Link} from  "react-router-dom";
import "../style.css";


function Index(){

    let [articleList,setArticleList] = useState([]) 

    useEffect( () => {
        axios.get('/api/article',{
            params: {
                page:1
            }
        }).then((res)=>{

            setArticleList(res.data.data)
        })
        return ()=>{
            console.log("ge")
        }
    },[])                  

        return (
            <div>
                <h3>文章列表</h3>
                <ul>
                    {
                        articleList.map((item,id)=>{
                            return(
                                <li key={id}>< Link to = { `/article/detail/${id}` } > 
                                < span style = {{ cursor: "pointer" } } > {articleList[id].title } </span>
                                </Link><span><Link to="/article/patile">购买</Link>
                                </span>
                                </li>
                            )
                        })
                    }
                </ul>
                
            </div>
            
        );
    // }
}

export default Index;