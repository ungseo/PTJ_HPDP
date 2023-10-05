import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface ProgressBarProps {
  percent: number;
}

const CircleProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div style={{ padding: "15%" }}>
      <CircularProgressbar
        value={percent}
        text={`${percent}%`}
        styles={buildStyles({
          textColor: "#fb788e",
          textSize: "1.2rem",
          pathColor: "#fb788e",
          trailColor: "#D9D9D9",
          strokeLinecap: "butt",
        })}
        strokeWidth={22}
      />
    </div>
  );
};

export default CircleProgressBar;
