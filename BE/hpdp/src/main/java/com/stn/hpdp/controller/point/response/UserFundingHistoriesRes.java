package com.stn.hpdp.controller.point.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserFundingHistoriesRes {

    private List<FundingHistoryRes> fundingHistoryResList;

    private int totalPrice;

    @Builder
    public UserFundingHistoriesRes(List<FundingHistoryRes> fundingHistoryResList, int totalPrice) {
        this.fundingHistoryResList = fundingHistoryResList;
        this.totalPrice = totalPrice;
    }
}
