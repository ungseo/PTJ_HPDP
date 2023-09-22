package com.stn.hpdp.model.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "members_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private boolean to;
    @NotNull
    private boolean isRead = false;
}