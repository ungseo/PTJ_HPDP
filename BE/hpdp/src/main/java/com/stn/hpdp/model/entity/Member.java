package com.stn.hpdp.model.entity;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name ="members")
public class Member extends TimeBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "members_id")
    private Long id;

    private String loginId;

    private String loginPw;

    private String name;

    private String phoneNumber;

    private String email;

    private String address;

    private int point;

    private int blanaceUnit;

    private int role;
}
