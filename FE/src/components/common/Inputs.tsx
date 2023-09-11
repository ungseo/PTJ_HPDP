import { useEffect, useState } from "react";
import { InputInterface } from "../../interface/commonInterface";
import style from "../../styles/css/Inputs.module.css";
const AnimationLabelInput = ({
  value,
  placeholder,
  onChange,
  id,
  styles,
  labelTitle,
}: InputInterface) => {
  const inputs = document.querySelectorAll(".formControl .inputBox");
  const labels = document.querySelectorAll(".formControl .label");

  labels.forEach((label) => {
    console.log(label);
    label.innerHTML = labelTitle
      .split("")
      .map(
        (letter, idx) => `<span className={style.span} style="
				transition-delay: ${idx * 50}ms
			">${letter}</span>`
      )
      .join("");
  });

  return (
    <div className={style.formControl} style={styles}>
      <input
        className={style.inputBox}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
      <label className={style.label}>{labelTitle}</label>
    </div>
  );
};

export default AnimationLabelInput;
