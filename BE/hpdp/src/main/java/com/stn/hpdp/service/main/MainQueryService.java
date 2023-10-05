package com.stn.hpdp.service.main;

import com.stn.hpdp.controller.main.response.FindMainInfoRes;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.FundingHistoryRepository;
import com.stn.hpdp.model.repository.FundingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MainQueryService {

    private final FundingRepository fundingRepository;
    private final FundingHistoryRepository fundingHistoryRepository;
    private final CompanyRepository companyRepository;

    public FindMainInfoRes findMainInfo() {
        FindMainInfoRes findMainInfoRes = new FindMainInfoRes();

        // 총 후원 금액 -> funding history price 합
        Integer price = fundingHistoryRepository.getSumPrice();
        if(price != null) findMainInfoRes.setPrice(price);
        else findMainInfoRes.setPrice(0);

        // 총 후원 횟수 -> funding history count
        findMainInfoRes.setSupport((int)fundingHistoryRepository.count());

        // 총 모금 개수 -> funding count
        findMainInfoRes.setFunding((int)fundingRepository.count());

        // 총 참여 기업 -> company count
        findMainInfoRes.setCompany((int)companyRepository.count());

        return findMainInfoRes;
    }
}