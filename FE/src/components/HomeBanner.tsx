import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000, 
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <h3 style={{height:"15rem", backgroundColor:"pink"}}>1</h3>
          </div>
          <div>
            <h3 style={{height:"15rem", backgroundColor:"yellow"}}>2</h3>
          </div>
          <div>
            <h3 style={{height:"15rem", backgroundColor:"blue"}}>3</h3>
          </div>
          <div>
            <h3 style={{height:"15rem", backgroundColor:"red"}}>4</h3>
          </div>
        </Slider>
      </div>
    );
  }
}