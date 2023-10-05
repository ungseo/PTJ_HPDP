package com.stn.hpdp.controller.auth.request;

import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotEmpty;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SignInReq {

    @NotEmpty(message = "아이디는 필수 입력값입니다.")
    private String loginId;

    @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
    private String loginPw;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(loginId, loginPw);
    }
}
