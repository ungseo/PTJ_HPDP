package com.stn.hpdp.controller.point;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.point.request.FundingByPointReq;
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

    @PostMapping
    public ApiResponse<Object> funding(@RequestBody FundingByPointReq fundingByPointReq) {
        log.info("funding start");
        pointService.fundingCheck(fundingByPointReq.getSponsorPoint());
        pointService.funding(fundingByPointReq);
        return ApiResponse.messageOk("Success");
    }

}
