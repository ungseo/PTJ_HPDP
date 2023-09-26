package com.stn.hpdp.controller.alarm.response;

import com.stn.hpdp.model.entity.Alarm;
import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Funding;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindAlarmRes {
    private Long fundingId;
    private String type;
    private String title;
    private String content;
    public static FindAlarmRes of(Alarm alarm) {
        return FindAlarmRes.builder()
                .fundingId(alarm.getFunding().getId())
                .type(alarm.getType().name())
                .title(alarm.getTitle())
                .content(alarm.getContent())
                .build();
    }
}
