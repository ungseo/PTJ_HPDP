package com.stn.hpdp.service.company;

import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.repository.CompanyQueryRepository;
import com.stn.hpdp.model.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyQueryRepository companyQueryRepository;

    public List<FindCompanyRes> findCompanies(String keyword, HttpServletRequest request){
        List<FindCompanyRes> companyResList = companyQueryRepository.findCompanyByKeyword(keyword);

        // TODO: request header에 accesstoken이 null 이 아니면 관심 기업인지 따져줘야 함 -> default는 false로 설정해둠

        return companyResList;
    }
}