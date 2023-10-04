package com.stn.hpdp.service.alarm;

import com.stn.hpdp.common.enums.AlarmType;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.alarm.response.AlarmRes;
import com.stn.hpdp.model.entity.NewsAlarm;
import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.PointAlarm;
import com.stn.hpdp.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static com.stn.hpdp.common.exception.ErrorCode.*;
import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.START;

@Slf4j
@RequiredArgsConstructor
@Service
public class AlarmService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final MemberRepository memberRepository;
    private final EmitterRepository emitterRepository;
    private final NewsAlarmRepository newsAlarmRepository;
    private final PointAlarmRepository pointAlarmRepository;

    public SseEmitter alarm(String lastEventId, HttpServletResponse response) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        Long memberId = member.getId();
//        Long memberId = 1L;
        String emitterId = makeTimeIncludeId(memberId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        response.setHeader("X-Accel-Buffering", "no"); // NGINX PROXY 에서의 필요설정 불필요한 버퍼링방지
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));
        emitter.onError((e) -> emitterRepository.deleteById(emitterId));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        String eventId = makeTimeIncludeId(memberId);
        sendAlarm(emitter, eventId, emitterId, "{\"type\":\"DUMMY\"," +"\"memberId\":" + memberId +"}");

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
                    .name("sse")
                    .data(data));
        } catch (IOException exception) {
            log.info("SSE 연결 오류 발생", exception);
            emitterRepository.deleteById(emitterId);
            throw new CustomException(SSE_CONNECTED_FAIL);
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

    public void sendNews(Member member, Funding funding, AlarmType alarmType) {
        NewsAlarm alarm = newsAlarmRepository.save(createNewsAlarm(member, funding, alarmType));

        String memberId = String.valueOf(member.getId());
        String eventId = memberId + "_" + System.currentTimeMillis();

        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(memberId);
        emitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, alarm);
                    sendAlarm(emitter, eventId, key, AlarmRes.ofNews(alarm));
                }
        );
    }

    public void sendPoint(Member member, int point, AlarmType alarmType) {
        PointAlarm alarm = pointAlarmRepository.save(createPointAlarm(member, point, alarmType));

        String memberId = String.valueOf(member.getId());
        String eventId = memberId + "_" + System.currentTimeMillis();

        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(memberId);
        emitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, alarm);
                    sendAlarm(emitter, eventId, key, AlarmRes.ofPoint(alarm));
                }
        );
    }

    @Transactional
    public void updateNewsAlarm(long newsAlarmId) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        NewsAlarm newsAlarm = newsAlarmRepository.findByIdAndMember_Id(newsAlarmId, member.getId())
                .orElseThrow(() -> new CustomException(NEWS_ALARM_NOT_FOUND));

        newsAlarm.changeIsRead();
    }

    private NewsAlarm createNewsAlarm(Member member, Funding funding, AlarmType alarmType) {
        return NewsAlarm.builder()
                .member(member)
                .funding(funding)
                .type(alarmType)
                .title(funding.getTitle())
                .isRead(false)
                .build();
    }

    private PointAlarm createPointAlarm(Member member, int point, AlarmType alarmType) {
        return PointAlarm.builder()
                .member(member)
                .point(point)
                .type(alarmType)
                .build();
    }
}