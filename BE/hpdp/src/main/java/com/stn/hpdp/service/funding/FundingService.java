package com.stn.hpdp.service.funding;

import com.stn.hpdp.common.AwsS3Uploader;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.bank.request.TransferAccountReq;
import com.stn.hpdp.controller.bank.response.FindAccountRes;
import com.stn.hpdp.controller.bank.response.FindTransferRes;
import com.stn.hpdp.controller.bank.response.TransferAccountRes;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.model.entity.*;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundingService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;

    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;

    private final AwsS3Uploader awsS3Uploader;

    public void saveFunding(SaveFundingReq saveFundingReq){
        Optional<Company> company = companyRepository.findByLoginId(saveFundingReq.getCompanyLoginId());
        if(company.isEmpty()){
            throw new CustomException(COMPANY_NOT_FOUND);
        }

        Funding funding = saveFundingReq.toEntity(company.get());

        // 썸네일 이미지
        if(saveFundingReq.getThumbnail() != null){
            try {
                String thumbnailUrl = awsS3Uploader.uploadFile(saveFundingReq.getThumbnail(), "funding/thumbnail");
                funding.setThumbnailUrl(thumbnailUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        // 내용 이미지
        if(saveFundingReq.getContent() != null){
            try {
                String contentUrl = awsS3Uploader.uploadFile(saveFundingReq.getContent(), "funding/content");
                funding.setContentUrl(contentUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        // 리워드 이미지
        if(saveFundingReq.getRewardImg() != null){
            try {
                String rewardUrl = awsS3Uploader.uploadFile(saveFundingReq.getRewardImg(), "funding/reward");
                funding.setRewardImg(rewardUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        fundingRepository.save(funding);

    }
}