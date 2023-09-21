package com.stn.hpdp.service.interest;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.interest.response.FindInterestRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Interest;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.InterestQueryRepository;
import com.stn.hpdp.model.repository.InterestRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import io.netty.util.internal.ObjectUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
public class InterestService {
    private final MemberRepository memberRepository;
    private final InterestRepository interestRepository;
    private final InterestQueryRepository interestQueryRepository;
    private final CompanyRepository companyRepository;
    private final RedisTemplate redisTemplate;
    public List<FindInterestRes> findInterests() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        // redis -> mysql
        Set<Object> companies = redisTemplate.opsForHash().keys("IT:" + member.getId());
        if(!companies.isEmpty()) {
            syncAllUsersInterests();
        }
        // mysql check
        List<Interest> interestList = interestQueryRepository.findByMember_IdWithCompany(member.getId());
        if(interestList.isEmpty()) {
            return Collections.emptyList();
        }
        List<FindInterestRes> result = new ArrayList<>();
        for (Interest item : interestList) {
            result.add(FindInterestRes.of(item));
        }
        return result;
    }

    public void saveInterest(Long companyId) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        redisTemplate.opsForHash().put("IT:" + member.getId(), companyId, "true");
    }

    public void deleteInterest(Long companyId) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        Object company = redisTemplate.opsForHash().get("IT:" + member.getId(), companyId);
        if(company == null) { // mysql 삭제
            Interest interest = interestRepository.findByCompany_Id(companyId);
            if(interest != null) interestRepository.delete(interest);
        } else { // redis 삭제
            redisTemplate.opsForHash().delete("IT:" + + member.getId(), companyId);
        }
    }

    @Scheduled(cron = "0 0/10 * * * ?") // Redis -> MySQL 10분 마다 동기화
    public void syncAllUsersInterests() {
        List<Member> allMembers = memberRepository.findAll();
        for (Member member : allMembers) {
            syncInterestsForMember(member);
        }
    }

    private void syncInterestsForMember(Member member) {
        List<Interest> interestList = new ArrayList<>();
        Set<Object> companies = redisTemplate.opsForHash().keys("IT:" + member.getId());
        if (companies.isEmpty()) return;
        for (Object item : companies) {
            long companyId = (long) item;
            redisTemplate.opsForHash().delete("IT:" + member.getId(), companyId);

            Company company = companyRepository.findById(companyId);
            if (company == null) continue;

            Interest interest = Interest.builder()
                    .member(member)
                    .company(company)
                    .build();
            interestList.add(interest);
        }

        interestRepository.saveAll(interestList);
    }

//    @Scheduled(cron = "0 0/1 * * * ?") // Redis -> MySQL 10분 마다 동기화
//    public void syncInterests() {
//        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
//                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
//
//        List<Interest> interestList = new ArrayList<>();
//        Set<Object> companies = redisTemplate.opsForHash().keys("IT:" + member.getId());
//        if(companies.isEmpty()) return;
//
//        for(Object item : companies) {
//            long companyId = (long) item;
//            redisTemplate.opsForHash().delete("IT:" + + member.getId(), companyId);
//
//            Company company = companyRepository.findById(companyId);
//            if(company == null) continue;
//            Interest interest = Interest.builder()
//                    .member(member)
//                    .company(company)
//                    .build();
//            interestList.add(interest);
//        }
//        interestRepository.saveAll(interestList);
//    }
}