package com.stn.hpdp.controller.member;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.service.member.MemberService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
}