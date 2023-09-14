package com.stn.hpdp.controller.member.Request;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@ToString
public class ReissueReq {
    @NotEmpty(message = "accessToken 을 입력해주세요.")
    private String accessToken;

    @NotEmpty(message = "refreshToken 을 입력해주세요.")
    private String refreshToken;
}
