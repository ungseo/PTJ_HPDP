package com.stn.hpdp.controller.funding.request;

import com.stn.hpdp.model.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SaveFundingReq {

    private String companyLoginId;
    private MultipartFile thumbnail;
    private MultipartFile content;
    private String hashtag;
    private String title;
    private String targetAmount;
    private String startDate;
    private String endDate;

    private String rewardName;
    private String rewardPrice;
    private String rewardDesc;
    private MultipartFile rewardImg;

    private List<SaveBudgetReq> budgetList;

    public Funding toEntity(Company company){
        return Funding.builder()
                .company(company)
                .hashtag(hashtag)
                .title(title)
                .targetAmount(Integer.parseInt(targetAmount))
                .startDate(LocalDateTime.parse(startDate))
                .endDate(LocalDateTime.parse(endDate))
                .rewardName(rewardName)
                .rewardPrice(Integer.parseInt(rewardPrice))
                .rewardDesc(rewardDesc)
                .build();
    }
}
