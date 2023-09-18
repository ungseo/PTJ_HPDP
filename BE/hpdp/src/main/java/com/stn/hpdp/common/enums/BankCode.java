package com.stn.hpdp.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BankCode {

    KDB("002", "KDB산업은행"),
    IBK("003", "IBK기업은행"),
    KB("004", "KB국민은행"),
    NH("011", "NH농협은행"),
    WR("020", "우리은행"),
    SC("023", "SC은행"),
    DG("031", "대구은행"),
    BS("032", "부산은행"),
    GJ("034", "광주은행"),
    JJ("035", "제주은행"),
    JB("037", "전북은행"),
    KN("039", "경남은행"),
    MG("045", "MG새마을금고"),
    SHJ("048", "신협중앙회"),
    PO("071", "우체국"),
    KEB("081", "KEB하나은행"),
    SH("088", "신한은행");

    private final String code;
    private final String name;
}