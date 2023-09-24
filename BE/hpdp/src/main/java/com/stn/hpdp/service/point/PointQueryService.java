package com.stn.hpdp.service.point;

import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.point.response.FundingHistoryRes;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.PointQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class PointQueryService {

    private final MemberRepository memberRepository;
    private final PointQueryRepository pointQueryRepository;

    public int getPoint() {
        return memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId()).get().getPoint();
    }


    public List<FundingHistoryRes> getFundingHistories(LocalDate startDateTime, LocalDate endDateTime) {
        return pointQueryRepository.getFundingHistoryByPeriod(startDateTime, endDateTime, SecurityUtil.getCurrentMemberLoginId());
    }
}

