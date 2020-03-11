import React,{Component} from "react";
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"
import Carousel from "./carousel"
class Banner extends Component{
    render() {
        return(
                <Carousel
                    dots={true}
                    delay={5000}
                    afterChange={(currentIndex)=>{
                        console.log(`当前显示的是${currentIndex}`);
                    }}>
                    <img src={image1} width="100%" alt=""/>
                    <img src={image2} width="100%" alt=""/>
                    <img src={image3} width="100%" alt=""/>
                </Carousel>
        )
    }
}

export default Banner;