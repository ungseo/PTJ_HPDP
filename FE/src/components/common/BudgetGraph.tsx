import React from "react";
import style from "../../styles/css/BudgetGraph.module.css";

const BudgetGraph = ({ target }: { target: number }) => {
  const BudgetList = [
    ["content1", 300000],
    ["content2", 700000],
  ];

  // 모든 content의 비율을 합산
  const totalBudget = BudgetList.reduce(
    (sum, [, amount]) => sum + Number(amount),
    0
  );
  const totalRatio = (totalBudget / target) * 100;

  return (
    <div className={style.budget_container}>
      <div className={style.budget_bar}>
        {BudgetList.map(([content, amount], index) => {
          const ratio = (Number(amount) / totalBudget) * totalRatio;

          const barStyle = {
            width: BudgetList.length === 1 ? "100%" : `${ratio}%`,
            backgroundColor: content === "content1" ? "#FB788E" : "#FAA7BA",
            borderRadius:
              BudgetList.length === 1
                ? "0.5rem"
                : index === 0
                ? "0.5rem 0 0 0.5rem"
                : index === BudgetList.length - 1
                ? "0 0.5rem 0.5rem 0"
                : "0", // 첫 번째와 마지막 div에 각각 다른 border-radius 설정
          };

          return <div key={content} style={barStyle}></div>;
        })}
      </div>
      {BudgetList.map(([content, amount]) => {
        const ratio = (Number(amount) / totalBudget) * totalRatio;

        return (
          <div className={style.number} key={content}>
            <div className={style.layer}>
              <div>{content}</div>
              <div>{ratio}%</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BudgetGraph;
