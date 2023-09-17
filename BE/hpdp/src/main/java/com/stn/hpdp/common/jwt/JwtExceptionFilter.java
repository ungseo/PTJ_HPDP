package com.stn.hpdp.common.jwt;

import com.stn.hpdp.common.exception.ErrorCode;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        try {
            chain.doFilter(request, response);
        } catch (JwtException ex) {
            String message = ex.getMessage();
            if(ErrorCode.USER_BAD_REQUEST.getDescription().equals(message)) {
                setResponse(response, ErrorCode.USER_BAD_REQUEST);
            }
            else if(ErrorCode.ACCESS_TOKEN_INVALID.getDescription().equals(message)) {
                setResponse(response, ErrorCode.ACCESS_TOKEN_INVALID);
            }
            else if(ErrorCode.EXPIRED_TOKEN.getDescription().equals(message)) {
                setResponse(response, ErrorCode.EXPIRED_TOKEN);
            }
            else if(ErrorCode.UNSUPPORTED_TOKEN.getDescription().equals(message)) {
                setResponse(response, ErrorCode.UNSUPPORTED_TOKEN);
            }
            else {
                setResponse(response, ErrorCode.ACCESS_DENIED);
            }
        }
    }
    private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws RuntimeException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().println("{ \"code\" : " + errorCode.getHttpStatus().value()
                + ", \"status\" : \"" + errorCode.getHttpStatus().name()
                + "\", \"message\" : \"" + errorCode.getDescription()
                + "\", \"data\" : null}");
    }
}