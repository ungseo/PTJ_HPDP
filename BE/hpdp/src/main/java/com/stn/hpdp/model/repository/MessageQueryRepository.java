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

    public List<Message> findMessagesByFlag(Integer flag, boolean isUser){
        return queryFactory
                .selectFrom(message)
                .where(equalFlag(flag, isUser))
                .orderBy(message.createdDate.desc())
                .fetch();
    }

    private BooleanExpression equalFlag(Integer flag, boolean isUser){
        if(flag == null || flag == 0){
            if(isUser){
                return message.to.eq(false);
            }else{
                return message.to.eq(true);
            }
        }else{
            if(isUser){
                return message.to.eq(true);
            }else{
                return message.to.eq(false);
            }
        }
    }
}