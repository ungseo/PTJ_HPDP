package com.stn.hpdp.controller.member.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stn.hpdp.controller.member.Response.AuthorityRes;
import com.stn.hpdp.model.entity.Member;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpReq {

    @NotNull
    @Size(min = 3, max = 50)
    private String loginId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String loginPw;

    @NotNull
    @Size(min = 3, max = 50)
    private String name;

    private String phoneNumber;

    private String email;

    private String address;

//    private Set<AuthorityRes> authorityDtoSet;
//
//    public static SignUpReq from(Member member) {
//        if(member == null) return null;
//
//        return SignUpReq.builder()
//                .loginId(member.getLoginId())
//                .name(member.getName())
//                .authorityDtoSet(member.getAuthorities().stream()
//                        .map(authority -> AuthorityRes.builder().authorityName(authority.getAuthorityName()).build())
//                        .collect(Collectors.toSet()))
//                .build();
//    }

}