import React from "react";
import style from "../../styles/css/FundingIntroduce.module.css";
import ParticipateList from "./ParticipateList";
import DetailHashTag from "./DetailHashTag";

const FundingIntroduce = () => {
  return (
    <>
      <div style={{ height: "50rem", backgroundColor: "yellow" }}></div>
      <DetailHashTag />
      <hr></hr>
      <ParticipateList />
      <div style={{ height: "3rem" }}></div>
    </>
  );
};

export default FundingIntroduce;
