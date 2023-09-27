package com.stn.hpdp.controller.main.response;

import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Funding;
import lombok.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindMainInfoRes {

    private int price;
    private int support;
    private int funding;
    private int company;
}
