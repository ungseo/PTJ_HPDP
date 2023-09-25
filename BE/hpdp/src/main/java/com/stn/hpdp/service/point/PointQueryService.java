package com.stn.hpdp.service.point;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.point.response.FundingHistoryRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.PointQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class PointQueryService {

    private final MemberRepository memberRepository;
    private final PointQueryRepository pointQueryRepository;

    public int getPoint() {
        return memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId()).get().getPoint();
    }

    public int getTotalPrice(){
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        return pointQueryRepository.findTotalPriceByMemberId(member.getId());
    }

    public List<FundingHistoryRes> getFundingHistories() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        return pointQueryRepository.getFundingHistory(member.getId());
    }
}

