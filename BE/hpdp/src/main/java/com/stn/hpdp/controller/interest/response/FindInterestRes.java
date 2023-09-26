package com.stn.hpdp.controller.interest.response;

import com.stn.hpdp.model.entity.Interest;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class FindInterestRes {
    private Long companyId;
    private String profile;
    private String name;
    private boolean isInterested;

    public static FindInterestRes of(Interest interest){
        return FindInterestRes.builder()
                .companyId(interest.getCompany().getId())
                .profile(interest.getCompany().getProfile())
                .name(interest.getCompany().getName())
                .isInterested(true)
                .build();
    }
}
