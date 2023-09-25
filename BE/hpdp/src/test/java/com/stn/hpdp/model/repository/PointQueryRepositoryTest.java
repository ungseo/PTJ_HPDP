package com.stn.hpdp.model.repository;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.controller.point.response.FundingHistoryRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PointQueryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private PointQueryRepository pointQueryRepository;

    @Autowired
    private FundingHistoryRepository fundingHistoryRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private FundingRepository fundingRepository;

    @DisplayName("사용자는 후원한 내역을 볼 수 있다.")
    @WithMockUser(username = "test")
    @Test
    void getFundingHistories() throws Exception {
        //given
        Member member = createMember(100000);
        Company company = createCompany();
        Funding funding = createFunding(company);

        FundingHistory fundingHistory1 = createFundingHistory(funding, member, 10000);
        FundingHistory fundingHistory2 = createFundingHistory(funding, member, 10000);
        FundingHistory fundingHistory3 = createFundingHistory(funding, member, 30000);

        //when
        List<FundingHistoryRes> response = pointQueryRepository.getFundingHistory(member.getId());

        //then
        Assertions.assertThat(response).hasSize(3)
                .extracting("title")
                .containsExactlyInAnyOrder("test", "test","test");
    }

    private FundingHistory createFundingHistory(Funding funding, Member member, int price) {
        FundingHistory fundingHistory = FundingHistory.builder()
                .member(member)
                .funding(funding)
                .price(price)
                .build();
        return fundingHistoryRepository.save(fundingHistory);

    }

    private Funding createFunding(Company company) {
        Funding funding = Funding.builder()
                .company(company)
                .title("test")
                .targetAmount(100000)
                .build();

        return fundingRepository.save(funding);
    }

    private Company createCompany() {
        Company company = Company.builder()
                .loginId("test")
                .loginPw("test")
                .name("test")
                .hashtag("test")
                .email("email")
                .phoneNumber("test")
                .address("test")
                .registrationNumber("test")
                .websiteUrl("test")
                .introduce("test")
                .accountNumber("test")
                .build();
        return companyRepository.save(company);
    }

    private Member createMember(int point) {
        Member member = Member.builder()
                .loginId("test")
                .loginPw("test")
                .point(point)
                .name("test")
                .build();
        return memberRepository.save(member);
    }


}