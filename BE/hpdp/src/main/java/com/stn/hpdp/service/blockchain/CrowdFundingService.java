package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.dto.FundingInfoForContractDTO;
import com.stn.hpdp.model.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RequiredArgsConstructor
@Slf4j
@Transactional
@Service
public class CrowdFundingService {

    private final CompanyRepository companyRepository;

    @Value("${ethereum.rpc-url}")
    private String rpcUrl;

    @Value("${address.funding}")
    private String fundingContractAddress;

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
            funding.createFunding(BigInteger.valueOf(dto.getFundingId() + 123L)
                    , BigInteger.valueOf(dto.getGoal())
                    , BigInteger.valueOf(getFinalDays(dto.getDays()))).send();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CREATE_FUNDING_FAIL);
        }

    }

    private long getFinalDays(LocalDateTime days) {
        return ChronoUnit.DAYS.between(LocalDateTime.now(), days);
    }

    private Credentials getCompanyWallet(Long companyId) {

        String privateKey = companyRepository.findById(companyId).get().getPrivateKey();

        return Credentials.create(privateKey);
    }

}
