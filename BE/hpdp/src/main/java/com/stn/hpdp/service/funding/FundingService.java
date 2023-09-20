package com.stn.hpdp.service.funding;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.bank.request.TransferAccountReq;
import com.stn.hpdp.controller.bank.response.FindAccountRes;
import com.stn.hpdp.controller.bank.response.FindTransferRes;
import com.stn.hpdp.controller.bank.response.TransferAccountRes;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.model.entity.Account;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Transfer;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundingService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;

    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;

    public void saveFunding(SaveFundingReq saveFundingReq){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }
}