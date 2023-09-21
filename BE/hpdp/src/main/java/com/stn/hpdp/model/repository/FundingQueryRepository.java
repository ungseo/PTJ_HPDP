package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.stn.hpdp.model.entity.QFunding.funding;

@Repository
public class FundingQueryRepository {

    private final JPAQueryFactory queryFactory;

    public FundingQueryRepository(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<FindFundingsRes> findFundingsByCompanyIdAndDone(Long companyId, Integer done){
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
                        funding.startDate.as("startDate"),
                        funding.endDate.as("endDate"),
                        funding.state.as("state")
                ))
                .from(funding)
                .where(equalCompanyId(companyId), equalDone(done))
                .orderBy(funding.createdDate.asc())
                .fetch();
    }

    private BooleanExpression equalCompanyId(Long companyId){
        if(companyId == null){
            return null;
        }
        return funding.company.id.eq(companyId);
    }

    private BooleanExpression equalDone(Integer done){
        if(done == null || done == 0){
            return funding.state.eq(FundingState.ING).or(funding.state.eq(FundingState.READY)).or(funding.state.eq(FundingState.END)).or(funding.state.eq(FundingState.SETTLE));
        }else if(done == 1){
            return funding.state.eq(FundingState.ING).or(funding.state.eq(FundingState.READY));
        }
        return funding.state.eq(FundingState.END).or(funding.state.eq(FundingState.SETTLE));
    }
}