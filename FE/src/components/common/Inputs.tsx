import { InputInterface } from "../../interface/commonInterface";
import style from "../../styles/css/Inputs.module.css";

const AnimationLabelInput = ({
  value,
  onChange,
  id,
  styles,
  labelTitle,
  type,
}: InputInterface) => {
  return (
    <div className={style.formControl} style={styles}>
      <input
        className={style.inputBox}
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        required
      />
      <label className={style.label}>
        {labelTitle.split("").map((letter, idx) => (
          <span
            className={style.span}
            key={idx}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {letter}
          </span>
        ))}
      </label>
    </div>
  );
};

export default AnimationLabelInput;
