package com.stn.hpdp.controller.member.response;

import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.model.entity.Funding;
import lombok.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@ToString
@Builder
public class FindMemberFundingRes {

    private Long companyId;
    private String name;
    private Long fundingId;
    private String thumbnail;
    private String hashtag;
    private String title;
    private int targetAmount;
    private String startDate;
    private String endDate;
    private FundingState state;
    private String dDay;
    private int totalFunding;

    public static FindMemberFundingRes of(Funding funding) {
        return FindMemberFundingRes.builder()
                .companyId(funding.getCompany().getId())
                .name(funding.getCompany().getName())
                .fundingId(funding.getId())
                .title(funding.getTitle())
                .thumbnail(funding.getThumbnailUrl())
                .hashtag(funding.getHashtag())
                .targetAmount(funding.getTargetAmount())
                .startDate(funding.getStartDate().toString())
                .endDate(funding.getEndDate().toString())
                .state(funding.getState())
                .dDay(funding.getEndDate().isAfter(LocalDateTime.now()) ? Long.toString(ChronoUnit.DAYS.between(LocalDateTime.now(), funding.getEndDate())) : "마감")
                .build();
    }
}
