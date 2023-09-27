import { useNavigate, useSearchParams } from "react-router-dom";
import { createPayments } from "../../api/payments";
import { useEffect, useState } from "react";
import { InCreatePaymentsInterface } from "../../interface/apiDataInterface";
import { useSelector } from "react-redux";
import axios from "axios";
import DeepBlueBtn from "../../components/common/DeepBlueBtn";
export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Back에 API쏘기
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const onClick = () => {
    navigate("/profile");
  };
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
    const confirmPayments = () => {
      axios
        .post(`https://api.tosspayments.com/v1/payments/confirm`, data, {
          headers,
        })
        .then((res) => {
          const data = {
            accessToken,
            cardCode: res.data.card,
            amount: res.data.amount,
          };
          console.log(res);
          createPayments(
            data,
            (res) => {
              alert("결제에 성공했습니다!");
            },
            (err) => {
              alert(err.message);
            }
          );
        })
        .catch((err) => {});
    };
    confirmPayments();
  }, []);

  return (
    <div>
      <h1>결제 성공</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          marginTop: "35vh",
        }}
      >
        <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
        <div>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</div>
        <DeepBlueBtn
          text="결제완료"
          styles={{ width: "80%", height: "3rem" }}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
