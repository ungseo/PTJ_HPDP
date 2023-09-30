package com.stn.hpdp.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrxReceipt extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trx_receipt_id")
    private Long id;
    private String transactionHash;
    private String transactionIndex;
    private String blockHash;
    private String blockNumber;
    private String cumulativeGasUsed;
    private String gasUsed;
    private String contractAddress;
    private String status;
    private String trxFrom;
    private String trxTo;

    @OneToOne
    @JoinColumn(name = "point_history_id")
    private PointHistory pointHistory;

    @Builder
    public TrxReceipt(String transactionHash, String transactionIndex, String blockHash, String blockNumber, String cumulativeGasUsed, String gasUsed, String contractAddress, String status, String trxFrom, String trxTo, PointHistory pointHistory) {
        this.transactionHash = transactionHash;
        this.transactionIndex = transactionIndex;
        this.blockHash = blockHash;
        this.blockNumber = blockNumber;
        this.cumulativeGasUsed = cumulativeGasUsed;
        this.gasUsed = gasUsed;
        this.contractAddress = contractAddress;
        this.status = status;
        this.trxFrom = trxFrom;
        this.trxTo = trxTo;
        this.pointHistory = pointHistory;
    }

    public void insertHistory(PointHistory pointHistory) {
        this.pointHistory = pointHistory;

    }
}
