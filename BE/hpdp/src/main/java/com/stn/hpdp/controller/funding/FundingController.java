package com.stn.hpdp.controller.funding;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.funding.request.ReportFundingReq;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.controller.funding.request.SettleFundingReq;
import com.stn.hpdp.controller.funding.request.UpdateFundingReq;
import com.stn.hpdp.controller.funding.response.*;
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
@RequestMapping("/api/fundings")
@RestController
public class FundingController {

    private final FundingService fundingService;
    private final FundingQueryService fundingQueryService;
    private final CrowdFundingService crowdFundingService;

    @PostMapping("") // 펀딩 작성
    public ApiResponse<Object> saveFunding(@ModelAttribute SaveFundingReq saveFundingReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        FundingInfoForContractDTO fundingInfo = fundingService.saveFunding(saveFundingReq);

        crowdFundingService.createFunding(fundingInfo);

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
    public ApiResponse<Object> findFundings(@RequestParam(required = false, name = "companyId") Long companyId, @RequestParam(required = false, name = "done") Integer done, @RequestParam(required = false, name = "keyword") String keyword) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindFundingsRes> result = fundingQueryService.findFundings(companyId, done, keyword);
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

    @GetMapping("/participant/{fundingId}") // 펀딩 참여자 목록 조회
    public ApiResponse<Object> findParticipant(@PathVariable("fundingId") Long fundingId) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindParticipantRes> result = fundingQueryService.findParticipant(fundingId);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @GetMapping("/recommend/deadline") // 펀딩 조회(마감임박순 5개)
    public ApiResponse<Object> recommendDeadlineFundings() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<RecommendFundingsRes> result = fundingQueryService.recommendDeadlineFundings();
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @GetMapping("/recommend/achievement") // 펀딩 조회(달성도가 높은 순 5개)
    public ApiResponse<Object> recommendAchievementFundings() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<RecommendFundingsRes> result = fundingQueryService.recommendAchievementFundings();
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @PostMapping("/settle") // 펀딩 정산하기
    public ApiResponse<Object> settleFunding(@RequestBody SettleFundingReq settleFundingReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        SettleFundingRes settleFundingRes = fundingService.settleFunding(settleFundingReq);

        crowdFundingService.settle(settleFundingReq.getFundingId());


        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.ok(settleFundingRes);
    }

    @PostMapping("/report") // 펀딩 보고서 등록
    public ApiResponse<Object> reportFunding(@ModelAttribute ReportFundingReq reportFundingReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        fundingService.reportFunding(reportFundingReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("Success");
    }
}
