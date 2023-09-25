package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.point.request.FundingByPointReq;
import com.stn.hpdp.dto.FundingInfoForContractDTO;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Wallet;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@RequiredArgsConstructor
@Slf4j
@Transactional
@Service
public class CrowdFundingService {

    private final CompanyRepository companyRepository;
    private final MemberRepository memberRepository;
    private final WalletRepository walletRepository;

    @Value("${ethereum.rpc-url}")
    private String rpcUrl;

    @Value("${address.funding}")
    private String fundingContractAddress;

    @Value("${address.token}")
    private String tokenContractAddress;

    private Web3j web3j;


    private void init() {
        // Web3j 인스턴스 초기화
        web3j = Web3j.build(new HttpService(rpcUrl));
    }

    public void createFunding(FundingInfoForContractDTO dto) {
        init();

        Credentials credentials = getCompanyWallet(dto.getCompanyId());
        TransactionManager transactionManager = new RawTransactionManager(
                web3j,
                credentials,
                12345
        );

        CrowdFunding funding = CrowdFunding.load(
                fundingContractAddress, web3j, transactionManager, new DefaultGasProvider()
        );
        try {
            funding.createFunding(BigInteger.valueOf(dto.getFundingId() + 10L)
                    , BigInteger.valueOf(dto.getGoal())
                    , BigInteger.valueOf(getFinalDays(dto.getDays()))).send();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CREATE_FUNDING_FAIL);
        }

    }

    public void funding(FundingByPointReq fundingByPointReq) {
        // 사용자의 지갑 주소 가져오기
        Credentials credentials = getSponsorWallet();
        // 컨트랙트 배포 주소에게 후원할 금액 승인 받기
        trxApproval(credentials, fundingByPointReq.getSponsorPoint());
        // 기업에게 펀딩 하기
        TransactionReceipt transactionReceipt = contributeToFunding(credentials, fundingByPointReq.getFundingId(), fundingByPointReq.getSponsorPoint());
        if (transactionReceipt == null) throw new CustomException(FUNDING_FAIL);

    }

    // 펀딩에 기여하는 메서드
    private TransactionReceipt contributeToFunding(Credentials credentials, long fundingId, long amount) {
        CrowdFunding funding = CrowdFunding.load(
                fundingContractAddress, web3j, credentials, new DefaultGasProvider());
        try {
            return funding.contribute(BigInteger.valueOf(fundingId), BigInteger.valueOf(amount)).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private void trxApproval(Credentials credentials, long value) {
        TransactionManager transactionManager = new RawTransactionManager(
                web3j,
                credentials,
                12345
        );
        ERC20Token erc20Token = ERC20Token.load(
                tokenContractAddress, web3j, transactionManager, new DefaultGasProvider()
        );

        try {
            erc20Token.approve(fundingContractAddress, BigInteger.valueOf(value)).send();
        } catch (Exception e) {
            throw new CustomException(APPROVAL_FUNDING_FAIL);
        }
    }

    private Credentials getSponsorWallet() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Wallet wallet = walletRepository.findByMember_Id(member.getId());

        return Credentials.create(wallet.getPrivateKey());
    }

    private long getFinalDays(LocalDateTime days) {
        return ChronoUnit.DAYS.between(LocalDateTime.now(), days);
    }

    private Credentials getCompanyWallet(Long companyId) {

        String privateKey = companyRepository.findById(companyId).get().getPrivateKey();

        return Credentials.create(privateKey);
    }

}
