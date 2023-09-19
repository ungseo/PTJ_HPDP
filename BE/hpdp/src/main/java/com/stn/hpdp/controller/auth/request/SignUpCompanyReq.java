package com.stn.hpdp.controller.auth.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Getter
@Setter
public class SignUpCompanyReq {

    @NotEmpty(message = "아이디는 필수 입력값입니다.")
    private String loginId;

    @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
    private String loginPw;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    @NotNull
    private String phoneNumber;

    @NotNull
    private String email;

    @NotNull
    private String address;

    @NotNull
    private String websiteUrl;

    @NotNull
    private String introduce;

    @NotNull
    private String hashtag;

    @NotNull
    private String accountNumber;

    @NotNull
    private String registrationNumber;

    private MultipartFile profile;
}