import { useSelector } from "react-redux";
import MyWallet from "./MyWallet";
import ProfileItemList from "./ProfileItemList";
import { useEffect } from "react";
import { getAccount } from "../../api/banks";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/account-slice";

const LoginInfo = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const dispatch = useDispatch();

  const isRegistered = useSelector((state: any) => state.account.isRegistered)
  console.log('계좌 등록', isRegistered)

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <MyWallet />
      <ProfileItemList />
    </div>
  );
};

export default LoginInfo;
