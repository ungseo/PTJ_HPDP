package com.stn.hpdp.service.member;

import com.stn.hpdp.common.AwsS3Uploader;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.controller.member.response.FindMemberFundingRes;
import com.stn.hpdp.controller.member.response.FindMemberInfoRes;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Interest;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.FundingHistoryRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberQueryService {

    private final MemberRepository memberRepository;
    private final FundingHistoryRepository fundingHistoryRepository;

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

        List<FundingHistory> fundingHistoryList = fundingHistoryRepository.findAllByMember_Id(member.getId());

        List<FindMemberFundingRes> result = fundingHistoryList.stream().map(fundingHistory ->
                        FindMemberFundingRes.of(fundingHistory.getFunding()))
                .collect(Collectors.toList());

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return result;
    }
}
