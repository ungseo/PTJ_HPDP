package com.stn.hpdp.service.point;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.point.request.FundingByPointReq;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.FundingHistoryRepository;
import com.stn.hpdp.model.repository.FundingRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import jnr.a64asm.Mem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;

import static com.stn.hpdp.common.exception.ErrorCode.SCARCE_POINT_BAD_REQUEST;
import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class PointService {

    private final MemberRepository memberRepository;
    private final FundingHistoryRepository fundingHistoryRepository;
    private final FundingRepository fundingRepository;

    // 후원이 가능한지 확인
    public boolean fundingCheck(int reqPoint) {
        // 후원 하려는 멤버의 포인트 불러오기
        int point = getMemberPoint();
        // 금액이 후원하려는 금액보다 큰지 확인
        if (!isEnoughPoint(point, reqPoint))
            throw new CustomException(SCARCE_POINT_BAD_REQUEST);

        return true;
    }

    public void funding(FundingByPointReq fundingByPointReq) {

        Member sponsor = registFundingHistory(fundingByPointReq.getFundingId(), fundingByPointReq.getSponsorPoint());

        pointDeduction(sponsor, fundingByPointReq.getSponsorPoint());
    }

    private void pointDeduction(Member sponsor, int sponsorPoint) {
        sponsor.changePoint(-sponsorPoint);
    }

    private Member registFundingHistory(Long fundingId, int reqPoint) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        FundingHistory fundingHistory = FundingHistory
                .builder()
                .pirce(reqPoint)
                .member(member)
                .funding(funding)
                .build();

        fundingHistoryRepository.save(fundingHistory);

        return member;
    }

    private int getMemberPoint() {
        log.info("loginId:{}", SecurityUtil.getCurrentMemberLoginId());
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        log.info("memberId:{}", member.getId());
        return member.getPoint();
    }

    private boolean isEnoughPoint(int point, int sponsorPoint) {
        return point >= sponsorPoint;
    }
}
