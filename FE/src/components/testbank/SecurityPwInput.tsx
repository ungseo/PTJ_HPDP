import { Icon } from "@iconify/react";
import style from "../../styles/css/SecurityPwInput.module.css";
import { useEffect, useState } from "react";
import { QuestionModal } from "../common/AlertModals";

const SecurityPwInput = ({ setIsInput, setAccountPw }: any) => {
  const closeModal = () => {
    setIsInput(false);
  };
  const keyList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [shuffledKeyList, setSuffledKeyList] = useState<string[]>(keyList);
  useEffect(() => {
    // 버튼 리스트 랜덤조합

    function shuffleArray(array: string[]) {
      for (let i = array.length - 1; i > 0; i--) {
        // 0부터 i 사이의 무작위 인덱스를 선택합니다.
        const j = Math.floor(Math.random() * (i + 1));

        // 배열의 요소 i와 j를 교환합니다.
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const shuffle = shuffleArray([...keyList]);
    setSuffledKeyList(shuffle);
  }, []);

  const [display, setDisplay] = useState<string[]>([]);

  const inputKey = (event: any) => {
    const { id } = event.target;
    setDisplay((prev: any) => {
      if (prev.length !== 4) {
        return [...prev, id];
      } else return prev;
    });
  };
  const deleteInput = () => {
    if (display.length) {
      setDisplay((prev) => prev.slice(0, -1));
    }
  };

  const confirmation = () => {
    if (display.length === 4) {
      setAccountPw(display.join(""));
      setIsInput(false);
    } else {
      QuestionModal({
        title: "비밀번호",
        text: "비밀번호 4자리를 입력해주세요!",
      });
    }
  };
  return (
    <div className={style.wrapper}>
      <button className={style.xButton} onClick={closeModal}>
        X
      </button>
      <div className={style.inputBox}>
        <div className={style.box} id="1">
          {display[0] && "*"}
        </div>
        <div className={style.box} id="2">
          {display[1] && "*"}
        </div>
        <div className={style.box} id="3">
          {display[2] && "*"}
        </div>
        <div className={style.box} id="4">
          {display[3] && "*"}
        </div>
      </div>
      <div className={style.keypad}>
        {shuffledKeyList.map((key, index) => (
          <div key={index} id={key} className={style.key} onClick={inputKey}>
            {key}
          </div>
        ))}
        <div className={style.k1} onClick={confirmation}>
          입력
        </div>
        <div className={style.k2} id="backSpace" onClick={deleteInput}>
          <Icon icon={"bi-backspace-fill"} id="backSpace" />
        </div>
      </div>
    </div>
  );
};

export default SecurityPwInput;
