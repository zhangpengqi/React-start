import React, {Component} from 'react';
import "./style.css"
class Carousel extends Component {
    state={
        total:0,
        index:0,
        delay:4000
    }

    componentDidMount() {
        if(this.props.delay){
            this.setState({delay:this.props.delay})
        }
        this.setState({total:this.props.children.length});
        setInterval(this.changeIndex,this.state.delay)
    }

    changeIndex=()=>{
        this.setState({index:((this.state.index+1)===this.state.total?0:(this.state.index+1))})
    }

    render() {
        let numbers=[];
        if(this.props.dots){
            for(let i=0;i<this.props.children.length;i++){
                numbers.push(
                    <li
                        key={i}
                        className={i===this.state.index?"active":""}
                        onClick={()=>{
                            this.setState({index:i})
                        }}
                    />
                )
            }
        }else{
            numbers=[]
        }
        return (
            <div className="banner">
                <div className="center">
                    {this.props.children[this.state.index]}
                </div>
                <div  className="bottom">
                    <ul>
                        {numbers}
                        {this.props.afterChange(this.state.index)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Carousel;
