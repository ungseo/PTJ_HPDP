import { Grid } from "@mui/material";
import { OutFundingsInfoInterface } from "../../interface/apiDataInterface";
import ProgressBar from "../common/ProgressBar";
import style from "../../styles/css/FundingListItem.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { registerReport, settlementFunding } from "../../api/fundings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import ReportModal from "./ReportModal";
import { NotOkModal, OkModal } from "../common/AlertModals";
import LoadingSpinner from "../common/LoadingSpinner";
import { useNavigate } from "react-router";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FundingListItem = ({
  funding,
  refresh,
}: {
  funding: OutFundingsInfoInterface;
  refresh: any;
}) => {
  const formatDday =
    funding.dday !== "마감" ? `D-${funding.dday}` : funding.dday;

  // 컨트롤러 모달 열고 닫기 함수

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  //정산하기
  const [onGoing, setOnGoing] = useState(false);
  const Total_Funding = formatNumber(funding.totalFunding);
  const settlement = () => {
    setOnGoing(true);
    settlementFunding(
      accessToken,
      funding.fundingId,
      (res) => {
        OkModal({
          title: "성공",
          text: "정산이 완료되었습니다.",
          footer: `${res.data.data.totalPoint} 포인트를 후원받았습니다.`,
        });
        refresh((prev: number) => ++prev);
        setOnGoing(false);
      },
      (err) => {
        NotOkModal({ title: "실패", text: "정산에 실패했습니다." });
        setOnGoing(false);
      }
    );
  };

  // 보고서 모달 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);
  const openReportModal = () => {
    setModalOpen(true);
  };

  // 퍼센트 계산
  const percent = Math.floor(
    Number(funding.totalFunding / funding.targetAmount) * 100
  );
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/funding/detail/${funding.fundingId}`);
  };

  return (
    <div>
      <Grid container className={style.total}>
        <Grid container onClick={goDetail}>
          <Grid item xs={3}>
            <img
              src={funding.thumbnail}
              alt={funding.title}
              className={style.leftimg}
            />
          </Grid>
          <Grid item xs={9} className={style.rightcontent}>
            <div className={style.upcontent}>
              <div className={style.fundingcontent}>{funding.title}</div>
              <div className={style.companyname}>{funding.name}</div>
            </div>
            <div className={style.downcontent}>
              <div className={style.downDetail}>
                <div className={style.downLeft}>
                  <div className={style.fundingpercent}>{percent}%</div>
                  <div className={style.nowaccount}>{Total_Funding}원</div>
                </div>
                <div className={style.remaindate}>{formatDday}</div>
              </div>
              <ProgressBar percent={percent || 0} />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} className={style.state_info}>
            <div>
              {funding.state === "SETTLE"
                ? "정산완료"
                : funding.state === "END"
                ? "정산대기"
                : funding.state === "ING"
                ? "진행 중"
                : funding.state}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={style.btn_part}>
              {funding.state === "END" ? (
                <div
                  style={{ backgroundColor: "#031888", color: "white" }}
                  className={style.btn1}
                  onClick={settlement}
                >
                  정산하기
                </div>
              ) : (
                <div className={style.btn2}>정산하기</div>
              )}
              {funding.state === "SETTLE" ? (
                <div
                  style={{ backgroundColor: "#031888", color: "white" }}
                  className={style.btn2}
                  onClick={openReportModal}
                >
                  보고서 등록
                </div>
              ) : (
                <div className={style.btn2}>보고서 등록</div>
              )}
            </div>
          </Grid>
        </Grid>

        {modalOpen && (
          <ReportModal cM={setModalOpen} fundingId={funding.fundingId} />
        )}
      </Grid>
      {onGoing && <LoadingSpinner />}
    </div>
  );
};

export default FundingListItem;
