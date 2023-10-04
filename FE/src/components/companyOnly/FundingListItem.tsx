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
  const [controller, setController] = useState(false);
  const formatDday =
    funding.dday !== "마감" ? `D-${funding.dday}` : funding.dday;

  // 컨트롤러 모달 열고 닫기 함수
  const onClick = () => {
    setController(true);
  };
  const closeModal = (event: any) => {
    event.stopPropagation();
    setController(false);
  };
  const aaa = () => {
    setController(false);
  };
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  //정산하기
  const [onGoing, setOnGoing] = useState(false);

  const settlement = () => {
    setOnGoing(true);
    settlementFunding(
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
    setOnGoing(false);
  };

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
  return (
    <div>
      <Grid container className={style.total} onClick={onClick}>
        <Grid item xs={3}>
          <img
            src={funding.thumbnail}
            alt={funding.title}
            className={style.leftimg}
          />
          <p>{funding.state}</p>
        </Grid>
        <Grid item xs={9} className={style.rightcontent}>
          <div className={style.upcontent}>
            <div className={style.fundingcontent}>{funding.title}</div>
            <div className={style.companyname}>{funding.name}</div>
          </div>
          <div className={style.downcontent}>
            <div className={style.remaindate}>{formatDday}</div>
            <ProgressBar percent={percent || 0} />
            <div className={style.accountdetail}>
              <div className={style.nowaccount}>
                총 모인 금액:{funding.totalFunding}원
              </div>
              <div className={style.fundingpercent}>{percent}%</div>
            </div>
          </div>
        </Grid>
        {controller && funding.state !== "READY" && funding.state !== "ING" && (
          <div className={`${style.clicked} ${controller && style.animate}`}>
            <button className={style.iconButton} onClick={closeModal}>
              <Icon icon={"bi-chevron-double-right"} />
            </button>
            <button
              className={style.settlement}
              onClick={settlement}
              disabled={funding.state === "SETTLE"}
            >
              정산하기
            </button>
            <button
              className={style.report}
              disabled={funding.state === "END"}
              onClick={openReportModal}
            >
              보고서
            </button>
          </div>
        )}
        {modalOpen && (
          <ReportModal
            cM={setModalOpen}
            fundingId={funding.fundingId}
            cC={setController}
          />
        )}
      </Grid>
      {onGoing && <LoadingSpinner />}
    </div>
  );
};

export default FundingListItem;
