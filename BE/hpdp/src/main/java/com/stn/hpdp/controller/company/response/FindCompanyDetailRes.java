package com.stn.hpdp.controller.company.response;

import com.stn.hpdp.model.entity.Company;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class FindCompanyDetailRes {
    private Long companyId;
    private String profile;
    private String name;
    private String hashtag;
    private boolean isInterested;
    private String email;
    private String phoneNumber;
    private String address;
    private String registrationNumber;
    private String websiteUrl;
    private String introduce;
    private String createdDate;
    private int fundingsNumber;
    private int participantsNumber;
    private int amount;

    public static FindCompanyDetailRes from(Company company) {
        if(company == null) return null;

        return FindCompanyDetailRes.builder()
                .companyId(company.getId())
                .profile(company.getProfile())
                .name(company.getName())
                .hashtag(company.getHashtag())
                .email(company.getEmail())
                .phoneNumber(company.getPhoneNumber())
                .address(company.getAddress())
                .registrationNumber(company.getRegistrationNumber())
                .websiteUrl(company.getWebsiteUrl())
                .introduce(company.getIntroduce())
                .createdDate(String.valueOf(company.getCreatedDate()))
                .build();
    }
}
