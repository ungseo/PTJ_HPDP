import { useEffect, useState } from "react";

const AscendingNumber = ({ num }: { num: number }) => {
  const [targetNumber, setTargetNumber] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetNumber((prev) => {
        let remainNum = num - prev;
        if (prev < num) {
          if (remainNum > 10000000) {
            return prev + 3333333;
          } else if (remainNum > 100000) {
            return prev + 33333;
          } else if (remainNum > 1000) {
            return prev + 333;
          } else if (remainNum > 10) {
            return prev + 3;
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
      <span>{targetNumber}</span>
    </div>
  );
};

export default AscendingNumber;
