package com.stn.hpdp.controller.member.response;

import com.stn.hpdp.model.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class FindMemberInfoRes {

    private Long memberId;

    private String loginId;

    private String name;

    private String phoneNumber;

    private String email;

    private String address;

    private int point;

    private String profile;

    private String createdDate;

    private String modifiedDate;

    public static FindMemberInfoRes of(Member member) {
        if (member == null) return null;

        return FindMemberInfoRes.builder()
                .memberId(member.getId())
                .loginId(member.getLoginId())
                .name(member.getName())
                .address(member.getAddress())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .point(member.getPoint())
                .profile(member.getProfile())
                .createdDate(String.valueOf(member.getCreatedDate()))
                .modifiedDate(String.valueOf(member.getModifiedDate()))
                .build();
    }

}
