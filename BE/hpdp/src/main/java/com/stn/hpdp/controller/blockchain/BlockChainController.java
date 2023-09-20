package com.stn.hpdp.controller.blockchain;

import com.stn.hpdp.service.blockchain.TokenService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/blockchain")
@RestController
public class BlockChainController {

    private final TokenService tokenService;
    @GetMapping("/privateKey")
    public String getPrivateKey() {
        String keystorePassword = "1q2w3e4r!";  // 실제 사용 시에는 보안을 고려하여 관리해야 합니다.
        String keystoreFilePath = "C:\\SSAFY\\c110\\BE\\hpdp\\src\\main\\java\\com\\stn\\hpdp\\key\\UTC--2023-09-15T05-52-28.239664500Z--6f68cf31f6278b22c3d6355c39833592654d0225"; // keystore 파일의 절대 경로나 상대 경로

        return tokenService.getPrivateKeyFromKeystore(keystorePassword, keystoreFilePath);
    }

    @GetMapping("/test")
    public String getBalance() throws Exception {
        return tokenService.getBalance().toString();
    }
}
