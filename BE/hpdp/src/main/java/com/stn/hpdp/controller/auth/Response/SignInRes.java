package com.stn.hpdp.controller.auth.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class SignInRes {
    private String name;
}
