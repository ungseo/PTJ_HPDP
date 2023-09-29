package com.stn.hpdp.model.entity;

import com.stn.hpdp.common.enums.AlarmType;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointAlarm extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_alarm_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "members_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlarmType type;

    private int point;

}
