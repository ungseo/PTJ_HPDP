package com.stn.hpdp.controller.payment.request;

import com.stn.hpdp.common.enums.CardCode;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.PointHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SavePaymentReq {
    @NotNull
    private int amount;

    @NotNull
    private CardCode cardCompanyCode;

    public PointHistory toEntity(Member member){
        // member point 갱신
        member.setPoint(member.getPoint() + amount);
        return PointHistory.builder()
                .member(member)
                .flag(false)
                .paymentPoint(amount)
                .cardCode(cardCompanyCode)
                .afterPoint(member.getPoint())
                .build();
    }

}