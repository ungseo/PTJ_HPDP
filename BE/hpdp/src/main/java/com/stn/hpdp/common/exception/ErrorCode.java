package com.stn.hpdp.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST */
    REFRESH_TOKEN_BAD_REQUEST(HttpStatus.BAD_REQUEST, "refresh token이 저장된 값과 같지 않습니다."),
    TOKEN_BAD_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 토큰입니다."),

    /* 401 UNAUTHORIZED */
    NOT_LOGIN_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인 후 이용해주세요."),

    /* 403 FORBIDDEN : 페이지 접근 거부 */

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    TRANSFER_FAIL(HttpStatus.NOT_FOUND, "이체에 실패하였습니다."),

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다"),
    USER_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 가입되어 있는 유저입니다."),
    COMPANY_UPDATE_CONFLICT(HttpStatus.CONFLICT, "기업은 정보를 수정할 수 없습니다. 이메일로 문의해주세요.");


    private final HttpStatus httpStatus;
    private final String description;
}