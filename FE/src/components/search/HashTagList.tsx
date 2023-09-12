import HashTagButton from "./HashTagButton";
import style from "../../styles/css/HashTagList.module.css";
const HashTagList = () => {
  const hashTagList = [
    "#사회공헌",
    "#공예",
    "#뮤지컬",
    "#화장품",
    "#기타등등",
    "#더미2",
  ];
  return (
    <div className={style.hashTagList}>
      {hashTagList.map((tag, idx) => (
        <HashTagButton key={idx} text={tag} />
      ))}
    </div>
  );
};

export default HashTagList;
