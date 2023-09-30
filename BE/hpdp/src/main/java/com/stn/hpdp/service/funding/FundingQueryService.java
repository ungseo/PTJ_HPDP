package com.stn.hpdp.service.funding;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.funding.response.FindFundingRes;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.controller.funding.response.FindParticipantRes;
import com.stn.hpdp.controller.funding.response.RecommendFundingsRes;
import com.stn.hpdp.dto.FundingHistoryInfoForFundingDTO;
import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.FUNDING_NOT_FOUND;
import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FundingQueryService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;
    private final FundingHistoryRepository fundingHistoryRepository;
    private final FundingQueryRepository fundingQueryRepository;
    private final PointQueryRepository pointQueryRepository;
    private final FundingHistoryQueryRepository fundingHistoryQueryRepository;
    private final MemberRepository memberRepository;


    public List<FindFundingsRes> findFundings(Long companyId, Integer done, String keyword) {
        return fundingQueryRepository.findFundingsByCompanyIdAndDoneAndKeyword(companyId, done, keyword);
    }

    public FindFundingRes findFunding(Long fundingId) {
        Optional<Funding> result = fundingRepository.findById(fundingId);
        if (result.isEmpty()) {
            throw new CustomException(FUNDING_NOT_FOUND);
        }
        List<Budget> budgets = budgetRepository.findAllByFunding_Id(fundingId);
        if(SecurityUtil.getCurrentMemberLoginId().equals("anonymousUser") || SecurityUtil.checkCompany() ) {
            return FindFundingRes.of(result.get(), budgets);
        }

        // 로그인한 사용자 -> total funding 금액과 reward 확인 여부를 보여줌
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        FundingHistoryInfoForFundingDTO fundingHistoryInfoForFundingDTO = fundingHistoryQueryRepository.findTotalPriceByMemberIdAndFundingId(member.getId(), fundingId);
        return FindFundingRes.ofMember(result.get(), budgets, fundingHistoryInfoForFundingDTO);

    }

    public List<FindParticipantRes> findParticipant(Long fundingId) {
        List<FundingHistory> fundingHistories = fundingHistoryRepository.findAllByFunding_Id(fundingId);
        List<FindParticipantRes> result = new ArrayList<>();

        for (FundingHistory fundingHistory : fundingHistories) {
            FindParticipantRes findParticipantRes = FindParticipantRes.of(fundingHistory);
            result.add(findParticipantRes);
        }

        return result;
    }

    public List<RecommendFundingsRes> recommendDeadlineFundings() {
        return fundingQueryRepository.findFundingsByDeadline();
    }

    public List<RecommendFundingsRes> recommendAchievementFundings() {
        return fundingQueryRepository.findFundingsByAchievement();
    }
}