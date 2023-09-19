package com.stn.hpdp.service.bank;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.model.entity.Account;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.AccountRepository;
import com.stn.hpdp.model.repository.CompanyQueryRepository;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.MemberRepository;
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
}