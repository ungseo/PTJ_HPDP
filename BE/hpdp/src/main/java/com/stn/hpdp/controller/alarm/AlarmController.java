package com.stn.hpdp.controller.alarm;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.controller.alarm.response.FindNewsAlarmRes;
import com.stn.hpdp.service.alarm.AlarmQueryService;
import com.stn.hpdp.service.alarm.AlarmService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static com.stn.hpdp.common.util.LogCurrent.*;
import static com.stn.hpdp.common.util.LogCurrent.END;
@Slf4j
@Api
@RestController
@RequestMapping("/api/alarm")
@RequiredArgsConstructor
public class AlarmController {
    private final AlarmService alarmService;
    private final AlarmQueryService alarmQueryService;
    @GetMapping(produces = "text/event-stream") // produces = MediaType.TEXT_EVENT_STREAM_VALUE
    public SseEmitter alarm(@AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId,
                            HttpServletResponse response) {
        return alarmService.alarm(userDetails, lastEventId, response);
    }

    @PutMapping("/news/{newsAlarmId}")
    public ApiResponse<Object> updateNewsAlarm(@PathVariable("newsAlarmId") Long newsAlarmId) {

        log.info(logCurrent(getClassName(), getMethodName(), START));
        alarmService.updateNewsAlarm(newsAlarmId);
        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("소식 수정에 성공했습니다.");
    }

    @GetMapping("/news")
    public ApiResponse<Object> findNewsAlarm() {

        log.info(logCurrent(getClassName(), getMethodName(), START));
        List<FindNewsAlarmRes> findNewsAlarmRes = alarmQueryService.findNewsAlarm();
        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.ok(findNewsAlarmRes);
    }
}