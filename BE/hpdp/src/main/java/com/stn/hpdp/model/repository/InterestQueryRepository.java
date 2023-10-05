package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.model.entity.Interest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.stn.hpdp.model.entity.QCompany.company;
import static com.stn.hpdp.model.entity.QInterest.interest;

@Repository
public class InterestQueryRepository {

    private final JPAQueryFactory queryFactory;
    public InterestQueryRepository(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<Interest> findByMember_IdWithCompany(Long memberId) {
        return queryFactory
                .selectFrom(interest)
                .join(interest.company, company).fetchJoin()
                .where(interest.member.id.eq(memberId))
                .fetch();
    }

}