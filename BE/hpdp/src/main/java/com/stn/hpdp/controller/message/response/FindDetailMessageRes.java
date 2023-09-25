package com.stn.hpdp.controller.message.response;

import com.stn.hpdp.model.entity.Message;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindDetailMessageRes {

    private Long messageId;
    private String title;
    private String content;
    private String opponentName;
    private String createdDate;
    private boolean to;

    public FindDetailMessageRes of(Message message){
        return FindDetailMessageRes.builder()
                .messageId(message.getId())
                .title(message.getTitle())
                .content(message.getContent())
                .to(message.isTo())
                .createdDate(message.getCreatedDate().toString())
                .build();
    }
}
