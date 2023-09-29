package com.stn.hpdp.controller.blockchain;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.blockchain.response.TransactionReceiptRes;
import com.stn.hpdp.service.blockchain.BlockChainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/blockchain")
@RestController
public class BlockChainController {

    private final BlockChainService blockChainServcie;

    @GetMapping("/{fundingId}")
    public ApiResponse<TransactionReceiptRes> getTransaction(@PathVariable Long fundingId) {
        TransactionReceiptRes transactionReceiptRes = blockChainServcie.getTransaction(fundingId);
        return ApiResponse.ok(transactionReceiptRes);

    }


}