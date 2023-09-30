package com.stn.hpdp.controller.point.response;

import com.stn.hpdp.model.entity.PointHistory;
import lombok.Builder;
import lombok.Data;

import java.time.format.DateTimeFormatter;

@Data
public class PointHistoryRes {
    private Long pointHistoryId;

    private String content;

    private boolean flag;

    private int paymentPoint;

    private int afterPoint;

    private String paymentDate;

    @Builder
    public PointHistoryRes(Long pointHistoryId,String content, boolean flag, int paymentPoint, int afterPoint, String paymentDate) {
        this.pointHistoryId = pointHistoryId;
        this.content = content;
        this.flag = flag;
        this.paymentPoint = paymentPoint;
        this.afterPoint = afterPoint;
        this.paymentDate = paymentDate;
    }

    public PointHistoryRes(PointHistory entity) {
        this.pointHistoryId = entity.getId();
        this.content = entity.getContent();
        this.flag = entity.isFlag();
        this.paymentPoint = entity.getPaymentPoint();
        this.afterPoint = entity.getAfterPoint();
        this.paymentDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH:mm:ss"));
    }

    public static PointHistoryRes of(PointHistory pointHistory) {
        return PointHistoryRes.builder()
                .pointHistoryId(pointHistory.getId())
                .content(pointHistory.getContent())
                .flag(pointHistory.isFlag())
                .paymentPoint(pointHistory.getPaymentPoint())
                .afterPoint(pointHistory.getAfterPoint())
                .paymentDate(String.valueOf(pointHistory.getCreatedDate()))
                .build();
    }
}
