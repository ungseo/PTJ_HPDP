package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Wallet;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
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

import java.math.BigDecimal;
import java.math.BigInteger;

@Transactional
@RequiredArgsConstructor
@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final MemberRepository memberRepository;
    private Credentials adminCredentials;
    @Value("${ethereum.rpc-url}")
    private String rpcUrl;
    private Web3j web3j;
    @Value("${ethereum.password}")
    private String password;


    public void registWallet(Member member) {
        init();
        String keyfile = createWallet();
        String account = verifyWallet(keyfile);
        String txReceipt = sendEther(account);

        walletRepository.save(Wallet.builder()
                .member(member)
                .account(account)
                .keyfile(keyfile)
                .keyPw(password)
                .build());

    }

    public void init() {
        try {
            adminCredentials = WalletUtils.loadCredentials(password, "C:\\SSAFY\\c110\\BE\\hpdp\\src\\main\\java\\com\\stn\\hpdp\\key\\UTC--2023-09-12T23-57-15.846774500Z--9a6d9db08f536fd90dd4f77ac79e17fa6b9c1e6a");
        } catch (Exception e) {
            throw new CustomException(ErrorCode.WALLET_NOT_FOUND);
        }
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

    public String verifyWallet(String walletFileName) {
        String walletDirectory = "./";
        Credentials credentials = null;
        try {
            credentials = WalletUtils.loadCredentials(password, walletDirectory + "/" + walletFileName);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.WALLET_NOT_FOUND);
        }
        return credentials.getAddress();
    }

    public String sendEther(String toAddress) {
        try {
            // Nonce와 가스 가격 설정
            BigInteger nonce = web3j.ethGetTransactionCount(adminCredentials.getAddress(), DefaultBlockParameterName.LATEST).send().getTransactionCount();
            BigInteger gasPrice = BigInteger.valueOf(21000); // 가스 값
            BigInteger gasLimit = BigInteger.valueOf(21000); // 가스 최댓값
            BigInteger value = Convert.toWei(BigDecimal.TEN, Convert.Unit.ETHER).toBigInteger(); // 초기 이더리움 값

            // RawTransaction 객체 생성
            RawTransaction rawTransaction = RawTransaction.createEtherTransaction(
                    nonce,
                    gasPrice,
                    gasLimit,
                    toAddress,
                    value
            );

            // chainId 추가 (예: 메인넷의 경우 1)
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


}
