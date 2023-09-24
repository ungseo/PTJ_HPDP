package com.stn.hpdp.controller.point.request;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.NotNull;

@Data
public class FundingByPointReq {

    @NonNull
    private Long fundingId;

    @NotNull
    private int sponsorPoint;

    @Builder
    public FundingByPointReq(@NonNull Long fundingId, int sponsorPoint) {
        this.fundingId = fundingId;
        this.sponsorPoint = sponsorPoint;
    }
}
