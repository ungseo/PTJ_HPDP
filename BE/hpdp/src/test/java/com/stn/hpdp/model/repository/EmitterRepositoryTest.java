package com.stn.hpdp.model.repository;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class EmitterRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private EmitterRepository emitterRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private FundingRepository fundingRepository;

    private Long DEFAULT_TIMEOUT = 60L * 1000L * 60L;
//    @Test
//    @DisplayName("새로운 Emitter를 추가한다.")
//    @WithMockUser(username = "test")
//    public void save() throws Exception {
//        //given
//        Long memberId = 1L;
//        String emitterId =  memberId + "_" + System.currentTimeMillis();
//        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);
//
//        //when, then
//        Assertions.assertDoesNotThrow(() -> emitterRepository.save(emitterId, sseEmitter));
//    }
//
//    @Test
//    @DisplayName("수신한 이벤트를 캐시에 저장한다.")
//    @WithMockUser(username = "test")
//    public void saveEventCache() throws Exception {
//        //given
//        Long memberId = 1L;
//        String eventCacheId =  memberId + "_" + System.currentTimeMillis();
//        Member member = createMember();
//        Company company = createCompany();
//        Funding funding = createFunding(company);
//        Alarm alarm = new Alarm(1L, member, funding, false, AlarmType.START, funding.getTitle(), "관심 기업 펀딩이 등록됨");
//
//        //when, then
//        Assertions.assertDoesNotThrow(() -> emitterRepository.saveEventCache(eventCacheId, alarm));
//    }
//
//    @Test
//    @DisplayName("어떤 회원이 접속한 모든 Emitter를 찾는다")
//    public void findAllEmitterStartWithByMemberId() throws Exception {
//        //given
//        Long memberId = 1L;
//        String emitterId1 = memberId + "_" + System.currentTimeMillis();
//        emitterRepository.save(emitterId1, new SseEmitter(DEFAULT_TIMEOUT));
//
//        Thread.sleep(100);
//        String emitterId2 = memberId + "_" + System.currentTimeMillis();
//        emitterRepository.save(emitterId2, new SseEmitter(DEFAULT_TIMEOUT));
//
//        Thread.sleep(100);
//        String emitterId3 = memberId + "_" + System.currentTimeMillis();
//        emitterRepository.save(emitterId3, new SseEmitter(DEFAULT_TIMEOUT));
//
//        //when
//        Map<String, SseEmitter> ActualResult = emitterRepository.findAllEmitterStartWithByMemberId(String.valueOf(memberId));
//
//        //then
//        Assertions.assertEquals(3, ActualResult.size());
//    }
//
//    @Test
//    @DisplayName("어떤 회원에게 수신된 이벤트를 캐시에서 모두 찾는다.")
//    public void findAllEventCacheStartWithByMemberId() throws Exception {
//        //given
//        Long memberId = 1L;
//        Member member = createMember();
//        Company company = createCompany();
//        Funding funding = createFunding(company);
//
//        String eventCacheId1 =  memberId + "_" + System.currentTimeMillis();
//        Alarm alarm1 = new Alarm(1L, member, funding, false, AlarmType.CREATE, funding.getTitle(), "관심 기업 펀딩이 등록됨");
//        emitterRepository.saveEventCache(eventCacheId1, alarm1);
//
//        Thread.sleep(100);
//        String eventCacheId2 =  memberId + "_" + System.currentTimeMillis();
//        Alarm alarm2 = new Alarm(1L, member, funding, false, AlarmType.START, funding.getTitle(), "관심 기업 펀딩이 시작됨");
//        emitterRepository.saveEventCache(eventCacheId2, alarm2);
//
//        Thread.sleep(100);
//        String eventCacheId3 =  memberId + "_" + System.currentTimeMillis();
//        Alarm alarm3 = new Alarm(1L, member, funding, false, AlarmType.SETTLE, funding.getTitle(), "후원 펀딩 정산됨");
//        emitterRepository.saveEventCache(eventCacheId2, alarm3);
//
//        //when
//        Map<String, Object> ActualResult = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId));
//
//        //then
//        Assertions.assertEquals(3, ActualResult.size());
//    }
//
//    @Test
//    @DisplayName("ID를 통해 Emitter를 Repository에서 제거한다.")
//    public void deleteById() throws Exception {
//        //given
//        Long memberId = 1L;
//        String emitterId =  memberId + "_" + System.currentTimeMillis();
//        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);
//
//        //when
//        emitterRepository.save(emitterId, sseEmitter);
//        emitterRepository.deleteById(emitterId);
//
//        //then
//        Assertions.assertEquals(0, emitterRepository.findAllEmitterStartWithByMemberId(emitterId).size());
//    }
//
//    @Test
//    @DisplayName("저장된 모든 Emitter를 제거한다.")
//    public void deleteAllEmitterStartWithId() throws Exception {
//        //given
//        Long memberId = 1L;
//        String emitterId1 = memberId + "_" + System.currentTimeMillis();
//        emitterRepository.save(emitterId1, new SseEmitter(DEFAULT_TIMEOUT));
//
//        Thread.sleep(100);
//        String emitterId2 = memberId + "_" + System.currentTimeMillis();
//        emitterRepository.save(emitterId2, new SseEmitter(DEFAULT_TIMEOUT));
//
//        //when
//        emitterRepository.deleteAllEmitterStartWithId(String.valueOf(memberId));
//
//        //then
//        Assertions.assertEquals(0, emitterRepository.findAllEmitterStartWithByMemberId(String.valueOf(memberId)).size());
//    }
//
//    @Test
//    @DisplayName("수신한 이벤트를 캐시에 저장한다.")
//    public void deleteAllEventCacheStartWithId() throws Exception {
//        //given
//        Long memberId = 1L;
//        Member member = createMember();
//        Company company = createCompany();
//        Funding funding = createFunding(company);
//        String eventCacheId1 =  memberId + "_" + System.currentTimeMillis();
//
//        Alarm alarm1 = new Alarm(1L, member, funding, false, AlarmType.CREATE, funding.getTitle(), "관심 기업 펀딩이 등록됨");
//        emitterRepository.saveEventCache(eventCacheId1, alarm1);
//
//        Thread.sleep(100);
//        String eventCacheId2 =  memberId + "_" + System.currentTimeMillis();
//        Alarm alarm2 = new Alarm(1L, member, funding, false, AlarmType.START, funding.getTitle(), "관심 기업 펀딩이 시작됨");
//        emitterRepository.saveEventCache(eventCacheId2, alarm2);
//
//        //when
//        emitterRepository.deleteAllEventCacheStartWithId(String.valueOf(memberId));
//
//        //then
//        Assertions.assertEquals(0, emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId)).size());
//    }

    private Member createMember() {
        Member member = Member.builder()
                .loginId("test")
                .loginPw("test")
                .name("test")
                .build();
        return memberRepository.save(member);
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

    private Funding createFunding(Company company) {
        Funding funding = Funding.builder()
                .company(company)
                .targetAmount(100000)
                .build();
        return fundingRepository.save(funding);
    }
}