import { useSelector } from "react-redux";
import MyWallet from "./MyWallet";
import MyActivity from "./MyActivity";
import { useEffect } from "react";
import { getAccount } from "../../api/banks";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/account-slice";

const ProfileActivity = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  useEffect(() => {
    getAccount(
      accessToken,
      (res) => {
        dispatch(accountActions.registerAccount(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div>
      <MyWallet />
      <MyActivity />
    </div>
  );
};

export default ProfileActivity;
