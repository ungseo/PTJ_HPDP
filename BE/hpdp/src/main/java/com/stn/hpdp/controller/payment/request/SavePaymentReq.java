package com.stn.hpdp.controller.payment.request;

import com.stn.hpdp.common.enums.CardCode;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.PointHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SavePaymentReq {
    @NotNull
    private int amount;
    @NotNull
    @Size(min = 2,max = 2, message = "cardCode 는 두자리 입니다.")
    private String cardCode;

    public PointHistory toEntity(Member member){
        // member point 갱신
        member.setPoint(member.getPoint() + amount);
        return PointHistory.builder()
                .member(member)
                .flag(false)
                .paymentPoint(amount)
                .cardCode(CardCode.of(cardCode))
                .afterPoint(member.getPoint())
                .build();
    }

}