package com.stn.hpdp.controller.message.response;

import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Message;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindMessagesRes {

    private Long messageId;
    private String title;
    private String opponentName;
    private boolean isRead;
    private String createdDate;

    public FindMessagesRes of(Message message){
        return FindMessagesRes.builder()
                .messageId(message.getId())
                .title(message.getTitle())
                .isRead(message.isRead())
                .createdDate(message.getCreatedDate().toString())
                .build();
    }
}
