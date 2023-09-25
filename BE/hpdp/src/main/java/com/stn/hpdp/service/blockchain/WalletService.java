package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.common.AwsS3Uploader;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Wallet;
import com.stn.hpdp.model.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

import java.io.File;
import java.math.BigDecimal;
import java.math.BigInteger;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final AwsS3Uploader awsS3Uploader;
    private Credentials adminCredentials;
    @Value("${ethereum.rpc-url}")
    private String rpcUrl;
    private Web3j web3j;
    @Value("${ethereum.password}")
    private String password;

    @Value("${privatekey.admin}")
    private String privateKey;

    public void registWallet(Member member) {
        init();
        String keyfile = createWallet();
        Credentials account = verifyWallet(keyfile);
        String txReceipt = sendEther(account.getAddress());

        walletRepository.save(Wallet.builder()
                .member(member)
                .account(account.getAddress())
                .keyFile(keyfile)
                .privateKey(account.getEcKeyPair().getPrivateKey().toString(16))
                .keyPw(password)
                .build());

        uploadAndDeleteFile(keyfile);

    }

    public void init() {
        adminCredentials = Credentials.create(privateKey);
        web3j = Web3j.build(new HttpService(rpcUrl));
    }

    public String createWallet() {
        ECKeyPair ecKeyPair = null;
        try {
            ecKeyPair = Keys.createEcKeyPair();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CREATE_KEYPAIR_FAIL);
        }
        String walletDirectory = "./";

        try {
            return WalletUtils.generateWalletFile(password, ecKeyPair, new java.io.File(walletDirectory), true);

        } catch (Exception e) {
            throw new CustomException(ErrorCode.CREATE_WALLET_FAIL);
        }
    }

    public Credentials verifyWallet(String walletFileName) {
        String walletDirectory = "./";
        Credentials credentials = null;
        try {
            credentials = WalletUtils.loadCredentials(password, walletDirectory + "/" + walletFileName);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.WALLET_NOT_FOUND);
        }
        return credentials;
    }

    public String sendEther(String toAddress) {
        try {
            // Nonce와 가스 가격 설정
            BigInteger nonce = web3j.ethGetTransactionCount(adminCredentials.getAddress(), DefaultBlockParameterName.LATEST).send().getTransactionCount();
            BigInteger gasPrice = BigInteger.valueOf(1000000000L); // 가스 값
            BigInteger gasLimit = BigInteger.valueOf(300000L); // 가스 최댓값
            BigInteger value = Convert.toWei(BigDecimal.valueOf(10L), Convert.Unit.ETHER).toBigInteger(); // 초기 이더리움 값

            // RawTransaction 객체 생성
            RawTransaction rawTransaction = RawTransaction.createEtherTransaction(
                    nonce,
                    gasPrice,
                    gasLimit,
                    toAddress,
                    value
            );

            // chainId 추가
            int chainId = 12345;
            Credentials credentials = adminCredentials;

            // 트랜잭션 서명
            byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, chainId, credentials);
            String hexValue = Numeric.toHexString(signedMessage);

            // 트랜잭션 전송
            EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();

            // 트랜잭션 해시값 반환
            return ethSendTransaction.getTransactionHash();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.SEND_ETH_FAIL);
        }
    }

    private void uploadAndDeleteFile(String keyfile) {
        File file = new File("./" + keyfile);
        awsS3Uploader.upload(file, "keystore/" + keyfile);
    }


}
