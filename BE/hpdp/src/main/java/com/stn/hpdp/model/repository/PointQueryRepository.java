package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.controller.point.response.FundingHistoryRes;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.stn.hpdp.model.entity.QFunding.funding;
import static com.stn.hpdp.model.entity.QFundingHistory.fundingHistory;
import static com.stn.hpdp.model.entity.QMember.member;

@Repository
public class PointQueryRepository {

    private final JPAQueryFactory queryFactory;

    public PointQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    public List<FundingHistoryRes> getFundingHistory(Long memberId) {
        return queryFactory
                .select(Projections.constructor(FundingHistoryRes.class,
                        fundingHistory.funding.id,
                        fundingHistory.funding.title,
                        fundingHistory.price,
                        fundingHistory.createdDate))
                .from(fundingHistory)
                .join(fundingHistory.funding, funding)
                .join(fundingHistory.member, member)
                .where(fundingHistory.member.id.eq(memberId))
                .fetch();
    }

    public int findTotalPriceByMemberId(Long memberId) {
        return queryFactory
                .select(fundingHistory.price.sum())
                .from(fundingHistory)
                .where(fundingHistory.member.id.eq(memberId))
                .fetchOne();
    }

    public int findTotalPriceByFundingId(Long fundingId) {
        return queryFactory
                .select(fundingHistory.price.sum())
                .from(fundingHistory)
                .where(fundingHistory.funding.id.eq(fundingId))
                .fetchOne();
    }
}
