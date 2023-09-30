package com.stn.hpdp.controller.funding.response;

import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindParticipantRes {

    private Long memberId;
    private String name;
    private String profileImg;

//    public static FindParticipantRes of(FundingHistory fundingHistory){
//        return FindParticipantRes.builder()
//                .memberId(fundingHistory.getMember().getId())
//                .name(fundingHistory.getMember().getName())
//                .profileImg(fundingHistory.getMember().getProfile())
//                .build();
//    }

    public static FindParticipantRes of(Member member){
        return FindParticipantRes.builder()
                .memberId(member.getId())
                .name(member.getName())
                .profileImg(member.getProfile())
                .build();
    }
}
