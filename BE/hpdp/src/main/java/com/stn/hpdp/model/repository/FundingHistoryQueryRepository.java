package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.controller.member.response.FindMemberFundingRes;
import com.stn.hpdp.dto.FundingHistoryInfoForFundingDTO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.stn.hpdp.model.entity.QFunding.funding;
import static com.stn.hpdp.model.entity.QFundingHistory.fundingHistory;

@Repository
public class FundingHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;
    public FundingHistoryQueryRepository(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<FindMemberFundingRes> findFundingAndTotalPriceByMemberId(Long memberId) {
        return queryFactory
                .select(Projections.constructor(FindMemberFundingRes.class,
                        fundingHistory.price.sum().as("myTotalFunding"),
                        new CaseBuilder()
                                .when(fundingHistory.price.sum().goe(funding.rewardPrice))
                                .then(true)
                                .otherwise(false)
                                .as("myReward"),
                        funding.rewardName.as("rewardName"),
                        funding.rewardPrice.as("rewardPrice"),
                        funding.company.id,
                        funding.company.name,
                        funding.id,
                        funding.thumbnailUrl,
                        funding.hashtag,
                        funding.title,
                        funding.targetAmount,
                        funding.totalFunding,
                        funding.percent,
                        funding.startDate,
                        funding.endDate,
                        funding.state
                ))
                .from(fundingHistory)
                .where(fundingHistory.member.id.eq(memberId))
                .groupBy(fundingHistory.funding)
                .fetch();
    }

    public FundingHistoryInfoForFundingDTO findTotalPriceByMemberIdAndFundingId(Long memberId, Long fundingId) {
        return queryFactory
                .select(Projections.constructor(FundingHistoryInfoForFundingDTO.class,
                        fundingHistory.price.sum().as("myTotalFunding"),
                        new CaseBuilder()
                                .when(fundingHistory.price.sum().goe(funding.rewardPrice))
                                .then(true)
                                .otherwise(false)
                                .as("myReward")
                ))
                .from(fundingHistory)
                .where(fundingHistory.member.id.eq(memberId)
                        .and(fundingHistory.funding.id.eq(fundingId)))
                .fetchOne();
    }
}