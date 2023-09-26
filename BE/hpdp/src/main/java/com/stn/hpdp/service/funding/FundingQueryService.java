package com.stn.hpdp.service.funding;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.funding.response.FindFundingRes;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.controller.funding.response.RecommendFundingsRes;
import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.FUNDING_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FundingQueryService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;
    private final FundingQueryRepository fundingQueryRepository;
    private final PointQueryRepository pointQueryRepository;

    public List<FindFundingsRes> findFundings(Long companyId, Integer done, String keyword) {
        List<FindFundingsRes> result = fundingQueryRepository.findFundingsByCompanyIdAndDoneAndKeyword(companyId, done, keyword);

        // TODO: 후원하기 기능 완료 후 totalFunding, percent 세팅

        return result;
    }

    public FindFundingRes findFunding(Long fundingId) {
        Optional<Funding> result = fundingRepository.findById(fundingId);
        if (result.isEmpty()) {
            throw new CustomException(FUNDING_NOT_FOUND);
        }

        List<Budget> budgets = budgetRepository.findAllByFunding_Id(fundingId);

        int totalFunding = pointQueryRepository.findTotalPriceByFundingId(fundingId);
        int percent = result.get().getTargetAmount() / totalFunding;
        FindFundingRes findFundingRes = FindFundingRes.of(result.get(), budgets,totalFunding,percent);

        return findFundingRes;
    }

    public List<RecommendFundingsRes> recommendDeadlineFundings() {
        List<RecommendFundingsRes> result = fundingQueryRepository.findFundingsByDeadline();

        // TODO: 후원하기 기능 완료 후 totalFunding, percent 세팅

        return result;
    }

    public List<RecommendFundingsRes> recommendAchievementFundings() {
        List<RecommendFundingsRes> result = fundingQueryRepository.findFundingsByAchievement();

        // TODO: 후원하기 기능 완료 후 totalFunding, percent 세팅

        // TODO: percent 세팅 후 높은 순으로 5개

        return result;
    }
}