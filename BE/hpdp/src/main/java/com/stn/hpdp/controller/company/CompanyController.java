package com.stn.hpdp.controller.company;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.company.request.UpdateCompanyReq;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.controller.company.response.FindMyCompanyRes;
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

    @GetMapping("") // 기업 조회
    public ApiResponse<Object> findCompanies(@RequestParam(required = false, name = "keyword") String keyword, HttpServletRequest request) {

        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindCompanyRes> result = companyService.findCompanies(keyword, request);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @GetMapping("/{companyId}") // 기업 상세 조회
    public ApiResponse<Object> findCompany(@PathVariable("companyId") Long companyId, HttpServletRequest request) {

        log.info(logCurrent(getClassName(), getMethodName(), START));
        FindCompanyDetailRes result = companyService.findCompany(companyId, request);
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }

    @GetMapping("/info") // 내 정보 조회(기업)
    public ApiResponse<Object> findMyCompany() {

        log.info(logCurrent(getClassName(), getMethodName(), START));

        FindMyCompanyRes result = companyService.findMyCompany();

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.ok(result);
    }

    @PutMapping("") // 내 정보 수정(기업)
    public ApiResponse<Object> updateMyCompany(@ModelAttribute UpdateCompanyReq updateCompanyReq) {

        log.info(logCurrent(getClassName(), getMethodName(), START));

        companyService.updateMyCompany(updateCompanyReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("success");
    }
}
