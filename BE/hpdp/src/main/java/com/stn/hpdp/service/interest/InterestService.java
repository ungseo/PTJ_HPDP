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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.*;
import java.util.stream.Collectors;

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

    @Transactional
    public List<FindInterestRes> findInterests() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        // redis -> mysql
        Set<Object> companies = redisTemplate.opsForHash().keys("IT:" + member.getId());
        if (!companies.isEmpty()) {
            syncInterests();
        }
        // mysql check
        List<Interest> interestList = interestQueryRepository.findByMember_IdWithCompany(member.getId());
        if (interestList.isEmpty()) {
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
        redisTemplate.opsForHash().put("IT:" + member.getId(), companyId, "false");
    }

    @Transactional
    @Scheduled(cron = "0 0/30 * * * ?") // Redis -> MySQL 30분 마다 동기화
    public void syncInterests() {
        Set<String> changeMemberKeys = redisTemplate.keys("IT:*");
        if (changeMemberKeys.isEmpty()) return;

        for (String key : changeMemberKeys) {
            Long memberId = Long.parseLong(key.split(":")[1]);
            Member member = memberRepository.findById(memberId).orElse(null);
            if (member != null) syncInterestsForMember(member); // mysql update
            redisTemplate.delete(key); // Redis 데이터 삭제
        }
    }

    private void syncInterestsForMember(Member member) {
        Set<Object> companyIdsObjects = redisTemplate.opsForHash().keys("IT:" + member.getId());
        Set<Long> companyIds = companyIdsObjects.stream()
                .map(objectId -> (Long) objectId)
                .collect(Collectors.toSet());

        List<Company> companies = companyRepository.findAllById(companyIds);
        if (companyIds.isEmpty()) return;

        Set<Company> saveCompany = new HashSet<>();

        for (Company com : companies) {
            Object check = redisTemplate.opsForHash().get("IT:" + member.getId(), com.getId());
            if (check == null) continue;
            if (check.equals("true")) {
                saveCompany.add(com);
            } else {
                Interest interest = interestRepository.findByCompany_Id(com.getId());
                if (interest != null) interestRepository.delete(interest);
            }
        }
        List<Interest> interests = saveCompany.stream().map(company -> Interest.builder()
                .member(member)
                .company(company)
                .build()).collect(Collectors.toList());

        interestRepository.saveAll(interests);
    }
}