package com.stn.hpdp.service.blockchain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import javax.annotation.PostConstruct;
import java.math.BigInteger;

@Service
@Slf4j
public class TokenService {
    private String rpcUrl ="https://j9c110.p.ssafy.io/bc";

    @Value("${address.token}")
    private String ERC20_CONTRACT_ADDRESS;

    private String privateKey = "912b96488ad18f82928d5cc9c3d6305db09c4e6b5f79a5518a241204926fa973";

    private Web3j web3j;
    private Credentials credentials;

    @PostConstruct
    public void init() {
        // Web3j 인스턴스 초기화
        web3j = Web3j.build(new HttpService(rpcUrl));

        // 주어진 개인 키로 credentials 생성
        credentials = Credentials.create(privateKey);
    }

    public BigInteger getBalance(String account) throws Exception {
        log.info("address {}",ERC20_CONTRACT_ADDRESS);

        ERC20Token erc20Token = ERC20Token.load(
                ERC20_CONTRACT_ADDRESS,
                web3j,
                credentials,
                BigInteger.valueOf(21000),
                BigInteger.valueOf(21000)
        );

        return erc20Token.balanceOf(account).send();
    }

    public String getPrivateKeyFromKeystore(String keystorePassword, String keystoreFilePath) {
        try {
            Credentials credentials = WalletUtils.loadCredentials(keystorePassword, keystoreFilePath);
            return credentials.getEcKeyPair().getPrivateKey().toString(16); // 16진수 형태의 문자열로 반환
        } catch (Exception e) {
            throw new RuntimeException("Failed to get private key from keystore", e);
        }
    }


}
