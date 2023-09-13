import { useEffect, useState } from "react";

const AscendingNumber = ({ num }: { num: string }) => {
  const [renderingNumber, setRenderingNumber] = useState(0);
  const numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const targetNumber = num.split("").map((n, i) => Number(n));
  const n = targetNumber.length;
  return (
    <div>
      {targetNumber.map((n, i) => {
        while (n !== renderingNumber) {}
        return <span>{renderingNumber}</span>;
      })}
    </div>
  );
};

export default AscendingNumber;
