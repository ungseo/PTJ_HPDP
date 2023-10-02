package com.stn.hpdp.controller.alarm.response;

import com.stn.hpdp.model.entity.NewsAlarm;
import com.stn.hpdp.model.entity.PointAlarm;
import lombok.*;

import java.time.format.DateTimeFormatter;

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
    private String date;
    private long companyId;
    private String companyName;
    public static FindNewsAlarmRes of (NewsAlarm alarm) {
        return FindNewsAlarmRes.builder()
                .newsAlarmId(alarm.getId())
                .fundingId(alarm.getFunding().getId())
                .type(alarm.getType().name())
                .title(alarm.getTitle())
                .thumbnail(alarm.getFunding().getThumbnailUrl())
                .isRead(alarm.getIsRead())
                .date(alarm.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH:mm:ss")))
                .companyId(alarm.getFunding().getCompany().getId())
                .companyName(alarm.getFunding().getCompany().getName())
                .build();
    }
}