import style from "../../styles/css/NullModal.module.css";

const NullModal = ({ text }: { text: string }) => {
  return (
    <div className={style.modal}>
      <h2>{text}</h2>
    </div>
  );
};

export default NullModal;
