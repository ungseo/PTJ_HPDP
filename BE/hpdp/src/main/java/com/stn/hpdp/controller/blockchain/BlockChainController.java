package com.stn.hpdp.controller.blockchain;

import com.stn.hpdp.service.blockchain.CrowdFundingService;
import com.stn.hpdp.service.blockchain.TokenService;
import com.stn.hpdp.service.blockchain.WalletService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/blockchain")
@RestController
public class BlockChainController {

    private final TokenService tokenService;
    private final WalletService walletService;
    private final CrowdFundingService crowdFundingService;

    @PostMapping
    public String settle() {

        crowdFundingService.settle(107L);

        return "sucess";
    }
}