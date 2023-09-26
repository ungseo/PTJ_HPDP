package com.stn.hpdp.controller.point.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserPointHistoriesRes {

    private List<PointHistoryRes> pointHistoryResList;

    private int balance;

    @Builder
    public UserPointHistoriesRes(List<PointHistoryRes> pointHistoryResList, int balance) {
        this.pointHistoryResList = pointHistoryResList;
        this.balance = balance;
    }
}
