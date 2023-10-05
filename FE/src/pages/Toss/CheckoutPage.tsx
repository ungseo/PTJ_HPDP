import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
const clientKey = "test_ck_AQ92ymxN349Yn4oGL7jVajRKXvdk";
const customerKey = "mKAxcIjSKLI7-kXW5uk-1";

export function CheckoutPage({}) {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [price, setPrice] = useState(0);
  const onChange = (event: any) => {
    setPrice(event?.target.value);
  };
  useEffect(() => {
    (async () => {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
      // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제

      // ------  결제위젯 렌더링 ------
      // 결제수단 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
      // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: price },
        { variantKey: "DEFAULT" } // 렌더링하고 싶은 결제 UI의 variantKey
      );

      // ------  이용약관 렌더링 ------
      // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      paymentWidget.renderAgreement("#agreement");

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);
  const userInfo = useSelector((state: any) => state.user.info);

  return (
    <div>
      <h1>주문서</h1>
      <span>충전할 포인트</span>
      <input type="text" value={price} onChange={onChange} />P<div></div>
      <div id="payment-widget" />
      <div id="agreement" />
      <span>충전금액 : {price}원</span>
      <br />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: "포인트 충전",
              customerName: `${userInfo.name}`,
              customerEmail: `${userInfo.email}`,
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (error) {
            // 에러 처리하기
            console.error(error);
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
}
