import { useSelector } from "react-redux";
import MyWallet from "./MyWallet";
import ProfileItemList from "./ProfileItemList";
import { useEffect, useState } from "react";
import { getAccount } from "../../api/bank";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/account-slice";

const LoginInfo = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const dispatch = useDispatch();

  const tt = useSelector((state: any) => state.account.isRegistered)
  console.log('확인합시다', tt)

  console.log()

  useEffect(() => {
    const getAccountInfo = () => {
      getAccount(
        accessToken,
        (res) => {
          dispatch(accountActions.registerAccount(res.data.data));
        },
        (err) => {
          // 404 error only
          console.log(err)
        }
      )
    }
    getAccountInfo();
  }, []);

  return (
    <div>
      <MyWallet />
      <ProfileItemList />
    </div>
  );
};

export default LoginInfo;
