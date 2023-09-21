package com.stn.hpdp.model.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import static com.stn.hpdp.model.entity.QWallet.wallet;

@Repository
public class WalletQueryRepository {

    private final JPAQueryFactory queryFactory;

    public WalletQueryRepository(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public WalletRes findWalletByMember(Long memberId){
        return queryFactory
                .select(Projections.constructor(WalletRes.class,
                        wallet.account,
                        wallet.keyfile,
                        wallet.keyPw))
                .from(wallet)
                .where(wallet.member.id.eq(memberId))
                .fetchOne();
    }
}
