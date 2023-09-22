package com.stn.hpdp.controller.member;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.controller.member.request.UpdateMemberPwReq;
import com.stn.hpdp.controller.member.request.UpdateMemberReq;
import com.stn.hpdp.controller.member.response.FindMemberFundingRes;
import com.stn.hpdp.service.member.MemberQueryService;
import com.stn.hpdp.service.member.MemberService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberQueryService memberQueryService;

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
        return ApiResponse.ok(memberQueryService.findMemberInfo());
    }

    @PutMapping // 사용자 정보 수정
    public ApiResponse<Object> updateMemberInfo(@ModelAttribute UpdateMemberReq memberUpdateReq, Errors errors) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e -> {
                System.out.println("error message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        return ApiResponse.ok(memberService.updateMemberInfo(memberUpdateReq));
    }

    @PutMapping("/password")// 사용자 pw 수정
    public ApiResponse<Object> updatePassword(@Validated @RequestBody UpdateMemberPwReq updateMemberPwReq, Errors errors) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e -> {
                System.out.println("error message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }

        memberService.updatePassword(updateMemberPwReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.messageOk("비밀번호 수정을 성공했습니다.");
    }

    @GetMapping("/fundings") // 사용자 펀딩 조회
    public ApiResponse<Object> findMemberFunding() {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindMemberFundingRes> result = memberQueryService.findMemberFunding();
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(result);
    }
}