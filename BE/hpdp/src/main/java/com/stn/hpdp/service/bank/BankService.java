package com.stn.hpdp.service.bank;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.bank.request.TransferAccountReq;
import com.stn.hpdp.controller.bank.response.FindAccountRes;
import com.stn.hpdp.controller.bank.response.TransferAccountRes;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.model.entity.Account;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Transfer;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class BankService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final TransferRepository transferRepository;

    public void saveAccount(SaveAccountReq saveAccountReq){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if(saved.isPresent()){
            saved.get().setMember(null);
            accountRepository.save(saved.get());
        }

        Account account = saveAccountReq.toEntity(member);
        accountRepository.save(account);
    }

    public FindAccountRes findAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if (saved.isEmpty()) {
            throw new CustomException(CONNECTED_ACCOUNT_NOT_FOUND);
        }

        return FindAccountRes.of(saved.get());
    }

    public void deleteAccount(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if(saved.isPresent()){
            saved.get().setMember(null);
            accountRepository.save(saved.get());
        }
    }

    public TransferAccountRes transferAccount(TransferAccountReq transferAccountReq) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if (saved.isEmpty()) {
            throw new CustomException(CONNECTED_ACCOUNT_NOT_FOUND);
        }
        if(saved.get().getAccountPw() != transferAccountReq.getAccountPw()){
            throw new CustomException(ACCOUNT_PASSWORD_BAD_REQUEST);
        }

        Transfer transfer = transferAccountReq.toEntity(saved.get());
        transferRepository.save(transfer);

        return TransferAccountRes.of(transfer);
    }
}