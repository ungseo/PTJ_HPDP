import HashTagButton from "./HashTagButton";
import style from "../../styles/css/HashTagList.module.css";
import { useNavigate } from "react-router-dom";
const HashTagList = () => {
  const navigate = useNavigate();
  const searchHandler = (event: any) => {
    const { id } = event.target;
    const keyword = id.replace("#", "");
    console.log(keyword);
    navigate(`/search/${keyword}`);
  };
  const hashTagList = [
    "#사회공헌",
    "#공예",
    "#뮤지컬",
    "#화장품",
    "#재활용",
    "#자연",
  ];
  return (
    <div className={style.hashTagList}>
      {hashTagList.map((tag, idx) => (
        <HashTagButton key={idx} text={tag} id={tag} onClick={searchHandler} />
      ))}
    </div>
  );
};

export default HashTagList;
