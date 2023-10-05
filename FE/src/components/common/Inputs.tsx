import React from "react";
import style from "../../styles/css/Inputs.module.css";
import { InputInterface } from "../../interface/commonInterface";

const AnimationLabelInput = ({
  value,
  onChange,
  id,
  styles,
  labelTitle,
  type,
  required,
  disabled,
}: InputInterface) => {
  const onClick = (event: any) => {
    if (id) {
      const input = document.getElementById(id);
      if (input) {
        input.focus();
      }
    }
  };
  return (
    <div className={style.formControl} style={styles}>
      <input
        className={style.inputBox}
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        name={id}
        placeholder=""
        required={required}
        disabled={disabled}
      />
      <label className={style.label} htmlFor={id} onClick={onClick}>
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
