import { useSearchParams } from "react-router-dom";
import { createPayments } from "../../api/payments";
import { useEffect } from "react";
import { InCreatePaymentsInterface } from "../../interface/apiDataInterface";
import { useSelector } from "react-redux";
export function SuccessPage() {
  const [searchParams] = useSearchParams();
  // Back에 API쏘기
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  useEffect(() => {
    const data: InCreatePaymentsInterface = {
      header: {
        accessToken,
      },
      body: {
        amount: searchParams.get("amount"),
      },
    };

    createPayments(
      data,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
    </div>
  );
}
