package com.stn.hpdp.dto;
import lombok.Data;

@Data
public class FundingHistoryInfoForFundingDTO {
    private int myTotalFunding;
    private boolean myReward;
    public FundingHistoryInfoForFundingDTO(int myTotalFunding, boolean myReward) {
        this.myTotalFunding = myTotalFunding;
        this.myReward = myReward;
    }
}
