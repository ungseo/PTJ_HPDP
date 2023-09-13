import style from "../../styles/css/PhotoEditButton.module.css";

const PhotoEditButton = () => {
  return (
    <div className={style.photoEditButton}>
      <label className={style.label} htmlFor="input-file">
        <img src="/buttons/photoEditButton.png" alt="버튼" />
      </label>
      <input className={style.input} type="file" id="input-file" />
    </div>
  );
};

export default PhotoEditButton;
