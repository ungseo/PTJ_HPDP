package com.stn.hpdp.controller.funding.response;

import com.stn.hpdp.common.enums.FundingState;
import lombok.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@ToString
public class FindFundingsRes {

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
    private int percent;

    public FindFundingsRes(Long companyId, String name, Long fundingId, String thumbnail, String hashtag, String title, int targetAmount, LocalDateTime startDate, LocalDateTime endDate, FundingState state){
        this.companyId = companyId;
        this.name = name;
        this.fundingId = fundingId;
        this.thumbnail = thumbnail;
        this.hashtag = hashtag;
        this.title = title;
        this.targetAmount = targetAmount;
        this.startDate = startDate.toString();
        this.endDate = endDate.toString();
        this.state = state;
        if(endDate.isAfter(LocalDateTime.now())){
            this.dDay = Long.toString(ChronoUnit.DAYS.between(LocalDateTime.now(), endDate));
        }else{
            this.dDay = "마감";
        }
    }
}
