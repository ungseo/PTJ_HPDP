package com.stn.hpdp.controller.auth;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.controller.auth.request.SignUpCompanyReq;
import com.stn.hpdp.controller.auth.request.ReissueReq;
import com.stn.hpdp.controller.auth.request.SignInReq;
import com.stn.hpdp.controller.auth.request.SignUpReq;
import com.stn.hpdp.service.auth.AuthService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;
@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;

    @PostMapping // 개인 회원가입
    public ApiResponse<Object> signUp(@Validated @RequestBody SignUpReq signUpReq, Errors errors) {
        // validation check
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return authService.signUp(signUpReq);
    }

    @PostMapping("/company") // 기업 회원가입
    public ApiResponse<Object> signUpCompany(@ModelAttribute SignUpCompanyReq signUpReq, Errors errors) {
        // validation check
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return authService.signUpCompany(signUpReq);
    }

    @PostMapping("/login") // 로그인
    public ApiResponse<Object> signIn(@Validated @RequestBody SignInReq signInReq, HttpServletResponse response, Errors errors
    ,@RequestParam(name = "type", required = false, defaultValue = "0") int type) {
        // validation check
        log.info(logCurrent(getClassName(), getMethodName(), START));

        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }

        if(type == 0) {
            log.info(logCurrent(getClassName(), getMethodName(), END));
            return authService.signIn(signInReq, response);
        } else {
            log.info(logCurrent(getClassName(), getMethodName(), END));
            return authService.signInCompany(signInReq, response);
        }
    }

    @GetMapping("/check/{loginId}") // 아이디 중복 체크
    public ApiResponse<Object> checkLoginId(@PathVariable("loginId") String loginId) {
        return authService.checkLoginId(loginId);
    }

    @PostMapping("/regenerate") // Access Token 재발굽
    public ApiResponse<Object> regenerate(@Validated @RequestBody ReissueReq reissueReq, HttpServletResponse response, Errors errors) {
        // validation check
        log.info(logCurrent(getClassName(), getMethodName(), START));
        if (errors.hasErrors()) {
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return authService.regenerate(reissueReq, response);
    }

    @PostMapping("/logout") // 로그아웃
    public ApiResponse<Object> signOut(HttpServletRequest request) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return authService.signOut(request);
    }

    @GetMapping("/authority") // admin 권한 추가
    public ApiResponse<Object> authority() {
        log.info("ADD ROLE_ADMIN");
        return authService.authority();
    }
}
