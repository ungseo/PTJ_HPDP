package com.stn.hpdp.controller.message.request;

import com.stn.hpdp.model.entity.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SendMessageReq {

    @NotNull
    private Long receiverId;
    @NotNull
    private String title;
    @NotNull
    private String content;

    public Message toEntity(Company company, Member member, boolean to){
        return Message.builder()
                .company(company)
                .member(member)
                .title(title)
                .content(content)
                .to(to)
                .isRead(false)
                .build();
    }
}
