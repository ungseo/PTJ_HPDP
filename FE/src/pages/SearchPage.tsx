import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../styles/css/SearchPage.module.css";
import HashTagList from "../components/search/HashTagList";
import SearchBar from "../components/search/SearchBar";

const SearchPage = () => {
  // 검색어 관련 함수

  return (
    <div id={style.searchPage}>
      <SearchBar />
      <h1>추천검색</h1>
      <HashTagList />
    </div>
  );
};

export default SearchPage;
