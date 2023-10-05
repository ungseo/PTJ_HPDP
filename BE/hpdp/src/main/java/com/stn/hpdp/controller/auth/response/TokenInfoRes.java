package com.stn.hpdp.controller.auth.response;

import lombok.*;

@Getter
@ToString
@Builder
@AllArgsConstructor
public class TokenInfoRes {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long refreshTokenExpirationTime;
}