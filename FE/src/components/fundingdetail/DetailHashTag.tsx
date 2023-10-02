import React from "react";
import style from "../../styles/css/DetailHashTag.module.css";

// hashtagList가 배열로 변경되었으므로 새로운 인터페이스 설정
interface DetailHashTagProps {
  hashtagList: string[];
}

const DetailHashTag = ({ hashtagList }: DetailHashTagProps) => {
  return (
    <div className={style.hashtag_area} style={{ textAlign: "left" }}>
      {hashtagList.map((tag, index) => (
        <span key={index} className={style.hashtag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default DetailHashTag;
