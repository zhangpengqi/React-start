import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "../style.css";




function Comment(props){
//  state={
//      id:'',
//      name:'',
//      commentList:[],
//  }
let[id,setId]=useState('');
let[name,setName]=useState('');
let[commentList,setCommentList]=useState([]);
    // componentDidMount() {
        useEffect(()=>{
            let idd = props.match.params.id;
            console.log(idd)
           
            axios.get('/\/api\/article\/comment.*/',{
                params: {
                    page:1
                }
            }).then((res)=>{
                console.log(res.data.data[1].name)
                // this.setState({commentList:res.data.data})
                setCommentList(res.data.data)
            })
        },[])
       
    // }
    let hike=()=>{
        axios.get('/\/api\/article\/comment.d/',{
          
        }).then((res)=>{
            console.log(res.data)
        })
    }
    // render() {
        return (
            <div>
                <div className="article-content-back">
                    <div className="article-content-back-left"><b>&lt;</b></div>
                </div>
                <ul className="comment-ul">
                {
                    commentList.map((item,id) => {
                        return(
                            <li key={id}>
                                <div className="comment-map">
                                    <div className="comment-map-left">
                                        <div className="comment-map-left-img"><img src={require('../img/0.jpg')}/></div>
                                    </div>
                                    <div className="comment-map-reight">
                                        <div className="comment-name">{commentList[id].name}</div>
                                        <div className="comment-from">{commentList[id].from}</div>
                                        <div className="comment-content">{commentList[id].content}</div>
                                        <div className="comment-sup">
                                            <ul>
                                                <li><img  src={require('../img/5.png')}/>{commentList[id].aggren}</li>
                                                <li><img  src={require('../img/6.png')}/>{commentList[id].disaggren}</li>
                                                <li><img  src={require('../img/3.png')}/>{commentList[id].free}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ) 
                    })
                }
                </ul>
                <div className="comment-bot"><input type="text" placeholder="写评论..."/><button onClick={hike}>提交</button></div>
               
            </div>
        );
    // }
}

export default Comment;