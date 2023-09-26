import { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import PointHistory from "../components/pointhistory/PointHistory";
import PointHistoryList from "../components/pointhistory/PointHistoryList";
import { useSelector } from "react-redux";
import { getPointList } from "../api/points";

const PointHistoryPage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  console.log(accessToken);

  const [balance, setBalance] = useState(0);
  const [totalFundingAmount, setTotalFundingAmount] = useState(0);
  const [pointList, setPointList] = useState([]);

  useEffect(() => {
    getPointList(
      accessToken,
      (res) => {
        console.log(res.data.data);
        setBalance(res.data.data.balance);
        setTotalFundingAmount(res.data.data.totalFundingAmount);
        setPointList(res.data.data.pointHistoryResList.reverse());
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <OptionTopbar text="거래내역" />
      <PointHistory totalPoint={balance} totalFunding={totalFundingAmount} />
      <PointHistoryList pointList={pointList} />
    </div>
  );
};

export default PointHistoryPage;
