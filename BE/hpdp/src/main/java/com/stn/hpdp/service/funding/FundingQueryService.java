package com.stn.hpdp.service.funding;

import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FundingQueryService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;
    private final FundingQueryRepository fundingQueryRepository;

    public List<FindFundingsRes> findFundings(int type, int done){
        List<FindFundingsRes> result = new ArrayList<>();
        if(type == 0){
            // 전체 조회
            // result = fundingQueryRepository.findFundingsByDone(done);
        }else if(type == 1){
            String loginId = SecurityUtil.getCurrentMemberLoginId();
            // 사용자 아이디로 후원한 펀딩 조회
            // result = fundingQueryRepository.findFundingsByDoneAndMember(done, loginId);
        }else{
            String loginId = SecurityUtil.getCurrentMemberLoginId();
            // 펀딩의 기업 아이디 = 로그인한 아이디인 펀딩 조회
            // result = fundingQueryRepository.findFundingsByDoneAndCompany(done, loginId);
        }
        return result;
    }
}