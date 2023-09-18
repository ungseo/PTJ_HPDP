package com.stn.hpdp.controller.company.response;

import lombok.*;

@Getter
@Setter
//@Builder
@ToString
public class FindCompanyRes {
    private Long companyId;
    private String profile;
    private String name;
    private String hashtag;
    private boolean isInterested;

    public FindCompanyRes(Long companyId, String profile, String name, String hashtag){
        this.companyId = companyId;
        this.profile = profile;
        this.name = name;
        this.hashtag = hashtag;
        this.isInterested = false;
    }
}
