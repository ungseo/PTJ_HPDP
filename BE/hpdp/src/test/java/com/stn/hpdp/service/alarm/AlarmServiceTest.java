package com.stn.hpdp.service.alarm;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.common.enums.AlarmType;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.EmitterRepository;
import com.stn.hpdp.model.repository.FundingRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
class AlarmServiceTest extends IntegrationTestSupport {
    @Autowired
    private EmitterRepository emitterRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private FundingRepository fundingRepository;
    @Autowired
    private AlarmService alarmService;

//    @Test
//    @DisplayName("알림을 진행한다.")
//    @WithMockUser(username = "test")
//    public void subscribe() throws Exception {
//        //given
//        Member member = createMember();
//        String lastEventId = "";
//
//        //when, then
//        Assertions.assertDoesNotThrow(() -> alarmService.subscribe(lastEventId));
//    }
//
//    @Test
//    @DisplayName("알림 메세지 전송한다.")
//    @WithMockUser(username = "test")
//    public void send() throws Exception {
//        //given
//        Long memberId = 1L;
//        Member member = createMember();
//        Company company = createCompany();
//        Funding funding = createFunding(company);
//        String lastEventId = "";
//        alarmService.subscribe(lastEventId);
//        //when, then
//        Assertions.assertDoesNotThrow(() -> alarmService.send(member, funding, AlarmType.START, "관심 기업 펀딩이 등록됨"));
//    }
//
//    private Member createMember() {
//        Member member = Member.builder()
//                .loginId("test")
//                .loginPw("test")
//                .name("test")
//                .build();
//        return memberRepository.save(member);
//    }
//
//    private Company createCompany() {
//        Company company = Company.builder()
//                .loginId("test")
//                .loginPw("test")
//                .name("test")
//                .hashtag("test")
//                .email("email")
//                .phoneNumber("test")
//                .address("test")
//                .registrationNumber("test")
//                .websiteUrl("test")
//                .introduce("test")
//                .accountNumber("test")
//                .build();
//        return companyRepository.save(company);
//    }
//
//    private Funding createFunding(Company company) {
//        Funding funding = Funding.builder()
//                .company(company)
//                .targetAmount(100000)
//                .build();
//        return fundingRepository.save(funding);
//    }
}