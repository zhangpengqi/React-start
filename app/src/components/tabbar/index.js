import React from "react";
import "./style.css"
import Product from "./product"
import Tabbar1 from "../../images/icon2.png"
import Tabbar2 from "../../images/icon3.png"
import Tabbar3 from "../../images/icon4.png"
import Tabbar4 from "../../images/icon5.png"
import Tabbar5 from "../../images/icon6.png"

let product1={
    image:Tabbar1,
    text:"要闻"
}
let product2={
    image:Tabbar2,
    text:"周刊"
}
let product3={
    image:Tabbar3,
    text:"特供"
}
let product4={
    image:Tabbar4,
    text:"数据通"
}
let product5={
    image:Tabbar5,
    text:"我的"
}

    function Tabbar() {
        return(
            <div className="tabbar">
                <div className="tabbar-top">
                    <img src="https://showimg.caixin.com/dolphinfile/caixin/2020/02/23885_1.jpg" alt=""/>
                </div>
                <div className="tabbar-center">
                    <Product {...product1}></Product>
                    <Product {...product2}></Product>
                    <Product {...product3}></Product>
                    <Product {...product4}></Product>
                    <Product {...product5}></Product>
                </div>
                <div className="tabbar-bottom"></div>
            </div>
    )
}
export default Tabbar;
