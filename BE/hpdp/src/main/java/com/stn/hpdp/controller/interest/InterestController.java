package com.stn.hpdp.controller.interest;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.interest.response.FindInterestRes;
import com.stn.hpdp.service.interest.InterestService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/interests")
@RestController
public class InterestController {

    private final InterestService interestService;

    @GetMapping // 관심기업 조회
    public ApiResponse<Object> findInterests() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindInterestRes> result = interestService.findInterests();
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @PostMapping("/{companyId}") // 관심기업 등록
    public ApiResponse<Object> saveInterest(@PathVariable("companyId") Long companyId, HttpServletRequest request) {

        log.info(logCurrent(getClassName(), getMethodName(), START));

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(null);
    }

    @DeleteMapping("/{companyId}") // 관심기업 삭제
    public ApiResponse<Object> deleteInterest(@PathVariable("companyId") Long companyId, HttpServletRequest request) {

        log.info(logCurrent(getClassName(), getMethodName(), START));

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(null);
    }
}
