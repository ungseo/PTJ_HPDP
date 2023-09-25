package com.stn.hpdp.service.point;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.FundingHistoryRepository;
import com.stn.hpdp.model.repository.FundingRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.stereotype.Service;

import static org.assertj.core.api.Assertions.assertThat;


@Service
class PointQueryServiceTest extends IntegrationTestSupport {

    @Autowired
    private PointQueryService pointQueryService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private FundingRepository fundingRepository;

    @Autowired
    private FundingHistoryRepository fundingHistoryRepository;

    @DisplayName("사용자는 후원한 총 금액을 조회 할 수 있다.")
    @WithMockUser(username = "test")
    @Test
    void getTotalPrice() throws Exception {

        //given
        Member member = createMember(100000);
        Company company = createCompany();
        Funding funding = createFunding(company);

        FundingHistory fundingHistory1 = createFundingHistory(funding, member, 10000);
        FundingHistory fundingHistory2 = createFundingHistory(funding, member, 10000);
        FundingHistory fundingHistory3 = createFundingHistory(funding, member, 30000);


        //when
        int totalPrice = pointQueryService.getTotalPrice();

        //then
        assertThat(totalPrice).isEqualTo(50000);
    }

    private FundingHistory createFundingHistory(Funding funding, Member member, int price) {
        FundingHistory fundingHistory = FundingHistory.builder()
                .member(member)
                .funding(funding)
                .pirce(price)
                .build();
        return fundingHistoryRepository.save(fundingHistory);

    }

    private Funding createFunding(Company company) {
        Funding funding = Funding.builder()
                .company(company)
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