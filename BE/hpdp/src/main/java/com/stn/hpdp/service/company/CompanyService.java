package com.stn.hpdp.service.company;

import com.stn.hpdp.common.AwsS3Uploader;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.company.request.UpdateCompanyReq;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.controller.company.response.FindMyCompanyRes;
import com.stn.hpdp.controller.company.response.FindMyFundingsRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.*;
import com.stn.hpdp.service.interest.InterestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyQueryRepository companyQueryRepository;
    private final FundingRepository fundingRepository;
    private final MemberRepository memberRepository;
    private final InterestRepository interestRepository;
    private final InterestQueryRepository interestQueryRepository;
    private final InterestService interestService;
    private final AwsS3Uploader awsS3Uploader;

    public List<FindCompanyRes> findCompanies(String keyword){
        List<FindCompanyRes> companyResList;

        interestService.syncInterests(); // redis -> mysql

        if(SecurityUtil.getCurrentMemberLoginId().equals("anonymousUser") || SecurityUtil.checkCompany() ) {
            companyResList = companyQueryRepository.findCompanyByKeyword(keyword);
        } else {
            Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                    .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
            companyResList = companyQueryRepository.findCompanyByKeywordAndInterest(keyword,member.getId());
        }
        return companyResList;
    }

    public FindCompanyDetailRes findCompany(Long companyId){
        Optional<Company> companyRes = companyRepository.findById(companyId);

        if(companyRes.isEmpty()){
            throw new CustomException(COMPANY_NOT_FOUND);
        }

        FindCompanyDetailRes findCompanyDetailRes = FindCompanyDetailRes.from(companyRes.get());

        if(!(SecurityUtil.getCurrentMemberLoginId().equals("anonymousUser") || SecurityUtil.checkCompany())) {
            Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                    .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

            if(interestRepository.existsByMember_IdAndCompany_Id(member.getId(), companyId))
                findCompanyDetailRes.setInterested(true);
        }

        // TODO: funding api 개발 후 fundingsNumber, participantsNumber, amount 설정

        return findCompanyDetailRes;
    }

    public FindMyCompanyRes findMyCompany(){
        String loginId = SecurityUtil.getCurrentMemberLoginId();
        Optional<Company> company = companyRepository.findByLoginId(loginId);

        return FindMyCompanyRes.from(company.get());
    }

    public void updateMyCompany(UpdateCompanyReq updateCompanyReq){
        String loginId = SecurityUtil.getCurrentMemberLoginId();
        Optional<Company> company = companyRepository.findByLoginId(loginId);

        company.get().update(updateCompanyReq);

        // 프로필
        if(updateCompanyReq.getProfile() != null){
            try {
                String profileUrl = awsS3Uploader.uploadFile(updateCompanyReq.getProfile(), "company/profile");
                company.get().setProfile(profileUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        // 배너
        if(updateCompanyReq.getBanner() != null){
            try {
                String bannerUrl = awsS3Uploader.uploadFile(updateCompanyReq.getBanner(), "company/banner");
                company.get().setBanner(bannerUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        companyRepository.save(company.get());
    }

    public List<FindMyFundingsRes> findMyFundings(){
        String loginId = SecurityUtil.getCurrentMemberLoginId();
        Optional<Company> company = companyRepository.findByLoginId(loginId);

        List<Funding> fundings = fundingRepository.findAllByCompany_Id(company.get().getId());
        List<FindMyFundingsRes> result = new ArrayList<>();
        for(Funding funding : fundings){
            FindMyFundingsRes findMyFundingsRes = FindMyFundingsRes.from(funding, company.get());
            result.add(findMyFundingsRes);
        }

        return result;
    }
}