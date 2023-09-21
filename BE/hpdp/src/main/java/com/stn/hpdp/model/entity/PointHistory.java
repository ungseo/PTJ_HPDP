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

    @NotNull
    private CardCode cardCode;

    @NonNull
    private boolean flag;  // 입금 false, 출금 true

    @NotNull
    private int paymentPoint;

    @NotNull
    private int afterPoint;

}
