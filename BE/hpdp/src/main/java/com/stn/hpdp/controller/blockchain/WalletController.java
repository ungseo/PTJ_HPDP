package com.stn.hpdp.controller.blockchain;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import com.stn.hpdp.service.blockchain.WalletQueryService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/wallet")
@RestController
public class WalletController {

    private final WalletQueryService walletQueryService;

    @GetMapping
    public ApiResponse<WalletRes> getWallet() {
        return ApiResponse.ok(walletQueryService.findWallet());
    }
}
