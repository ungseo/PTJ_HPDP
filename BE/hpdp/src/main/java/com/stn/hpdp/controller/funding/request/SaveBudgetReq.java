package com.stn.hpdp.controller.funding.request;

import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Funding;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SaveBudgetReq {

    private String price;
    private String content;

    public Budget toEntity(Funding funding){
        return Budget.builder()
                .funding(funding)
                .price(price)
                .content(content)
                .build();
    }
}
