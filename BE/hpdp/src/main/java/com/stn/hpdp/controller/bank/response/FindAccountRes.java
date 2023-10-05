package com.stn.hpdp.controller.bank.response;

import com.stn.hpdp.common.enums.BankCode;
import com.stn.hpdp.model.entity.Account;
import com.stn.hpdp.model.entity.Member;
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
public class FindAccountRes {

    private String accountNumber;
    private BankCode bankCode;
    private int balance;

    public static FindAccountRes of(Account account){
        if(account == null) return null;

        return FindAccountRes.builder()
                .accountNumber(account.getAccountNumber())
                .bankCode(account.getBankCode())
                .balance(account.getBalance())
                .build();
    }

}
