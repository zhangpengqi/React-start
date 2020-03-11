import React, {Component} from 'react';

class ShowPage extends Component {
    render() {
    console.log(this.props);
            let numbers=[];

            for(let i=1;i<=this.props.pageCount;i++){
                numbers.push(<span
                    key={i}
                    className={i===this.state.currentPage?"active":""}
                    onClick={()=>{
                        this.setState({currentPage:i},this.getDate)}}
                >{i}</span>)
            }
            return(
                <div className="bottom">
                    <span className="itemCont">
                        共{this.props.itemCount}条
                    </span>
                    {/*上一页*/}
                    <span className="prevPage" onClick={()=>{
                        this.setState({currentPage:this.props.prevPage},this.getDate)
                    }}></span>
                    {numbers}
                    {/*下一页*/}
                    <span className="nextPage" onClick={()=>{
                        this.setState({currentPage:this.props.nextPage},this.getDate)
                    }}></span>

                    <select onChange={(e)=>{
                        this.setState({pageSize:e.target.value,currentPage:1},this.getDate)}}
                    >
                        <option value="5">5条/页</option>
                        <option value="10">10条/页</option>
                        <option value="15">15条/页</option>
                    </select>
                    跳至
                    <input
                        value={this.props.currentPage}
                        onChange={(e)=>{
                            this.setState({currentPage:e.target.value})
                        }}
                        onKeyDown={(e)=>{
                            if(e.keyCode===13){
                                this.setState({currentPage:e.target.value},this.getDate)}}}
                        type="text"
                    /> 页
                </div>
            )

    }
}

export default ShowPage;