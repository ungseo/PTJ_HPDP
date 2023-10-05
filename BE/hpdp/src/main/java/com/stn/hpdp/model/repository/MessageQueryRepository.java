package com.stn.hpdp.model.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.controller.funding.response.FindFundingsRes;
import com.stn.hpdp.model.entity.Message;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.stn.hpdp.model.entity.QMessage.message;

@Repository
public class MessageQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MessageQueryRepository(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<Message> findMessagesByFlag(Integer flag, boolean isUser, String loginId){
        return queryFactory
                .selectFrom(message)
                .where(equalFlag(flag, isUser, loginId))
                .orderBy(message.createdDate.desc())
                .fetch();
    }

    private BooleanExpression equalFlag(Integer flag, boolean isUser, String loginId){
        if(flag == null || flag == 0){
            if(isUser){
                return message.toWho.eq(false).and(message.member.loginId.eq(loginId));
            }else{
                return message.toWho.eq(true).and(message.company.loginId.eq(loginId));
            }
        }else{
            if(isUser){
                return message.toWho.eq(true).and(message.member.loginId.eq(loginId));
            }else{
                return message.toWho.eq(false).and(message.company.loginId.eq(loginId));
            }
        }
    }
}