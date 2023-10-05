import React from "react";
import style from "../../styles/css/LoadingSpinnerMini.module.css";

const LodingSpinnerMini = () => {
  return (
    <div className={style.loadingioSpinner}>
      <div className={style.lens}>
        <div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodingSpinnerMini;
