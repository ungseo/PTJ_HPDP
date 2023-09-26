package com.stn.hpdp.controller.point;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.controller.point.request.FundingByPointReq;
import com.stn.hpdp.controller.point.response.FundingHistoryRes;
import com.stn.hpdp.controller.point.response.PointHistoryRes;
import com.stn.hpdp.controller.point.response.UserFundingHistoriesRes;
import com.stn.hpdp.controller.point.response.UserPointHistoriesRes;
import com.stn.hpdp.service.blockchain.CrowdFundingService;
import com.stn.hpdp.service.point.PointQueryService;
import com.stn.hpdp.service.point.PointService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/points")
public class PointController {

    private final PointService pointService;
    private final PointQueryService pointQueryService;
    private final CrowdFundingService crowdFundingService;

    @PostMapping
    public ApiResponse<Object> funding(@RequestBody FundingByPointReq fundingByPointReq) {
        // 펀딩 실패
        if (!pointService.fundingCheck(fundingByPointReq.getSponsorPoint()))
            throw new CustomException(ErrorCode.SCARCE_POINT_BAD_REQUEST);
        crowdFundingService.fundingAsyn(fundingByPointReq);
        pointService.funding(fundingByPointReq);
        return ApiResponse.messageOk("Success");
    }

    @GetMapping
    public ApiResponse<Integer> getPoint() {
        return ApiResponse.ok(pointService.getMemberPoint());
    }


    @GetMapping("/user")
    public ApiResponse<UserFundingHistoriesRes> getFundingHistories() {
        // 후원 내역 조회
        List<FundingHistoryRes> histories = pointQueryService.getFundingHistories();
        // 총 금액 조회
        int totalPrice = pointQueryService.getTotalPrice();
        return ApiResponse.ok(UserFundingHistoriesRes.builder()
                .fundingHistoryResList(histories)
                .totalPrice(totalPrice).build());
    }

    @GetMapping("/trade")
    public ApiResponse<UserPointHistoriesRes> getPointHistories() {
        // 포인트 내역 조회
        List<PointHistoryRes> histories = pointQueryService.getPointHistories();
        // 잔액 조회
        int balance = pointService.getMemberPoint();
        int totalFundingAmount = pointQueryService.getTotalFundingAmount();
        return ApiResponse.ok(UserPointHistoriesRes.builder()
                .pointHistoryResList(histories)
                .totalFundingAmount(totalFundingAmount)
                .balance(balance)
                .build());
    }

}
