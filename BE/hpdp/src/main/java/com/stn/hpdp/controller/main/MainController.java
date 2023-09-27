package com.stn.hpdp.controller.main;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.funding.request.ReportFundingReq;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.controller.funding.request.SettleFundingReq;
import com.stn.hpdp.controller.funding.request.UpdateFundingReq;
import com.stn.hpdp.controller.funding.response.*;
import com.stn.hpdp.controller.main.response.FindMainInfoRes;
import com.stn.hpdp.dto.FundingInfoForContractDTO;
import com.stn.hpdp.service.blockchain.CrowdFundingService;
import com.stn.hpdp.service.funding.FundingQueryService;
import com.stn.hpdp.service.funding.FundingService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/main")
@RestController
public class MainController {

//    private final FundingService fundingService;
//    private final FundingQueryService fundingQueryService;
//    private final CrowdFundingService crowdFundingService;
    @GetMapping("") // 메인페이지 정보
    public ApiResponse<Object> findMainInfo() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
//        FindMainInfoRes result = fundingQueryService.findFundings(companyId, done, keyword);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.messageOk("success");
    }
}
