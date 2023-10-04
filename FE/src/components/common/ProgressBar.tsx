import React from "react";
import { LinearProgress } from "@mui/material";

interface ProgressBarProps {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressBarProps) => {
  const limitedPercent = Math.min(percent, 100);
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={limitedPercent}
        sx={{
          height: "0.4rem",
          borderRadius: "1rem",
          backgroundColor: "#D9D9D9",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#fb788e",
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
