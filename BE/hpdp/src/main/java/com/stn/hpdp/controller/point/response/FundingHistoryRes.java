package com.stn.hpdp.controller.point.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class FundingHistoryRes {

    private Long fundingId;
    private String title;
    private int price;
    private String paymentDate;


    @Builder
    public FundingHistoryRes(Long fundingId, String title, int price, LocalDateTime paymentDate) {
        this.fundingId = fundingId;
        this.title = title;
        this.price = price;
        this.paymentDate = String.valueOf(paymentDate);
    }
}
