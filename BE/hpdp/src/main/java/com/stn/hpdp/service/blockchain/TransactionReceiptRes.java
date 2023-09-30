package com.stn.hpdp.controller.blockchain.response;

import com.stn.hpdp.model.entity.TrxReceipt;
import lombok.Builder;
import lombok.Data;


@Data
public class TransactionReceiptRes {

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


    @Builder
    public TransactionReceiptRes(String transactionHash, String transactionIndex, String blockHash, String blockNumber, String cumulativeGasUsed, String gasUsed, String contractAddress, String status, String trxFrom, String trxTo) {
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
    }

    public static TransactionReceiptRes of(TrxReceipt entity) {
        return TransactionReceiptRes.builder()
                .blockHash(entity.getBlockHash())
                .blockNumber(entity.getBlockNumber())
                .contractAddress(entity.getContractAddress())
                .cumulativeGasUsed(entity.getCumulativeGasUsed())
                .gasUsed(entity.getGasUsed())
                .status(entity.getStatus())
                .transactionHash(entity.getTransactionHash())
                .transactionIndex(entity.getTransactionIndex())
                .trxFrom(entity.getTrxFrom())
                .trxTo(entity.getTrxTo())
                .build();
    }
}
