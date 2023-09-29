package com.stn.hpdp.service.blockchain;


import com.stn.hpdp.controller.blockchain.response.TransactionReceiptRes;
import com.stn.hpdp.model.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@RequiredArgsConstructor
@Service
public class BlockChainService {

    private final TransactionRepository transactionRepository;

    public TransactionReceiptRes getTransaction(Long fundingId){

        return TransactionReceiptRes.of(transactionRepository.findByFunding_Id(fundingId));
    }
}
