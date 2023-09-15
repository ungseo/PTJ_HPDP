package com.stn.hpdp.common.exception;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.validation.Errors;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    @NonNull
    private final ErrorCode errorCode;
}