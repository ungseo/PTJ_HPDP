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

  const settlement = async () => {
    await setOnGoing(true);
    await settlementFunding(
      accessToken,
      funding.fundingId,
      (res) => {
        OkModal({ title: "성공", text: "정산이 완료되었습니다." });
        refresh((prev: number) => ++prev);
      },
      (err) => {
        NotOkModal({ title: "실패", text: "정산에 실패했습니다." });
      }
    );
    await setOnGoing(false);
  };
  console.log(funding.state === "SETTLE");
  // 보고서 모달 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);
  const openReportModal = () => {
    setModalOpen(true);
  };
  console.log(funding);
  // 퍼센트 계산
  const percent = Math.floor(
    Number(funding.totalFunding / funding.targetAmount) * 100
  );
  console.log(funding);
  return (
    <div>
      <Grid container className={style.total}>
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
                <div className={style.nowaccount}>
                  총 모인 금액:{funding.totalFunding}원
                </div>
              </div>
              <div className={style.remaindate}>{formatDday}</div>
            </div>
            <ProgressBar percent={percent || 0} />
          </div>
        </Grid>
        {(funding.state === "END" || funding.state === "SETTLE") && (
          <div>
            <button
              className={style.settlement}
              onClick={settlement}
              disabled={funding.state === "SETTLE"}
            >
              정산하기
            </button>
            <button
              className={style.report}
              onClick={openReportModal}
              disabled={funding.state === "END"}
            >
              보고서
            </button>
          </div>
        )}

        {modalOpen && (
          <ReportModal cM={setModalOpen} fundingId={funding.fundingId} />
        )}
      </Grid>
      {onGoing && <LoadingSpinner />}
    </div>
  );
};

export default FundingListItem;
