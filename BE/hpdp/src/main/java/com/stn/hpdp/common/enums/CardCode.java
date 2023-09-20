package com.stn.hpdp.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CardCode {

    SH(1, "신한카드"),
    HD(2, "현대카드"),
    SS(3, "삼성카드"),
    KB(4, "국민카드"),
    LT(5, "롯데카드"),
    KEB(6, "하나카드"),
    WR(7, "우리카드"),
    NH(8, "농협카드"),
    BC(10, "비씨(BC)카드");


    private final int code;
    private final String name;
}