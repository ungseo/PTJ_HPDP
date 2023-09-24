package com.stn.hpdp.controller.point;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.controller.point.request.FundingByPointReq;
import com.stn.hpdp.service.blockchain.CrowdFundingService;
import com.stn.hpdp.service.point.PointQueryService;
import com.stn.hpdp.service.point.PointService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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

        pointService.funding(fundingByPointReq);
        return ApiResponse.messageOk("Success");
    }

}
