import React from "react";
import "./style.css"

function Product(props) {
    console.log(props.image);
    return(
        <div className="product">
            <div className="product-top">
                <img src={props.image} alt=""/>
            </div>
            <div className="product-bottom">{props.text}</div>
        </div>
    )
}
export default Product;