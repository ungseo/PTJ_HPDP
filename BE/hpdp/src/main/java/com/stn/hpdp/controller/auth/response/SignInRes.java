package com.stn.hpdp.controller.auth.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@ToString
public class SignInRes {
    private String name;
    private List<String> roles;
}
