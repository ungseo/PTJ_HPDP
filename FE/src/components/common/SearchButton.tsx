import { useState } from "react";
import "../../styles/css/SearchButton.css";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SearchButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formClassName, setFormClassName] = useState("");
  // 서치버튼 열때
  const onFocus = () => {
    if (formClassName === "open") return;
    setFormClassName("in");
    dispatch(uiActions.searchButtonFocusedToggler());
    setTimeout(() => {
      setFormClassName("open");
      setInputValue("");
    }, 1300);
  };
  const [inputValue, setInputValue] = useState("");

  //X버튼 눌렀을때
  const onClick = (event: any) => {
    event.preventDefault();
    if (formClassName !== "open") return;
    setInputValue("");
    setFormClassName("close");
    dispatch(uiActions.searchButtonFocusedToggler());
    setTimeout(() => {
      setFormClassName("");
    }, 1300);
  };
  //제출하고 원상복귀
  const onSubmit = (event: any) => {
    event.preventDefault();
    setFormClassName("explode");
    setInputValue("");
    dispatch(uiActions.searchButtonFocusedToggler());
    navigate(`/search/${inputValue}`);
    setTimeout(() => {
      setFormClassName("");
    }, 1500);
  };

  const onChange = (event: any) => {
    setInputValue(event.target.value);
  };
  console.log(formClassName);
  return (
    <form className={formClassName} onSubmit={onSubmit}>
      <input
        type="text"
        onFocus={onFocus}
        value={inputValue}
        onChange={onChange}
      />
      <div className={"after"} onClick={onClick}></div>
      <input
        type="submit"
        onFocus={onFocus}
        value={inputValue}
        onChange={onChange}
      />
    </form>
  );
};

export default SearchButton;
