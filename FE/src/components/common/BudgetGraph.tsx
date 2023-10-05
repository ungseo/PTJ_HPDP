import React from "react";
import style from "../../styles/css/BudgetGraph.module.css";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface BudgetListProps {
  target: number;
  budgetList: {
    createdDate: string;
    modifiedDate: string;
    id: number;
    price: string;
    content: string;
  }[];
}

const BudgetGraph = ({ target, budgetList }: BudgetListProps) => {
  const processedBudgetList = budgetList.map((item) => ({
    content: item.content,
    price: parseInt(item.price),
  }));

  const totalBudget = processedBudgetList.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const totalRatio = (totalBudget / target) * 100;
  return (
    <div className={style.budget_container}>
      <div className={style.budget_bar}>
        {processedBudgetList.map((item, index) => {
          const ratio = (item.price / totalBudget) * totalRatio;

          const barStyle = {
            width: processedBudgetList.length === 1 ? "100%" : `${ratio}%`,
            backgroundColor: index === 0 ? "#FB788E" : "#FAA7BA", // 첫 번째 항목일 때 "#FB788E", 그 외에는 "#FAA7BA"
            borderRadius:
              processedBudgetList.length === 1
                ? "0.5rem"
                : index === 0
                ? "0.5rem 0 0 0.5rem"
                : index === processedBudgetList.length - 1
                ? "0 0.5rem 0.5rem 0"
                : "0",
          };

          return <div key={item.content} style={barStyle}></div>;
        })}
      </div>
      {processedBudgetList.map((item, index) => {
        const ratio = (item.price / totalBudget) * totalRatio;
        const truncatedRatio = Math.floor(ratio);
        return (
          <div className={style.number} key={item.content}>
            <div className={style.layer}>
              <div>{item.content}</div>
              <div>
                {formatNumber(item.price)} 원({truncatedRatio}%)
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BudgetGraph;
