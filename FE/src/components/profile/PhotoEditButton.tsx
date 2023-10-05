import { useDispatch } from "react-redux";
import style from "../../styles/css/PhotoEditButton.module.css";
import { profileEditActions } from "../../store/profileEdit-slice";
import { Icon } from "@iconify/react";

interface SetFunction {
  setSelectedImage: React.Dispatch<React.SetStateAction<File>>;
}

const PhotoEditButton = ({ setSelectedImage }: SetFunction) => {
  const dispatch = useDispatch();
  //파일 선택후 직렬화, 리덕스에 직렬화된 데이터 저장
  const fileHandler = (event: any) => {
    const file = event.target.files[0];
    //이미지 파일 스테이트로 올리기
    setSelectedImage(file);
    // 파일 URL 리덕스에 저장, 프리뷰 보여주기용
    const fileURL = URL.createObjectURL(file);
    dispatch(profileEditActions.changeFile(fileURL));
  };
  return (
    <div className={style.photoEditButton}>
      <label className={style.label} htmlFor="input-file">
        {/* <img src="/buttons/photoEditButton.png" alt="버튼" /> */}
        <Icon
          icon={"bi-patch-plus-fill"}
          style={{ fontSize: "2.5rem", color: "white" }}
        />
      </label>
      <input
        className={style.input}
        type="file"
        id="input-file"
        onChange={fileHandler}
      />
    </div>
  );
};

export default PhotoEditButton;
