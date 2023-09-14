package com.stn.hpdp.controller.member.Request;

import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignInReq {

    @NotEmpty(message = "아이디는 필수 입력값입니다.")
    private String loginId;

    @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
    private String loginPw;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(loginId, loginPw);
    }
}
