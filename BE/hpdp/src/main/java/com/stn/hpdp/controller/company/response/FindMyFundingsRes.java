package com.stn.hpdp.controller.company.response;

import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.model.entity.Funding;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@Builder
@ToString
public class FindMyFundingsRes {

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

    public static FindMyFundingsRes from(Funding funding){
        return FindMyFundingsRes.builder()
                .companyId(funding.getCompany().getId())
                .name(funding.getCompany().getName())
                .fundingId(funding.getId())
                .thumbnail(funding.getThumbnailUrl())
                .hashtag(funding.getHashtag())
                .title(funding.getTitle())
                .targetAmount(funding.getTargetAmount())
                .startDate(funding.getStartDate().toString())
                .endDate(funding.getEndDate().toString())
                .state(funding.getState())
                .dDay(funding.getEndDate().isAfter(LocalDateTime.now()) ? Long.toString(ChronoUnit.DAYS.between(LocalDateTime.now(), funding.getEndDate())) : "마감")
                .build();
    }
}
