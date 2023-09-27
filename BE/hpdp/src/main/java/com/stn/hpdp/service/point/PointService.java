package com.stn.hpdp.service.point;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.point.request.FundingByPointReq;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.PointHistory;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class PointService {

    private final MemberRepository memberRepository;
    private final FundingHistoryRepository fundingHistoryRepository;
    private final FundingRepository fundingRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final PointQueryRepository pointQueryRepository;

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

        // 펀딩 내역 저장
        Member sponsor = registFundingHistory(fundingByPointReq.getFundingId(), fundingByPointReq.getSponsorPoint());
        Optional<Funding> funding = fundingRepository.findById(fundingByPointReq.getFundingId());

        if (funding.isEmpty()) throw new CustomException(FUNDING_NOT_FOUND);
        // 포인트 내역 저장
        PointHistory pointHistory = PointHistory.builder()
                .member(sponsor)
                .funding(funding.get())
                .content(funding.get().getTitle())
                .flag(true)
                .paymentPoint(fundingByPointReq.getSponsorPoint())
                .afterPoint(sponsor.getPoint() - fundingByPointReq.getSponsorPoint())
                .build();

        pointHistoryRepository.save(pointHistory);
        // 사용자 포인트 감소
        pointDeduction(sponsor, fundingByPointReq.getSponsorPoint());
        // 펀딩의 총 후원 금액 업데이트
        updateFunding(funding.get());

    }

    private void updateFunding(Funding funding) {
        int totalFunding = pointQueryRepository.findTotalPriceByFundingId(funding.getId());
        double percent = 0;
        if (totalFunding != 0) percent = (totalFunding / funding.getTargetAmount()) *100 ;
        funding.changeFunding(totalFunding, (int) percent);

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
                .price(reqPoint)
                .member(member)
                .funding(funding)
                .build();

        fundingHistoryRepository.save(fundingHistory);

        return member;
    }

    public int getMemberPoint() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        return member.getPoint();
    }

    private boolean isEnoughPoint(int point, int sponsorPoint) {
        return point >= sponsorPoint;
    }
}
