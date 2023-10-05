package com.stn.hpdp.service.blockchain;


import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.blockchain.response.TransactionReceiptRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.TransactionRepository;
import com.stn.hpdp.model.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;

import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.COMPANY_NOT_FOUND;
import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;


@Transactional
@RequiredArgsConstructor
@Service
public class BlockChainService {

    private final TransactionRepository transactionRepository;
    private final MemberRepository memberRepository;
    private final WalletRepository walletRepository;
    private final CompanyRepository companyRepository;

    public TransactionReceiptRes getTransaction(Long fundingId) {

        return TransactionReceiptRes.of(transactionRepository.findByPointHistoryId(fundingId));
    }

    public String getWalletAddressForMember() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        return walletRepository.findByMember_Id(member.getId()).getAccount();
    }

    public String getWalletAddressForCompany(Long companyId) {
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isEmpty()) {
            throw new CustomException(COMPANY_NOT_FOUND);
        }
        Credentials credentials = Credentials.create(company.get().getPrivateKey());

        return credentials.getAddress();
    }
}
