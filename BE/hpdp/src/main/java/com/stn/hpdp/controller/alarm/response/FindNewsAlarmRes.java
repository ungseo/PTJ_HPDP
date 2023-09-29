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
public class FindNewsAlarmRes {
    private long newsAlarmId;
    private String type;
    private Long fundingId;
    private String title;
    private String thumbnail;
    private boolean isRead;
    public static FindNewsAlarmRes of (NewsAlarm alarm) {
        return FindNewsAlarmRes.builder()
                .newsAlarmId(alarm.getId())
                .fundingId(alarm.getFunding().getId())
                .type(alarm.getType().name())
                .title(alarm.getTitle())
                .thumbnail(alarm.getFunding().getThumbnailUrl())
                .isRead(alarm.getIsRead())
                .build();
    }
}