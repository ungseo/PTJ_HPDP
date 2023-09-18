package com.stn.hpdp.controller.company;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.service.company.CompanyService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.START;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/companies")
@RestController
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("") // 아이디 중복 체크
    public ApiResponse<Object> findCompanies(@RequestParam(required = false, name = "keyword") String keyword, HttpServletRequest request) {

        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindCompanyRes> result = companyService.findCompanies(keyword, request);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }
}
