import style from "../../styles/css/SiteInfo.module.css";
import InfoItem from "./InfoItem";

const SiteInfo = () => {
  return (
    <div>
      <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
        후원자 여러분 덕분에 세상은 조금씩 달콤해지고 있습니다.
      </p>
      <div className={style.wrapper}>
        <InfoItem
          imgSrc="/save_money.png"
          text="후원 금액"
          num={9203292}
          unit="원"
        />
        <InfoItem imgSrc="/heart.png" text="후원 횟수" num={291179} unit="회" />
        <InfoItem
          imgSrc="/save_money.png"
          text="모금 개수"
          num={32}
          unit="개"
        />
        <InfoItem
          imgSrc="/save_money.png"
          text="후원 금액"
          num={72}
          unit="개"
        />
      </div>
    </div>
  );
};

export default SiteInfo;
