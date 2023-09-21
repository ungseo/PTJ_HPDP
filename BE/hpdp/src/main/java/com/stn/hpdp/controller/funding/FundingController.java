package com.stn.hpdp.controller.funding;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.controller.funding.request.UpdateFundingReq;
import com.stn.hpdp.controller.funding.response.FindFundingRes;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.service.funding.FundingQueryService;
import com.stn.hpdp.service.funding.FundingService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/fundings")
@RestController
public class FundingController {

    private final FundingService fundingService;
    private final FundingQueryService fundingQueryService;

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

    @DeleteMapping("/{fundingId}") // 펀딩 삭제
    public ApiResponse<Object> deleteFunding(@PathVariable("fundingId") Long fundingId) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        fundingService.deleteFunding(fundingId);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("Success");
    }

    @GetMapping("") // 펀딩 조회
    public ApiResponse<Object> findFundings(@RequestParam(required = false, name = "companyId") Long companyId, @RequestParam(required = false, name = "done") Integer done) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindFundingsRes> result = fundingQueryService.findFundings(companyId, done);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @GetMapping("/{fundingId}") // 펀딩 상세 조회
    public ApiResponse<Object> findFunding(@PathVariable("fundingId") Long fundingId) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        FindFundingRes result = fundingQueryService.findFunding(fundingId);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }
}
