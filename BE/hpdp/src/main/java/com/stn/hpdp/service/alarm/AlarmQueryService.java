package com.stn.hpdp.service.alarm;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.alarm.response.FindNewsAlarmRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.NewsAlarm;
import com.stn.hpdp.model.repository.EmitterRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.NewsAlarmRepository;
import com.stn.hpdp.model.repository.PointAlarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class AlarmQueryService {
    private final MemberRepository memberRepository;
    private final NewsAlarmRepository newsAlarmRepository;

    public List<FindNewsAlarmRes> findNewsAlarm() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<NewsAlarm> alarmList = newsAlarmRepository.findByMember_Id(member.getId());
        if (alarmList.isEmpty()) {
            return Collections.emptyList();
        }

        return alarmList.stream().map(FindNewsAlarmRes::of).collect(Collectors.toList());
    }
}
