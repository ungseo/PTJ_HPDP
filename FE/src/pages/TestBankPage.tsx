import { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import TestWallet from "../components/testbank/TestWallet";
import TransactionList from "../components/testbank/TransactionList";
import TestWalletRegistration from "./../components/testbank/TestWalletRegistration";
import { useSelector } from "react-redux";
import { getAccount } from "../api/banks";
import { useDispatch } from "react-redux";
import { accountActions } from "../store/account-slice";
import LoadingSpinner from "../components/common/LoadingSpinner";

const TestBankPage = () => {
  const dispatch = useDispatch();
  const isRegistered = useSelector((state: any) => state.account.isRegistered);
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAccount(
      accessToken,
      (res) => {
        dispatch(accountActions.registerAccount(res.data.data));
        setLoading(false);
      },
      (err) => {
        // 404 error only
        console.log(err);
        setLoading(false);
      }
    );
  }, []);
  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <OptionTopbar text="test bank" />
      {isRegistered ? (
        <div style={{ padding: "1.5rem" }}>
          <TestWallet />
          <TransactionList />
        </div>
      ) : (
        <div style={{ padding: "1.5rem" }}>
          <TestWalletRegistration />
        </div>
      )}
    </div>
  );
};

export default TestBankPage;
