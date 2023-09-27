package com.stn.hpdp.service.alarm;

import com.stn.hpdp.common.enums.AlarmType;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.alarm.response.FindAlarmRes;
import com.stn.hpdp.model.entity.Alarm;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
public class AlarmService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final TransferRepository transferRepository;
    private final EmitterRepository emitterRepository;
    private final AlarmRepository alarmRepository;

    public SseEmitter subscribe(String lastEventId) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        Long memberId = member.getId();

        String emitterId = makeTimeIncludeId(memberId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        String eventId = makeTimeIncludeId(memberId);
        sendAlarm(emitter, eventId, emitterId, "EventStream Created. [memberId=" + memberId + "]");

        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (hasLostData(lastEventId)) {
            sendLostData(lastEventId, memberId, emitterId, emitter);
        }

        return emitter;
    }

    private String makeTimeIncludeId(Long memberId) {
        return memberId + "_" + System.currentTimeMillis();
    }

    private void sendAlarm(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    private void sendLostData(String lastEventId, Long memberId, String emitterId, SseEmitter emitter) {
        Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId));
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendAlarm(emitter, entry.getKey(), emitterId, entry.getValue()));
    }

    public void send(Funding funding, AlarmType alarmType, String content) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Alarm alarm = alarmRepository.save(createAlarm(member, funding, alarmType, content));

        String memberId = String.valueOf(member.getId());
        String eventId = memberId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(memberId);
        emitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, alarm);
                    sendAlarm(emitter, eventId, key, FindAlarmRes.of(alarm));
                }
        );
    }

    private Alarm createAlarm(Member member, Funding funding, AlarmType alarmType, String content) {
        return Alarm.builder()
                .member(member)
                .funding(funding)
                .type(alarmType)
                .title(funding.getTitle())
                .content(content)
                .isRead(false)
                .build();
    }
}