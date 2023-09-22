package com.stn.hpdp.controller.member.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UpdateMemberReq {

    private MultipartFile profile;

    @Size(min = 2, max = 50)
    private String name;

    @Pattern(regexp = "^\\d{3}-\\d{3,4}-\\d{4}$", message = "휴대폰 번호 형식에 맞지 않습니다.")
    private String phoneNumber;

    @Pattern(regexp = "^([A-Za-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$", message = "이메일 형식에 맞지 않습니다.")
    private String email;
}