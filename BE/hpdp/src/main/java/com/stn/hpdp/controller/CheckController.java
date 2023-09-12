package com.stn.hpdp.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/check")
@Slf4j
public class CheckController {

    private final Environment environment;

    @GetMapping("/health-check")
    public String healthCheck() {
        return String.format("It's Working in Service"
                + ", port(local.server.port)=" + environment.getProperty("local.server.port")
        );
    }
}
