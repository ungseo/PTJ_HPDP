package com.stn.hpdp.controller.funding;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.bank.request.TransferAccountReq;
import com.stn.hpdp.controller.bank.response.FindAccountRes;
import com.stn.hpdp.controller.bank.response.FindTransferRes;
import com.stn.hpdp.controller.bank.response.TransferAccountRes;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.service.funding.FundingService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/fundings")
@RestController
public class FundingController {

    private final FundingService fundingService;

    @PostMapping("") // 펀딩 작성
    public ApiResponse<Object> saveFunding(@Validated @RequestBody SaveFundingReq saveFundingReq, Errors errors) {
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

        fundingService.saveFunding(saveFundingReq);
        return ApiResponse.messageOk("Success");
    }
}
