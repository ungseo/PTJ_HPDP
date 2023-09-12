package com.stn.hpdp.controller.member;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.jwt.JwtFilter;
import com.stn.hpdp.common.jwt.TokenProvider;
import com.stn.hpdp.controller.member.Request.SignInReq;
import com.stn.hpdp.controller.member.Request.SignUpReq;
import com.stn.hpdp.controller.member.Response.TokenRes;
import com.stn.hpdp.service.member.MemberService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;

@RestController
@RequestMapping("/api/members")
@Api
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public MemberController(MemberService memberService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.memberService = memberService;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }


    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/members");
    }

    @PostMapping // 회원 가입
    public ApiResponse<Object> signup(@RequestBody SignUpReq signUpReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return ApiResponse.ok(memberService.signup(signUpReq));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenRes> authorize(@RequestBody SignInReq singInReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(singInReq.getLoginId(), singInReq.getLoginPw());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return new ResponseEntity<>(new TokenRes(jwt), httpHeaders, HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')") // 모든 권한이 조회 가능
    public ApiResponse<Object> getMyUserInfo(HttpServletRequest request) {
        return ApiResponse.ok(memberService.getMyUserWithAuthorities());
    }

    @GetMapping("/{memberId}")
    @PreAuthorize("hasAnyRole('ADMIN')") // admin 권한만 memberId 조회 가능
    public ApiResponse<Object> getUserInfo(@PathVariable String memberId) {
        return ApiResponse.ok(memberService.getUserWithAuthorities(memberId));
    }
}