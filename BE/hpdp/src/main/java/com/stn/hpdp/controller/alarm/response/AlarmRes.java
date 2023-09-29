package com.stn.hpdp.controller.alarm.response;

import com.stn.hpdp.model.entity.NewsAlarm;
import com.stn.hpdp.model.entity.PointAlarm;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AlarmRes {
    private String type;
    private int point;
    private Long fundingId;
    private String title;
    public static AlarmRes ofPoint(PointAlarm pointAlarm) {
        return AlarmRes.builder()
                .type(pointAlarm.getType().name())
                .point(pointAlarm.getPoint())
                .build();
    }

    public static AlarmRes ofNews(NewsAlarm alarm) {
        return AlarmRes.builder()
                .fundingId(alarm.getFunding().getId())
                .type(alarm.getType().name())
                .title(alarm.getTitle())
                .build();
    }
}