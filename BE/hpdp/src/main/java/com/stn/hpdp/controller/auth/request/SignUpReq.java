package com.stn.hpdp.controller.auth.request;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SignUpReq {
    @NotEmpty(message = "아이디는 필수 입력값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9_-]{2,10}$", message = "아이디 형식에 맞지 않습니다.")
    private String loginId;

    @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=]).{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    private String loginPw;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    @Pattern(regexp = "^\\d{3}-\\d{3,4}-\\d{4}$", message = "휴대폰 번호 형식에 맞지 않습니다.")
    private String phoneNumber;

    @Pattern(regexp = "^([A-Za-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$", message = "이메일 형식에 맞지 않습니다.")
    private String email;

    private String address;
}