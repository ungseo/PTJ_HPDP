package com.stn.hpdp.controller.member.Request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingInReq {
    @NotNull
    @Size(min = 3, max = 50)
    private String loginId;
    @NotNull
    @Size(min = 3, max = 50)
    private String loginPw;
}
