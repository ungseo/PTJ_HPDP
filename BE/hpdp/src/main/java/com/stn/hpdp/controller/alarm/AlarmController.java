package com.stn.hpdp.controller.alarm;

import com.stn.hpdp.service.alarm.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
@RestController
@RequestMapping("/api/alarm")
@RequiredArgsConstructor
public class AlarmController {
    private final AlarmService alarmService;
    @GetMapping(produces = "text/event-stream") // produces = MediaType.TEXT_EVENT_STREAM_VALUE
    public SseEmitter subscribe(@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return alarmService.subscribe(lastEventId);
    }
}