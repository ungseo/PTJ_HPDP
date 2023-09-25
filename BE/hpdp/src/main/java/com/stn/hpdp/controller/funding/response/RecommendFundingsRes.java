package com.stn.hpdp.controller.funding.response;

import com.stn.hpdp.common.enums.FundingState;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@ToString
public class RecommendFundingsRes {

    private Long companyId;
    private String name;
    private Long fundingId;
    private String thumbnail;
    private String title;
    private String endDate;
    private String dDay;
    private int totalFunding;
    private int percent;

    public RecommendFundingsRes(Long companyId, String name, Long fundingId, String thumbnail, String title, LocalDateTime endDate){
        this.companyId = companyId;
        this.name = name;
        this.fundingId = fundingId;
        this.thumbnail = thumbnail;
        this.title = title;
        this.endDate = endDate.toString();
        if(endDate.isAfter(LocalDateTime.now())){
            this.dDay = Long.toString(ChronoUnit.DAYS.between(LocalDateTime.now(), endDate));
        }else{
            this.dDay = "마감";
        }
    }
}
