package com.stn.hpdp.controller.funding.response;

import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Funding;
import lombok.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindFundingRes {

    private Long companyId;
    private String name;
    private String profileImg;
    private Long fundingId;
    private String title;
    private String thumbnail;
    private String content;
    private String hashtag;
    private int targetAmount;
    private String startDate;
    private String endDate;
    private String dDay;
    private int totalFunding;
    private String rewardName;
    private int rewardPrice;
    private String rewardDesc;
    private String rewardImg;
    private FundingState state;
    private int settlement;
    private int percent;

    private List<Budget> budgetList = new ArrayList<>();

    public static FindFundingRes of(Funding funding, List<Budget> budgets){
        return FindFundingRes.builder()
                .companyId(funding.getCompany().getId())
                .name(funding.getCompany().getName())
                .profileImg(funding.getCompany().getProfile())
                .fundingId(funding.getId())
                .title(funding.getTitle())
                .thumbnail(funding.getThumbnailUrl())
                .content(funding.getContentUrl())
                .hashtag(funding.getHashtag())
                .targetAmount(funding.getTargetAmount())
                .startDate(funding.getStartDate().toString())
                .endDate(funding.getEndDate().toString())
                .rewardName(funding.getRewardName())
                .rewardPrice(funding.getRewardPrice())
                .rewardDesc(funding.getRewardDesc())
                .rewardImg(funding.getRewardImg())
                .state(funding.getState())
                .settlement(funding.getSettlement())
                .budgetList(budgets)
                .dDay(funding.getEndDate().isAfter(LocalDateTime.now()) ? Long.toString(ChronoUnit.DAYS.between(LocalDateTime.now(), funding.getEndDate())) : "마감")
                .build();
    }
}
