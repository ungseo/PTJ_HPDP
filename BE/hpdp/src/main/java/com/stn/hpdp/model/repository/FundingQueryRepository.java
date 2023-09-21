package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
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

    public List<FindFundingsRes> findFundingsByDone(int done){
        return queryFactory
                .select(Projections.constructor(FindFundingsRes.class,
                        funding.company.id.as("companyId"),
                        funding.company.name.as("name"),
                        funding.id.as("thumbnail"),
                        funding.hashtag.as("hashtag"),
                        funding.title.as("title"),
                        funding.targetAmount.as("targetAmount"),
                        funding.startDate.as("startDate"),
                        funding.endDate.as("endDate"),
                        funding.state.as("state")
                ))
                .from(funding)
//                .where(containKeyword(keyword))
                .orderBy(funding.createdDate.asc())
                .fetch();
    }

//    public List<FindFundingsRes> findFundingsByDoneAndMember(int done, String memberLoginId){
//        return queryFactory
//                .select(Projections.constructor(FindCompanyRes.class,
//                        company.id.as("companyId"),
//                        company.profile.as("profile"),
//                        company.name.as("name"),
//                        company.hashtag.as("hashtag")
//                ))
//                .from(company)
//                .where(containKeyword(keyword))
//                .orderBy(company.createdDate.asc())
//                .fetch();
//    }

//    public List<FindFundingsRes> findFundingsByDoneAndCompany(int done, String companyLoginId){
//        return queryFactory
//                .select(Projections.constructor(FindCompanyRes.class,
//                        company.id.as("companyId"),
//                        company.profile.as("profile"),
//                        company.name.as("name"),
//                        company.hashtag.as("hashtag")
//                ))
//                .from(company)
//                .where(containKeyword(keyword))
//                .orderBy(company.createdDate.asc())
//                .fetch();
//    }

//    private BooleanExpression containKeyword(String keyoword){
//        if(keyoword == null || keyoword.isEmpty()){
//            return null;
//        }else{
//            return company.name.containsIgnoreCase(keyoword).or(company.hashtag.containsIgnoreCase(keyoword));
//        }
//    }
}