package com.stn.hpdp.service.company;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyQueryRepository;
import com.stn.hpdp.model.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.Option;
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

    private final JwtTokenProvider jwtTokenProvider;

    public List<FindCompanyRes> findCompanies(String keyword, HttpServletRequest request){
        List<FindCompanyRes> companyResList = companyQueryRepository.findCompanyByKeyword(keyword);

        String loginId = SecurityUtil.getCurrentMemberLoginId();

        // TODO: user login id로 관심 기업 설정해둔 거 확인해서 true로 바꿔서 반환

        return companyResList;
    }

    public FindCompanyDetailRes findCompany(Long companyId, HttpServletRequest request){
        Optional<Company> companyRes = companyRepository.findById(companyId);

        if(companyRes.isEmpty()){
            throw new CustomException(COMPANY_NOT_FOUND);
        }

        FindCompanyDetailRes findCompanyDetailRes = FindCompanyDetailRes.from(companyRes.get());

        String loginId = SecurityUtil.getCurrentMemberLoginId();

        // TODO: user login id로 관심 기업 설정해둔 거 확인해서 true로 바꿔서 반환

        // TODO: funding api 개발 후 fundingsNumber, participantsNumber, amount 설정

        return findCompanyDetailRes;
    }
}