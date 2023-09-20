package com.stn.hpdp.controller.funding;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.controller.funding.request.UpdateFundingReq;
import com.stn.hpdp.service.funding.FundingService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/fundings")
@RestController
public class FundingController {

    private final FundingService fundingService;

    @PostMapping("") // 펀딩 작성
    public ApiResponse<Object> saveFunding(@ModelAttribute SaveFundingReq saveFundingReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        fundingService.saveFunding(saveFundingReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("Success");
    }

    @PutMapping("") // 펀딩 수정
    public ApiResponse<Object> updateFunding(@ModelAttribute UpdateFundingReq updateFundingReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        fundingService.updateFunding(updateFundingReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("Success");
    }
}
