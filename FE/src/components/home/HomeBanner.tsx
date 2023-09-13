import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import style from "../../styles/css/HomeBanner.module.css";

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

    const slideContents = [
      { className: style["slide-1"], content: "1" },
      { className: style["slide-2"], content: "2" },
      { className: style["slide-3"], content: "3" },
      { className: style["slide-4"], content: "4" },
    ];

    return (
      <div className={style.totalcontent}>
        <Slider {...settings}>
          {slideContents.map((slide, index) => (
            <div key={index} className={`slide ${slide.className}`}>
              <div className={style.slide}>{slide.content}</div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
