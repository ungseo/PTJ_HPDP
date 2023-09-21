package com.stn.hpdp.controller.blockchain.response;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WalletRes {

    private String account;

    private String keyfile;

    private String keyPw;

    @Builder
    public WalletRes(String account, String keyfile, String keyPw) {
        this.account = account;
        this.keyfile = keyfile;
        this.keyPw = keyPw;
    }
}
