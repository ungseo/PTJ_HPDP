import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/css/SearchBar.module.css";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const onChange = (event: any) => {
    setKeyword(event.target.value);
  };
  const navigate = useNavigate();

  // 검색 함수
  const searchHandler = () => {
    navigate(`/search/${keyword}`);
  };
  return (
    <form className={style.searchBar}>
      <input
        className={style.input}
        type="text"
        value={keyword}
        onChange={onChange}
      />
      <img
        className={style.img}
        src="/buttons/searchButton.png"
        onClick={searchHandler}
        alt="검색버튼"
      ></img>
    </form>
  );
};

export default SearchBar;
