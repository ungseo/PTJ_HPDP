package com.stn.hpdp.controller.company.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class FindCompanyRes {
    private Long companyId;
    private String profile;
    private String name;
    private String hashtag;
//    private boolean isInterested = false;
}
