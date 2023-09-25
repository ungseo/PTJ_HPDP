package com.stn.hpdp.controller.bank.request;

import com.stn.hpdp.common.enums.BankCode;
import com.stn.hpdp.model.entity.Account;
import com.stn.hpdp.model.entity.Transfer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class TransferAccountReq {

    @NotNull
    private String opponentName;

    @NotNull
    private String opponentAccount;

    @NotNull
    private int depositAmount;

    public Transfer toEntity(Account account){
        return Transfer.builder()
                .account(account)
                .opponentName(opponentName)
                .opponentAccount(opponentAccount)
                .uuid(UUID.randomUUID())
                .flag(depositAmount <= 0)
                .afterBlnc(account.getBalance()+depositAmount)
                .depositAmount(depositAmount)
                .build();
    }
}
