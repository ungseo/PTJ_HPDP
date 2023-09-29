package com.stn.hpdp.controller.main;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.main.response.FindMainInfoRes;
import com.stn.hpdp.service.main.MainQueryService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/main")
@RestController
public class MainController {

    private final MainQueryService mainQueryService;

    @GetMapping("") // 메인페이지 정보
    public ApiResponse<Object> findMainInfo() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        FindMainInfoRes result = mainQueryService.findMainInfo();
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }
}
