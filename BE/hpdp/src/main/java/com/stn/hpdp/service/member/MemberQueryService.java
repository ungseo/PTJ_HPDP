package com.stn.hpdp.service.member;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.member.response.FindMemberFundingRes;
import com.stn.hpdp.controller.member.response.FindMemberInfoRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.FundingHistoryQueryRepository;
import com.stn.hpdp.model.repository.FundingHistoryRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberQueryService {

    private final MemberRepository memberRepository;
    private final FundingHistoryQueryRepository fundingHistoryQueryRepository;

    public FindMemberInfoRes findMemberInfo() {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return FindMemberInfoRes.of(member);
    }

    public List<FindMemberFundingRes> findMemberFunding() {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<FindMemberFundingRes> findMemberFundingResList = fundingHistoryQueryRepository.findFundingAndTotalPriceByMemberId(member.getId());

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return findMemberFundingResList;
    }
}
