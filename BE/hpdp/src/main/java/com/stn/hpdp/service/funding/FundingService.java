package com.stn.hpdp.service.funding;

import com.stn.hpdp.common.AwsS3Uploader;
import com.stn.hpdp.common.enums.FundingState;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.funding.request.SaveFundingReq;
import com.stn.hpdp.controller.funding.request.UpdateFundingReq;
import com.stn.hpdp.model.entity.*;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundingService {

    private final FundingRepository fundingRepository;
    private final BudgetRepository budgetRepository;

    private final CompanyRepository companyRepository;

    private final AwsS3Uploader awsS3Uploader;

    public void saveFunding(SaveFundingReq saveFundingReq){
        Optional<Company> company = companyRepository.findByLoginId(saveFundingReq.getCompanyLoginId());
        if(company.isEmpty()){
            throw new CustomException(COMPANY_NOT_FOUND);
        }

        Funding funding = saveFundingReq.toEntity(company.get());

        // startdate 따져서 state 세팅
        LocalDateTime startDate = LocalDateTime.parse(saveFundingReq.getStartDate());
        if(startDate.isAfter(LocalDateTime.now())) {
            funding.setState(FundingState.READY);
        }else{
            funding.setState(FundingState.ING);
        }

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

        saveFundingReq.getBudgetList().forEach(
                funding::addBudgets
        );

        fundingRepository.save(funding);
    }

    @Transactional
    public void updateFunding(UpdateFundingReq updateFundingReq){
        Optional<Funding> funding = fundingRepository.findById(Long.parseLong(updateFundingReq.getFundingId()));
        if(funding.isEmpty()){
            throw new CustomException(FUNDING_NOT_FOUND);
        }

        budgetRepository.deleteAllByFunding_Id(funding.get().getId());
        funding.get().update(updateFundingReq);

        // startdate 따져서 state 세팅
        LocalDateTime startDate = LocalDateTime.parse(updateFundingReq.getStartDate());
        if(startDate.isAfter(LocalDateTime.now())) {
            funding.get().setState(FundingState.READY);
        }else{
            funding.get().setState(FundingState.ING);
        }

        // 썸네일 이미지
        if(updateFundingReq.getThumbnail() != null){
            try {
                String thumbnailUrl = awsS3Uploader.uploadFile(updateFundingReq.getThumbnail(), "funding/thumbnail");
                funding.get().setThumbnailUrl(thumbnailUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        // 내용 이미지
        if(updateFundingReq.getContent() != null){
            try {
                String contentUrl = awsS3Uploader.uploadFile(updateFundingReq.getContent(), "funding/content");
                funding.get().setContentUrl(contentUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        // 리워드 이미지
        if(updateFundingReq.getRewardImg() != null){
            try {
                String rewardUrl = awsS3Uploader.uploadFile(updateFundingReq.getRewardImg(), "funding/reward");
                funding.get().setRewardImg(rewardUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        updateFundingReq.getBudgetList().forEach(
                funding.get()::addBudgets
        );

        fundingRepository.save(funding.get());
    }

    @Transactional
    public void deleteFunding(Long fundingId){
        fundingRepository.deleteById(fundingId);
    }
}