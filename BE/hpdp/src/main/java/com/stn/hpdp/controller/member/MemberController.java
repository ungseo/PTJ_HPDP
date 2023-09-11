package com.stn.hpdp.controller.member;

import com.stn.hpdp.common.jwt.JwtFilter;
import com.stn.hpdp.common.jwt.TokenProvider;
import com.stn.hpdp.controller.member.Request.SingInReq;
import com.stn.hpdp.controller.member.Response.TokenRes;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.stn.hpdp.common.util.LogCurrent.*;

@RestController
@RequestMapping("/api/members")
@Api
@Slf4j
public class MemberController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public MemberController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenRes> authorize(@RequestBody SingInReq singInReq) {
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
}
