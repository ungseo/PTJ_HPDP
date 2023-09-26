package com.stn.hpdp.controller.bank.response;

import com.stn.hpdp.common.enums.BankCode;
import com.stn.hpdp.model.entity.Account;
import com.stn.hpdp.model.entity.Transfer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class FindTransferRes {

    private boolean flag;
    private int afterBlnc;
    private String opponentName;
    private String opponentAccount;
    private String createdDate;
    private int depositAmount;

    public static FindTransferRes of(Transfer transfer){
        return FindTransferRes.builder()
                .flag(transfer.isFlag())
                .afterBlnc(transfer.getAfterBlnc())
                .opponentName(transfer.getOpponentName())
                .opponentAccount(transfer.getOpponentAccount())
                .createdDate(transfer.getCreatedDate().toString())
                .depositAmount(transfer.getDepositAmount())
                .build();
    }

}
