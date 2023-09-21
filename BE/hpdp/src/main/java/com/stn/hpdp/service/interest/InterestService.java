package com.stn.hpdp.service.interest;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.interest.response.FindInterestRes;
import com.stn.hpdp.model.entity.Interest;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.InterestRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
public class InterestService {
    private final MemberRepository memberRepository;
    private final InterestRepository interestRepository;
    private final RedisTemplate redisTemplate;
    public List<FindInterestRes> findInterests() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<Interest> interestList = interestRepository.findAccountByMember_Id(member.getId());

        //todo : redis, mysql 모두 확인 필요

        List<FindInterestRes> result = new ArrayList<>();
        for ( Interest item : interestList) {
            result.add(FindInterestRes.of(item));
        }
        return result;
    }

    public void saveInterest(Long companyId) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        //todo : redis에서 데이터 넣기


    }

    public void deleteInterest() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        //todo : redis에서 데이터 삭제

    }
    @Scheduled(cron = "0 0/10 * * * ?") // Redis -> MySQL 10분 마다 동기화
    public void syncInterests() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }
}