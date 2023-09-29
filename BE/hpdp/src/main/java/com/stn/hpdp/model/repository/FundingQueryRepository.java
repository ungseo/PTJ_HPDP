package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.controller.funding.response.RecommendFundingsRes;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.stn.hpdp.model.entity.QFunding.funding;

@Repository
public class FundingQueryRepository {

    private final JPAQueryFactory queryFactory;

    public FundingQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<FindFundingsRes> findFundingsByCompanyIdAndDoneAndKeyword(Long companyId, Integer done, String keyword) {
        // 전체 조회
        // 펀딩의 기업 아이디 = companyId 인 펀딩 조회
        return queryFactory
                .select(Projections.constructor(FindFundingsRes.class,
                        funding.company.id.as("companyId"),
                        funding.company.name.as("name"),
                        funding.id.as("fundingId"),
                        funding.thumbnailUrl.as("thumbnail"),
                        funding.hashtag.as("hashtag"),
                        funding.title.as("title"),
                        funding.targetAmount.as("targetAmount"),
                        funding.totalFunding.as("totalFunding"),
                        funding.percent.as("percent"),
                        funding.startDate.as("startDate"),
                        funding.endDate.as("endDate"),
                        funding.state.as("state")

                ))
                .from(funding)
                .where(equalCompanyId(companyId), equalDone(done), containsKeyword(keyword))
                .orderBy(funding.createdDate.asc())
                .fetch();
    }

    public List<RecommendFundingsRes> findFundingsByDeadline() {
        return queryFactory
                .select(Projections.constructor(RecommendFundingsRes.class,
                        funding.company.id.as("companyId"),
                        funding.company.name.as("name"),
                        funding.id.as("fundingId"),
                        funding.thumbnailUrl.as("thumbnail"),
                        funding.title.as("title"),
                        funding.endDate.as("endDate")
                ))
                .from(funding)
                .where(funding.state.eq(FundingState.ING))
                .orderBy(funding.endDate.asc())
                .limit(5)
                .fetch();
    }

    public List<RecommendFundingsRes> findFundingsByAchievement() {
        return queryFactory
                .select(Projections.constructor(RecommendFundingsRes.class,
                        funding.company.id.as("companyId"),
                        funding.company.name.as("name"),
                        funding.id.as("fundingId"),
                        funding.thumbnailUrl.as("thumbnail"),
                        funding.title.as("title"),
                        funding.endDate.as("endDate")
                ))
                .from(funding)
                .where(funding.state.eq(FundingState.ING))
                .orderBy(funding.createdDate.asc())
                .fetch();
    }

    private BooleanExpression containsKeyword(String keyword) {
        if (keyword == null) {
            return null;
        }
        return funding.title.containsIgnoreCase(keyword).or(funding.hashtag.containsIgnoreCase(keyword)).or(funding.company.name.containsIgnoreCase(keyword));
    }

    private BooleanExpression equalCompanyId(Long companyId) {
        if (companyId == null) {
            return null;
        }
        return funding.company.id.eq(companyId);
    }

    private BooleanExpression equalDone(Integer done) {
        if (done == null || done == 0) {
            return funding.state.eq(FundingState.ING).or(funding.state.eq(FundingState.READY)).or(funding.state.eq(FundingState.END)).or(funding.state.eq(FundingState.SETTLE));
        } else if (done == 1) {
            return funding.state.eq(FundingState.ING).or(funding.state.eq(FundingState.READY));
        }
        return funding.state.eq(FundingState.END).or(funding.state.eq(FundingState.SETTLE));
    }
}