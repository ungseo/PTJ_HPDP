import { useEffect, useState } from "react";
import { AscendingNumberInterface } from "../../interface/commonInterface";

const AscendingNumber = ({ num, fs }: AscendingNumberInterface) => {
  const [targetNumber, setTargetNumber] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetNumber((prev) => {
        let remainNum = num - prev;
        if (prev < num) {
          if (remainNum > 10000000) {
            return prev + 7333333;
          } else if (remainNum > 100000) {
            return prev + 73333;
          } else if (remainNum > 1000) {
            return prev + 733;
          } else if (remainNum > 10) {
            return prev + 7;
          }
          return ++prev;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, [num]);
  return (
    <div>
      <span style={{ fontSize: `${fs}` }}>{targetNumber}</span>
    </div>
  );
};

export default AscendingNumber;
