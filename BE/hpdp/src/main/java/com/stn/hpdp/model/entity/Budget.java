package com.stn.hpdp.model.entity;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Budget extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "funding_id")
    private Funding funding;

    private String price;
    private String content;

//    public void setFunding(){
//        if(this.funding != null){
//            this.funding.getBudgets().remove(this);
//        }
//        this.funding = funding;
//        funding.getBudgets().add(this);
//    }

//    public static Budget createBudget(String price, String content, Funding funding){
//        return Budget.builder()
//                .price(price)
//                .content(content)
//                .funding(funding)
//                .build();
//    }
}