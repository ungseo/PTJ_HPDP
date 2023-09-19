package com.stn.hpdp.common.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponse {
    private int code;
    private HttpStatus status;
    private String message;
    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                                .code(errorCode.getHttpStatus().value())
                                .status(errorCode.getHttpStatus())
                                .message(errorCode.getDescription())
                                .build()
                );
    }
}