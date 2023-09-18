import React from "react";
import style from "../../styles/css/DetailHashTag.module.css";

const DetailHashTag = () => {
  const HashTagList = [
    "국내",
    "커뮤니티",
    "이벤트",
    "환경",
    "리사이클",
    "돌하르방",
    "키링",
    "자선사업",
  ];

  return (
    <div className={style.hashtag_area} style={{ textAlign: "left" }}>
      {HashTagList.map((tag, index) => (
        <span key={index} className={style.hashtag}>
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default DetailHashTag;
