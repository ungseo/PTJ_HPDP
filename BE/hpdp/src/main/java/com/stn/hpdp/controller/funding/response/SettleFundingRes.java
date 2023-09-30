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
public class SettleFundingRes {

    private String title;
    private String thumbnail;
    private int totalPoint;
    public static SettleFundingRes of(Funding funding){
        return SettleFundingRes.builder()
                .title(funding.getTitle())
                .thumbnail(funding.getThumbnailUrl())
                .totalPoint(funding.getTotalFunding())
                .build();
    }
}
