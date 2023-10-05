package com.stn.hpdp.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account;

    private String keyFile;

    private String privateKey;

    private String keyPw;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Wallet(String account, String keyFile, String privateKey, String keyPw, Member member) {
        this.account = account;
        this.keyFile = keyFile;
        this.privateKey = privateKey;
        this.keyPw = keyPw;
        this.member = member;
    }
}
