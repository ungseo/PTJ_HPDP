package com.stn.hpdp.service.funding;

import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FundingQueryService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;
    private final FundingQueryRepository fundingQueryRepository;

    public List<FindFundingsRes> findFundings(Long companyId, Integer done){
        List<FindFundingsRes> result = fundingQueryRepository.findFundingsByCompanyIdAndDone(companyId, done);

        // dDay, totalFunding 세팅

        return result;
    }
}