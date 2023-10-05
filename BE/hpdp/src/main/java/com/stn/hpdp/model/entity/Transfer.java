package com.stn.hpdp.model.entity;

import com.stn.hpdp.common.enums.BankCode;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.UUID;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transfer extends TimeBaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private Long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    @NotNull
    private BankCode opponentBankCode;

    @NotNull
    private String opponentName;

    @NotNull
    private String opponentAccount;

    @NotNull
    private boolean flag; // 0(false) 입금 1(true) 출금

    @NotNull
    private int depositAmount;

    @NotNull
    private int afterBlnc;

}
