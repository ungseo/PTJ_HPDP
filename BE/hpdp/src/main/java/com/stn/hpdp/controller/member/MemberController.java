package com.stn.hpdp.controller.member;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.controller.member.Request.ReissueReq;
import com.stn.hpdp.controller.member.Request.SignInReq;
import com.stn.hpdp.controller.member.Request.SignUpReq;
import com.stn.hpdp.service.member.MemberService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;
//    @PostMapping("/test-redirect")
//    public void testRedirect(HttpServletResponse response) throws IOException {
//        response.sendRedirect("/api/members");
//    }

    @PostMapping
    public ApiResponse<Object> signUp(@Validated @RequestBody SignUpReq signUpReq, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        return memberService.signUp(signUpReq);
    }

    @PostMapping("/login")
    public ApiResponse<Object> login(@Validated @RequestBody SignInReq signInReq, HttpServletResponse response, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        return memberService.signIn(signInReq, response);
    }

    @PostMapping("/regenerate")
    public ApiResponse<Object> regenerate(@Validated @RequestBody ReissueReq reissueReq, HttpServletResponse response, Errors errors) {
        // validation check
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return memberService.regenerate(reissueReq, response);
    }

    @PostMapping("/logout")
    public ApiResponse<Object> logout(HttpServletRequest request) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return memberService.signOut(request);
    }

    @GetMapping("/authority")
    public ApiResponse<Object> authority() {
        log.info("ADD ROLE_ADMIN");
        return memberService.authority();
    }

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
}