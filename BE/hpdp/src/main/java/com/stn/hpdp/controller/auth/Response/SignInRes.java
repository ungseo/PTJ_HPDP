package com.stn.hpdp.controller.auth.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Builder
@ToString
public class SignInRes {
    private String name;
}
