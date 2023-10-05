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
public class FindMyCompanyRes {
    private Long companyId;
    private String loginId;
    private String profile;
    private String banner;
    private String name;
    private String hashtag;
    private String email;
    private String phoneNumber;
    private String address;
    private String registrationNumber;
    private String websiteUrl;
    private String introduce;
    private String createdDate;
    private String modifiedDate;
    private int point;

    public static FindMyCompanyRes from(Company company) {
        return FindMyCompanyRes.builder()
                .companyId(company.getId())
                .loginId(company.getLoginId())
                .profile(company.getProfile())
                .banner(company.getBanner())
                .name(company.getName())
                .hashtag(company.getHashtag())
                .email(company.getEmail())
                .phoneNumber(company.getPhoneNumber())
                .address(company.getAddress())
                .registrationNumber(company.getRegistrationNumber())
                .websiteUrl(company.getWebsiteUrl())
                .introduce(company.getIntroduce())
                .createdDate(String.valueOf(company.getCreatedDate()))
                .modifiedDate(String.valueOf(company.getModifiedDate()))
                .point(company.getPoint())
                .build();
    }
}
