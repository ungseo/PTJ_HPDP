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

    @GetMapping("/{pointHistoryId}")
    public ApiResponse<TransactionReceiptRes> getTransaction(@PathVariable Long pointHistoryId) {
        TransactionReceiptRes transactionReceiptRes = blockChainServcie.getTransaction(pointHistoryId);
        return ApiResponse.ok(transactionReceiptRes);
    }

    @GetMapping("/member")
    public ApiResponse<String> getWalletAddress(){
        String address = blockChainServcie.getWalletAddressForMember();
        return ApiResponse.ok(address);
    }

    @GetMapping("/company/{companyId}")
    public ApiResponse<String> getWalletAddress(@PathVariable Long companyId){
        String address = blockChainServcie.getWalletAddressForCompany(companyId);
        return ApiResponse.ok(address);
    }

}