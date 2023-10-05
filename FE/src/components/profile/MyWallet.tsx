import style from "../../styles/css/MyWallet.module.css";
import { Icon } from "@iconify/react";
import DefaultButton from "../common/DefaultButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/account-slice";
import { unregisterAccount } from "../../api/banks";
import { useEffect, useState } from "react";
import { getPoint } from "../../api/points";
import { NotOkModal, OkModal } from "../common/AlertModals";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MyWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const isRegistered = useSelector((state: any) => state.account.isRegistered);

  const [userPoint, getUserPoint] = useState(0);
  const formatuserpoint = formatNumber(userPoint);
  useEffect(() => {
    getPoint(
      accessToken,
      (res) => {
        getUserPoint(res.data.data);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  const onClick = (event: any) => {
    const { id } = event.target;
    if (id === "reg") {
      navigate("/profile/testbank/register");
    } else if (id === "unreg") {
      unregisterAccount(
        accessToken,
        (res) => {
          OkModal({ title: "성공", text: "계좌가 해제 되었습니다." });
        },
        (err) => {
          NotOkModal({ title: "실패", text: "계좌해제에 실패했습니다!" });
        }
      );
      // 계좌 해제 redux
      dispatch(accountActions.unregisterAccount());
    } else if (id === "insert") {
      navigate("/payment");
    }
  };

  return (
    <div className={style.mywallet}>
      <div className={style.wrapper}>
        <p className={style.title}>포인트</p>
        <p className={style.point}>{formatuserpoint} P</p>
      </div>
      <div className={style.buttons}>
        {isRegistered ? (
          <DefaultButton
            id="unreg"
            text="계좌 해제"
            styles={{
              width: "48%",
              height: "3rem",
              borderRadius: "0.5rem",
              fontSize: "1.2rem",
            }}
            onClick={onClick}
          />
        ) : (
          <DefaultButton
            id="reg"
            text="계좌 등록"
            styles={{
              width: "48%",
              height: "3rem",
              borderRadius: "0.5rem",
              fontSize: "1.2rem",
            }}
            onClick={onClick}
          />
        )}
        <DefaultButton
          id="insert"
          text="포인트 충전"
          styles={{
            width: "48%",
            height: "3rem",
            borderRadius: "0.5rem",
            fontSize: "1.2rem",
          }}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default MyWallet;
