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

    public static FindInterestRes of(Interest interest){
        if(interest == null) return null;

        return FindInterestRes.builder()
                .companyId(interest.getCompany().getId())
                .profile(interest.getCompany().getProfile())
                .name(interest.getCompany().getName())
                .build();
    }
}
