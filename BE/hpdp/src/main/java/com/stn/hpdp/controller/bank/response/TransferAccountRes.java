package com.stn.hpdp.controller.bank.response;

import com.stn.hpdp.model.entity.Transfer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class TransferAccountRes {

    private String toName;
    private int depositAmount;

    public static TransferAccountRes of(Transfer transfer){
        if(transfer == null) return null;

        return TransferAccountRes.builder()
                .toName(transfer.getOpponentName())
                .depositAmount(transfer.getDepositAmount())
                .build();
    }

}
