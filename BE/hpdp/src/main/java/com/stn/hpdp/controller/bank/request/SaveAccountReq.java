package com.stn.hpdp.controller.bank.request;

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
public class SaveAccountReq {

    @NotNull
    private String accountNumber;

    @NotNull
    private int accountPw;

    @NotNull
    private BankCode bankCode;

    public Account toEntity(Member member){
        return Account.builder()
                .member(member)
                .accountNumber(accountNumber)
                .accountPw(accountPw)
                .bankCode(bankCode)
                .balance(100000)
                .uuid(UUID.randomUUID())
                .build();
    }
}
