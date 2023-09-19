package com.stn.hpdp.controller.bank;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.auth.request.CompanySignUpReq;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.bank.request.TransferAccountReq;
import com.stn.hpdp.controller.bank.response.FindAccountRes;
import com.stn.hpdp.controller.bank.response.TransferAccountRes;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.service.bank.BankService;
import com.stn.hpdp.service.company.CompanyService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/banks")
@RestController
public class BankController {

    private final BankService bankService;

    @PostMapping("") // 계좌 등록
    public ApiResponse<Object> saveAccount(@Validated @RequestBody SaveAccountReq saveAccountReq, Errors errors) {
        // validation check
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        log.info(logCurrent(getClassName(), getMethodName(), END));

        bankService.saveAccount(saveAccountReq);
        return ApiResponse.messageOk("Success");
    }

    @PostMapping("/account") // 계좌 조회
    public ApiResponse<Object> findAccount() {

        log.info(logCurrent(getClassName(), getMethodName(), START));

        FindAccountRes findAccountRes = bankService.findAccount();

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.ok(findAccountRes);
    }

    @PostMapping("/delete") // 계좌 연결 해제
    public ApiResponse<Object> deleteAccount() {

        log.info(logCurrent(getClassName(), getMethodName(), START));

        bankService.deleteAccount();

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("Success");
    }

    @PostMapping("/transfer") // 계좌 이체
    public ApiResponse<Object> transferAccount(@Validated @RequestBody TransferAccountReq transferAccountReq, Errors errors) {

        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }

        TransferAccountRes transferAccountRes = bankService.transferAccount(transferAccountReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.ok(transferAccountRes);
    }
}
