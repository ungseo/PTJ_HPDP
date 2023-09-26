package com.stn.hpdp.model.entity;

import com.stn.hpdp.common.enums.CardCode;
import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "point_history")
@AllArgsConstructor
@Builder
public class PointHistory extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_history_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "members_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "funding_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private Funding funding;

    private String content;

    private CardCode cardCode;

    @NonNull
    private boolean flag;  // 입금 false, 출금 true

    @NotNull
    private int paymentPoint;

    @NotNull
    private int afterPoint;

    @Builder
    public PointHistory(Member member, Funding funding, String content, CardCode cardCode, boolean flag, int paymentPoint, int afterPoint) {
        this.member = member;
        this.funding = funding;
        this.content = content;
        this.cardCode = cardCode;
        this.flag = flag;
        this.paymentPoint = paymentPoint;
        this.afterPoint = afterPoint;
    }
}
