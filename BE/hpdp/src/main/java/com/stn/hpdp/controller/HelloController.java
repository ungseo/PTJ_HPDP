package com.stn.hpdp.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/hello")
@RequiredArgsConstructor
public class HelloController {

    @GetMapping(value = "")
    public ResponseEntity<String> hello(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
