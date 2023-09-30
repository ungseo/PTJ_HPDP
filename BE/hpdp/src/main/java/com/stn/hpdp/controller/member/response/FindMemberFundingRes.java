package com.stn.hpdp.controller.member.response;

import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.model.entity.Funding;
import lombok.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@ToString
public class FindMemberFundingRes extends FindFundingsRes {

    private int myTotalFunding;
    private boolean myReward;
    private String rewardName;
    private int rewardPrice;
    @Builder
    public FindMemberFundingRes(int myTotalFunding, boolean myReward, String rewardName, int rewardPrice,
                                Long companyId, String name, Long fundingId, String thumbnail, String hashtag, String title, int targetAmount, int totalFunding,
                                int percent, LocalDateTime startDate, LocalDateTime endDate, FundingState state) {
        super(companyId, name, fundingId, thumbnail, hashtag, title, targetAmount, totalFunding, percent, startDate, endDate, state);
        this.myTotalFunding = myTotalFunding;
        this.myReward = myReward;
        this.rewardName = rewardName;
        this.rewardPrice = rewardPrice;
    }
}
