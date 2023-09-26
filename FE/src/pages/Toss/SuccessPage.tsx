import { useSearchParams } from "react-router-dom";
import { createPayments } from "../../api/payments";
import { useEffect, useState } from "react";
import { InCreatePaymentsInterface } from "../../interface/apiDataInterface";
import { useSelector } from "react-redux";
import axios from "axios";
export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [d, setD] = useState("");
  // Back에 API쏘기
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  useEffect(() => {
    const data = {
      amount: searchParams.get("amount"),
      orderId: searchParams.get("orderId"),
      paymentKey: searchParams.get("paymentKey"),
    };
    const headers = {
      Authorization:
        "Basic dGVzdF9za182YkpYbWdvMjhlZEJLb3l3anFFckxBbkdLV3g0Og==",
    };
    alert(data);
    const confirmPayments = () => {
      axios
        .post(`https://api.tosspayments.com/v1/payments/confirm`, data, {
          headers,
        })
        .then((res) => {
          setD(res.data.data);
          console.log(res.data.data);
          alert("결제성공");
        })
        .catch((err) => alert(err));
    };
    confirmPayments();
  }, []);

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
      <div>{searchParams}</div>
    </div>
  );
}
