package com.stn.hpdp.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "funding_history")
public class FundingHistory extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "funding_history_id")
    private Long id;

    private int price;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "members_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "funding_id")
    private Funding funding;

    @Builder
    public FundingHistory(int pirce, Member member, Funding funding) {
        this.price = pirce;
        this.member = member;
        this.funding = funding;
    }
}
