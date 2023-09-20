package com.stn.hpdp.controller.payment;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.payment.request.SavePaymentReq;
import com.stn.hpdp.service.payment.PaymentService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;
@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/payments")
@RestController
public class PaymentController {
    private final PaymentService paymentService;
    @PostMapping() // 결제 결과 등록
    public ApiResponse<Object> updateMemberInfo(@Validated @RequestBody SavePaymentReq savePaymentReq, Errors errors) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("error message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        paymentService.savePayment(savePaymentReq);
        return ApiResponse.messageOk("결제 결과 등록에 성공했습니다.");
    }
}