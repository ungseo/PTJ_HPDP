package com.stn.hpdp.dto;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FundingInfoForContractDTO {

    private Long companyId;

    private Long fundingId;

    private Long goal;

    private LocalDateTime days;

    @Builder
    public FundingInfoForContractDTO(Long companyId, Long fundingId, Long goal, LocalDateTime days) {
        this.companyId = companyId;
        this.fundingId = fundingId;
        this.goal = goal;
        this.days = days;
    }
}
