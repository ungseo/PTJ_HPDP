package com.stn.hpdp.controller.member;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.controller.member.request.MemberUpdateReq;
import com.stn.hpdp.service.member.MemberService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    @GetMapping("/userTest")
    public ApiResponse<Object> userTest() {
        log.info("ROLE_USER TEST");
        return ApiResponse.ok(null);
    }

    @GetMapping("/adminTest")
    public ApiResponse<Object> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return ApiResponse.ok(null);
    }
    @GetMapping // 사용자 정보 조회
    public ApiResponse<Object> getMemberInfo() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        return ApiResponse.ok(memberService.getMemberInfo());
    }

    @PutMapping // 사용자 정보 수정
    public ApiResponse<Object> updateMemberInfo(@Validated @RequestBody MemberUpdateReq memberUpdateReq, Errors errors) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("error message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        return ApiResponse.ok(memberService.updateMemberInfo(memberUpdateReq));
    }
}